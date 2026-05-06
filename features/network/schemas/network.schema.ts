import z from 'zod';

export const networkSchema = z.object({
  name: z.string().min(2, 'Connection name must be at least 2 characters'),

  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),

  email: z.email('Invalid email address'),

  phone: z
    .string()
    .min(7, 'Phone number is too short')
    .optional()
    .or(z.literal('')),

  location: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .optional()
    .or(z.literal('')),

  linkedin: z.url('Invalid URL'),

  imageUrl: z.url('Invalid image URL').optional().or(z.literal('')),
});

export type NetworkData = z.infer<typeof networkSchema>;
