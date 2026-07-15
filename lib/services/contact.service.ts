/**
 * Contact Service
 * Логика обработки контактных заявок
 */

import { contactFormSchema } from '@/lib/schemas';
import { sendTelegramMessage, formatTelegramMessage } from '@/lib/telegram';
import { logger } from '@/lib/logger';
import { z } from 'zod';

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  telegram?: string;
  message: string;
  budget?: string;
  company?: string;
  pageName?: string;
  pageUrl?: string;
  language?: string;
  utm?: Record<string, string>;
  tracking?: Record<string, any>;
  userAgent?: string;
}

/**
 * Валидирует контактные данные
 */
export async function validateContactData(data: any) {
  try {
    return contactFormSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      logger.warn('Validation failed', { errors });
      return { error: 'Validation failed', details: errors };
    }
    return { error: 'Validation error' };
  }
}

/**
 * Проверяет минимальную длину сообщения
 */
export function validateMessageLength(message: string, minWords: number = 3): boolean {
  const wordCount = message.split(/\s+/).length;
  return wordCount >= minWords;
}

/**
 * Отправляет уведомление в Telegram
 */
export async function notifyTelegram(data: ContactData): Promise<boolean> {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      logger.warn('Telegram not configured');
      return false;
    }

    const telegramMessage = formatTelegramMessage({
      name: data.name,
      phone: data.phone,
      email: data.email,
      company: data.company,
      message: data.message,
      pageName: data.pageName,
      pageUrl: data.pageUrl,
      language: data.language,
      utm: data.utm,
      tracking: data.tracking,
      timestamp: new Date(),
    });

    await sendTelegramMessage(telegramMessage);
    logger.info('Telegram message sent', { email: data.email });
    return true;
  } catch (error) {
    logger.error('Failed to send Telegram message', error as Error, { email: data.email });
    return false;
  }
}

/**
 * Логирует контактную заявку
 */
export function logContactSubmission(data: ContactData, metadata: Record<string, any>) {
  logger.logContactSubmission(
    {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      budget: data.budget,
    },
    metadata
  );
}
