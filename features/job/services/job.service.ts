import { connectDB } from '@/lib/database/db';
import { Job } from '../../../lib/database/models/job.model';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import { JobFormData, UpdateJobData } from '../schemas/job.schema';

export const jobService = {
  async createJob(userId: string, data: JobFormData) {
    await connectDB();

    const job = await Job.create({
      ...data,
      userId,
      timeline: [
        {
          event: `Application submitted on ${data.platform}`,
          date: new Date(),
        },
      ],
    });

    return {
      message: 'Job created successfully',
      job: JSON.parse(JSON.stringify(job.toObject())),
    };
  },

  async updateJob(jobId: string, userId: string, data: UpdateJobData) {
    await connectDB();

    const job = await Job.findById(jobId);

    if (!job) throw new NotFoundError('Job not found');
    if (job.userId.toString() !== userId)
      throw new UnauthorizedError('Not authorized');

    // if status changed, push a timeline entry
    if (data.status && data.status !== job.status) {
      job.timeline.push({
        event: `Status changed to ${data.status}`,
        date: new Date(),
      });
    }

    Object.assign(job, data);
    await job.save();

    return {
      message: 'Job updated successfully',
      job: JSON.parse(JSON.stringify(job)),
    };
  },

  async deleteJob(jobId: string, userId: string) {
    await connectDB();

    const job = await Job.findById(jobId);

    if (!job) throw new NotFoundError('Job not found');
    if (job.userId.toString() !== userId)
      throw new UnauthorizedError('Not authorized');

    await job.deleteOne();

    return { message: 'Job deleted successfully' };
  },

  async getJobs(userId: string, searchQuery?: string, statusFilter?: string) {
    await connectDB();

    let query = Job.find({ userId });

    // Build filter conditions
    const conditions = [];

    // Search filter (text search across multiple fields)
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

    // Status filter
    if (statusFilter && statusFilter.trim()) {
      conditions.push({ status: statusFilter.toLowerCase() });
    }

    // Apply combined conditions
    if (conditions.length > 0) {
      query = query.find({ $and: conditions });
    }

    const jobs = await query.sort({ createdAt: -1 }).lean();

    return { jobs: JSON.parse(JSON.stringify(jobs)) };
  },

  async getJobById(jobId: string, userId: string) {
    await connectDB();

    const job = await Job.findById(jobId).lean();

    if (!job) throw new NotFoundError('Job not found');
    if (job.userId.toString() !== userId)
      throw new UnauthorizedError('Not authorized');

    return { job: JSON.parse(JSON.stringify(job)) };
  },
};
