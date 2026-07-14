import { z } from 'zod';

// ✅ Строгая валидация для Contact форм
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, '❌ Name must be at least 2 characters')
    .max(100, '❌ Name must be less than 100 characters')
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/, '❌ Name can only contain letters and spaces'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('❌ Please enter a valid email address')
    .max(254, '❌ Email is too long'),

  phone: z
    .string()
    .trim()
    .regex(/^[\d\s+()-]+$/, '❌ Phone number contains invalid characters')
    .min(10, '❌ Phone number must be at least 10 digits')
    .max(20, '❌ Phone number is too long'),

  telegram: z
    .string()
    .trim()
    .regex(/^@?[a-zA-Z0-9_]{5,32}$/, '❌ Invalid Telegram username')
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .trim()
    .min(10, '❌ Message must be at least 10 characters')
    .max(2000, '❌ Message must be less than 2000 characters')
    .regex(/^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?'\"---]+$/, '❌ Message contains invalid characters'),

  budget: z
    .enum(['500-1000', '1500-2000', '2000-5000', '5000plus'], {
      errorMap: () => ({ message: '❌ Please select a valid budget range' }),
    })
    .optional()
    .or(z.literal('')),
});

export const bookCallFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, '❌ Name is required')
    .max(100),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('❌ Valid email required'),

  phone: z
    .string()
    .trim()
    .min(10, '❌ Valid phone required'),

  selectedDate: z
    .string()
    .min(1, '❌ Please select a date'),

  selectedTime: z
    .string()
    .min(1, '❌ Please select a time'),
});

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('❌ Valid email required')
    .max(254),
});

export const inquiryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, '❌ Name required')
    .max(100),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('❌ Valid email required'),

  company: z
    .string()
    .trim()
    .max(100)
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .trim()
    .min(10, '❌ Message too short')
    .max(5000, '❌ Message too long'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type BookCallFormData = z.infer<typeof bookCallFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type InquiryFormData = z.infer<typeof inquiryFormSchema>;
