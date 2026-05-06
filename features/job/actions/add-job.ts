'use server';

import { ActionResult } from '@/types/action-result';
import { JobFormData, jobFormSchema } from '../schemas/job.schema';
import { JobDTO } from '../types/job.type';
import { getCurrentUserId } from '@/lib/auth/get-current-userid';
import { revalidatePath } from 'next/cache';
import { handleError } from '@/lib/errors/handle-error';
import { connectDB } from '@/lib/database/db';
import { Job } from '@/lib/database/models/job.model';
import { serializeJob } from '../utils/serialize-job';

export async function AddJob(
  formData: JobFormData,
): Promise<ActionResult<JobDTO>> {
  try {
    await connectDB();
    const parsed = jobFormSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
        message: 'Invalid form data',
      };
    }
    const userId = await getCurrentUserId();

    const job = await Job.create({
      ...parsed.data,
      userId,
      timeline: [
        {
          event: `Application submitted on ${parsed.data.platform}`,
          date: new Date(),
        },
      ],
    });

    revalidatePath('/jobs');
    return {
      success: true,
      message: 'Job created successfully',
      data: serializeJob(job),
    };
  } catch (error) {
    return handleError(error);
  }
}
