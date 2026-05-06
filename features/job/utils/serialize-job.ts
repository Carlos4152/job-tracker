import { IJob } from '@/lib/database/models/job.model';
import { JobDTO } from '../types/job.type';

export function serializeJob(job: IJob): JobDTO {
  return {
    _id: job._id.toString(),
    userId: job.userId.toString(),
    title: job.title,
    company: job.company,
    status: job.status,
    platform: job.platform,
    location: job.location,
    salary: job.salary,
    jobLink: job.jobLink,
    companyWebsite: job.companyWebsite,
    companyLinkedIn: job.companyLinkedIn,
    description: job.description,
    timeline: job.timeline.map((event) => ({
      event: event.event,
      date: event.date.toISOString(),
      note: event.note ?? null,
    })),
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  };
}
