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

export interface JobDTO {
  _id: string;
  userId: string;
  title: string;
  company: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  platform: string;
  location: string;
  salary?: string;
  jobLink: string;
  companyWebsite?: string;
  companyLinkedIn?: string;
  description?: string;
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}
