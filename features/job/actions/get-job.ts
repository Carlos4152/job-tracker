'use server';

import { ActionResult } from '@/types/action-result';
import { JobDTO } from '../types/job.type';
import { getCurrentUserId } from '@/lib/auth/get-current-userid';
import { connectDB } from '@/lib/database/db';
import { handleError } from '@/lib/errors/handle-error';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import { Job } from '@/lib/database/models/job.model';
import { serializeJob } from '../utils/serialize-job';

export async function GetJob(jobId: string): Promise<ActionResult<JobDTO>> {
  try {
    await connectDB();
    const userId = await getCurrentUserId();

    const job = await Job.findById(jobId).lean();

    if (!job) throw new NotFoundError('Job not found');
    if (job.userId.toString() !== userId)
      throw new UnauthorizedError('Not authorized');

    return { success: true, data: serializeJob(job) };
  } catch (error) {
    return handleError(error);
  }
}
