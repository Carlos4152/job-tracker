import z from 'zod';

export const jobFormSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  status: z.enum(['applied', 'interview', 'offer', 'rejected'], {
    error: 'Status is required',
  }),
  platform: z.string().min(1, 'Platform is required'),
  location: z.string().min(1, 'Location is required'),
  salary: z.string().optional(),
  jobLink: z.string().url('Invalid job URL').min(1, 'Job URL is required'),
  companyWebsite: z
    .string()
    .url('Invalid company website URL')
    .optional()
    .or(z.literal('')),
  companyLinkedIn: z
    .string()
    .url('Invalid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  description: z.string().optional(),
});

export const updateJobSchema = jobFormSchema.partial();

export type JobFormData = z.infer<typeof jobFormSchema>;
export type UpdateJobData = z.infer<typeof updateJobSchema>;
