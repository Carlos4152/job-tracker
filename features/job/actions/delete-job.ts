'use server';

import { getCurrentUserId } from '@/lib/auth/get-current-userid';
import { connectDB } from '@/lib/database/db';
import { Job } from '@/lib/database/models/job.model';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import { handleError } from '@/lib/errors/handle-error';
import { ActionResult } from '@/types/action-result';
import { revalidatePath } from 'next/cache';

export async function DeleteJob(jobId: string): Promise<ActionResult> {
  try {
    await connectDB();
    const userId = await getCurrentUserId();

    const job = await Job.findById(jobId);

    if (!job) throw new NotFoundError('Job not found');
    if (job.userId.toString() !== userId)
      throw new UnauthorizedError('Not authorized');

    await job.deleteOne();
    revalidatePath('/jobs');

    return { success: true, message: 'Job deleted successfully' };
  } catch (error) {
    return handleError(error);
  }
}
