'use server';

import { revalidatePath } from 'next/cache';
import { UpdateJobData, updateJobSchema } from '../schemas/job.schema';
import { getCurrentUserId } from '@/lib/auth/get-current-userid';
import { ActionResult } from '@/types/action-result';
import { JobDTO } from '../types/job.type';
import { handleError } from '@/lib/errors/handle-error';
import { connectDB } from '@/lib/database/db';
import { Job } from '@/lib/database/models/job.model';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import { serializeJob } from '../utils/serialize-job';

export async function UpdateJob(
  jobId: string,
  formData: UpdateJobData,
): Promise<ActionResult<JobDTO>> {
  try {
    await connectDB();
    const parsed = updateJobSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
        message: 'Invalid form data',
      };
    }
    const userId = await getCurrentUserId();

    const job = await Job.findById(jobId);

    if (!job) throw new NotFoundError('Job not found');
    if (job.userId.toString() !== userId)
      throw new UnauthorizedError('Not authorized');

    if (parsed.data.status && parsed.data.status !== job.status) {
      job.timeline.push({
        event: `Status changed to ${parsed.data.status}`,
        date: new Date(),
      });
    }

    job.set(parsed.data);
    await job.save();

    revalidatePath('/jobs');
    revalidatePath(`/jobs/${jobId}`);
    return {
      success: true,
      message: 'Job updated successfully',
      data: serializeJob(job),
    };
  } catch (error) {
    return handleError(error);
  }
}
