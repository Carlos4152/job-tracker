export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected';
export type JobPlatform =
  | 'LinkedIn'
  | 'Indeed'
  | 'ZipRecruiter'
  | 'Google Search'
  | 'Other';

interface TimelineEvent {
  event: string;
  date: string;
  note: string | null;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  status: JobStatus;
  salary: string;
  location: string;
  platform: JobPlatform;
  jobLink: string;
  timeline: TimelineEvent[];
  companyWebsite?: string;
  companyLinkedIn?: string;
  description: string;
  appliedDate: string;
}
