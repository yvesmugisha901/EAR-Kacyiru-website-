import { z } from 'zod';

export const prayerSchema = z.object({
  name: z.string().trim().max(100).optional().or(z.literal('')),
  request: z.string().trim().min(5, 'Write at least 5 characters').max(2000),
  isPublic: z.boolean().optional(),
  website: z.string().max(0).optional(),
});
export const registrationSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name').max(100),
  phone: z.string().trim().min(7, 'Enter a phone number').max(30),
  guests: z.coerce.number().int().min(1).max(10).default(1),
});
