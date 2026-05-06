'use server';

import { ActionResult } from '@/types/action-result';
import { JobDTO } from '../types/job.type';
import { getCurrentUserId } from '@/lib/auth/get-current-userid';
import { handleError } from '@/lib/errors/handle-error';
import { connectDB } from '@/lib/database/db';
import { Job } from '@/lib/database/models/job.model';
import { serializeJob } from '../utils/serialize-job';

export async function GetJobs(
  searchQuery?: string,
  statusFilter?: string,
): Promise<ActionResult<JobDTO[]>> {
  try {
    await connectDB();
    const userId = await getCurrentUserId();

    let query = Job.find({ userId });
    const conditions = [];

    if (searchQuery && searchQuery.trim()) {
      const searchTerm = searchQuery.trim();
      conditions.push({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { company: { $regex: searchTerm, $options: 'i' } },
          { location: { $regex: searchTerm, $options: 'i' } },
          { platform: { $regex: searchTerm, $options: 'i' } },
        ],
      });
    }

    if (statusFilter && statusFilter.trim()) {
      conditions.push({ status: statusFilter.toLowerCase() });
    }

    if (conditions.length > 0) {
      query = query.find({ $and: conditions });
    }

    const jobs = await query.sort({ createdAt: -1 }).lean();

    return { success: true, data: jobs.map((job) => serializeJob(job)) };
  } catch (error) {
    return handleError(error);
  }
}
