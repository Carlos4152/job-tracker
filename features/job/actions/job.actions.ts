'use server';

import { revalidatePath } from 'next/cache';
import {
  jobFormSchema,
  updateJobSchema,
  JobFormData,
  UpdateJobData,
} from '../schemas/job.schema';
import { jobService } from '../services/job.service';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import { Job } from '../types/job.type';
import { ActionResult } from '@/types/action-result';
import { getCurrentUserId } from '@/lib/auth/get-current-userid';

// ─── Create ────────────────────────────────────────────────────────────────
export async function createJobAction(
  formData: JobFormData,
): Promise<ActionResult<Job>> {
  const parsed = jobFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: 'Invalid form data',
    };
  }

  try {
    const userId = await getCurrentUserId();
    const result = await jobService.createJob(userId, parsed.data);
    revalidatePath('/jobs');
    return { success: true, message: result.message, data: result.job };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
}

// ─── Update ────────────────────────────────────────────────────────────────
export async function updateJobAction(
  jobId: string,
  formData: UpdateJobData,
): Promise<ActionResult<Job>> {
  const parsed = updateJobSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: 'Invalid form data',
    };
  }

  try {
    const userId = await getCurrentUserId();
    const result = await jobService.updateJob(jobId, userId, parsed.data);
    revalidatePath('/jobs');
    revalidatePath(`/jobs/${jobId}`);
    return { success: true, message: result.message, data: result.job };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { success: false, message: error.message };
    }
    if (error instanceof NotFoundError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
}

// ─── Delete ────────────────────────────────────────────────────────────────
export async function deleteJobAction(jobId: string): Promise<ActionResult> {
  try {
    const userId = await getCurrentUserId();
    const result = await jobService.deleteJob(jobId, userId);
    revalidatePath('/jobs');
    return { success: true, message: result.message };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { success: false, message: error.message };
    }
    if (error instanceof NotFoundError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
}

// ─── Get all ───────────────────────────────────────────────────────────────
export async function getJobsAction(
  searchQuery?: string,
  statusFilter?: string,
): Promise<ActionResult<Job[]>> {
  try {
    const userId = await getCurrentUserId();
    const result = await jobService.getJobs(userId, searchQuery, statusFilter);
    return { success: true, data: result.jobs };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
}

// ─── Get one ───────────────────────────────────────────────────────────────
export async function getJobByIdAction(
  jobId: string,
): Promise<ActionResult<Job>> {
  try {
    const userId = await getCurrentUserId();
    const result = await jobService.getJobById(jobId, userId);
    return { success: true, data: result.job };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { success: false, message: error.message };
    }
    if (error instanceof NotFoundError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
}
