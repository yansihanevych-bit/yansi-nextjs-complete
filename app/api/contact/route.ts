import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schemas';
import { sendTelegramMessage, formatTelegramMessage } from '@/lib/telegram';
import { logger } from '@/lib/logger';
import { z } from 'zod';

// ✅ Типы
interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  telegram?: string;
  message: string;
  budget?: string;
  company?: string;
  // Meta данные
  pageName?: string;
  pageUrl?: string;
  language?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
}

// ✅ Простая защита от спама (rate limiting по IP)
const ipSubmissions = new Map<string, number[]>();
const RATE_LIMIT = parseInt(process.env.RATE_LIMIT_REQUESTS || '3');
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000');

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const submissions = ipSubmissions.get(ip) || [];

  // Удали старые отправки
  const recentSubmissions = submissions.filter((time) => now - time < RATE_LIMIT_WINDOW);

  if (recentSubmissions.length >= RATE_LIMIT) {
    logger.warn(`Rate limit exceeded for IP: ${ip}`);
    return false;
  }

  recentSubmissions.push(now);
  ipSubmissions.set(ip, recentSubmissions);
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}

/**
 * Парсит UTM параметры из URL или строки
 */
function parseUTMParams(queryString?: string): Record<string, string> {
  const utm: Record<string, string> = {};

  const searchParams = new URLSearchParams(queryString || '');
  const params = ['source', 'medium', 'campaign', 'content', 'term'];

  params.forEach((param) => {
    const value = searchParams.get(`utm_${param}`);
    if (value) {
      utm[param] = value;
    }
  });

  return utm;
}

/**
 * Извлекает tracking параметры
 */
function extractTrackingParams(
  data: ContactRequest,
  request: NextRequest
): {
  gclid?: string;
  fbclid?: string;
  referrer?: string;
} {
  return {
    gclid: data.gclid,
    fbclid: data.fbclid,
    referrer: data.referrer || request.headers.get('referer') || undefined,
  };
}

/**
 * Основной handler
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';

  try {
    logger.logRequest('POST', '/api/contact', { ip: clientIP, userAgent });

    // ✅ 1. Проверка методу
    if (request.method !== 'POST') {
      logger.warn('Invalid method for contact endpoint', { method: request.method });
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    // ✅ 2. Проверка Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      logger.warn('Invalid content type', { contentType });
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    // ✅ 3. Rate limiting по IP адресу
    if (!checkRateLimit(clientIP)) {
      const duration = Date.now() - startTime;
      logger.logResponse('POST', '/api/contact', 429, duration, { success: false });
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // ✅ 4. Парсинг body
    let data: ContactRequest;
    try {
      data = await request.json();
    } catch (error) {
      logger.error('Invalid JSON in request body', error as Error);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // ✅ 5. Honeypot проверка
    if ('website_url' in data && (data as any).website_url) {
      logger.warn(`Honeypot triggered from IP: ${clientIP}`);
      // Возвращаем успех, но не отправляем письмо
      return NextResponse.json({ success: true, message: 'Thank you!' });
    }

    // ✅ 6. Валидация данных (Zod)
    let validatedData;
    try {
      validatedData = contactFormSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        logger.warn('Validation failed', { errors });
        return NextResponse.json(
          { error: 'Validation failed', details: errors },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: 'Validation error' }, { status: 400 });
    }

    // ✅ 7. Дополнительная защита от спама
    const messageWords = validatedData.message.split(/\s+/).length;
    if (messageWords < 3) {
      logger.warn('Message too short', { wordCount: messageWords });
      return NextResponse.json({ error: 'Message too short' }, { status: 400 });
    }

    // ✅ 8. Парсим UTM и tracking параметры
    const utmParams = parseUTMParams(undefined);
    const trackingParams = extractTrackingParams(data, request);

    // ✅ 9. Форматируем сообщение для Telegram
    const telegramMessage = formatTelegramMessage({
      name: validatedData.name,
      phone: validatedData.phone,
      email: validatedData.email,
      company: data.company,
      message: validatedData.message,
      pageName: data.pageName,
      pageUrl: data.pageUrl,
      language: data.language,
      utm: utmParams,
      tracking: {
        ...trackingParams,
        userAgent: userAgent,
        ip: process.env.ENABLE_IP_VALIDATION === 'true' ? clientIP : undefined,
      },
      timestamp: new Date(),
    });

    // ✅ 10. Отправляем в Telegram
    let telegramSent = false;
    try {
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
        await sendTelegramMessage(telegramMessage);
        telegramSent = true;
        logger.info('Telegram message sent successfully', { email: validatedData.email });
      } else {
        logger.warn('Telegram not configured, skipping message');
      }
    } catch (error) {
      logger.error('Failed to send Telegram message', error as Error, {
        email: validatedData.email,
      });
      // Продолжаем даже если Telegram не отправился
    }

    // ✅ 11. Сохранение в БД (опционально)
    try {
      // await db.leads.create({
      //   name: validatedData.name,
      //   email: validatedData.email,
      //   phone: validatedData.phone,
      //   telegram: validatedData.telegram,
      //   message: validatedData.message,
      //   budget: validatedData.budget,
      //   company: data.company,
      //   pageName: data.pageName,
      //   pageUrl: data.pageUrl,
      //   language: data.language,
      //   utm: JSON.stringify(utmParams),
      //   tracking: JSON.stringify(trackingParams),
      //   userAgent: userAgent,
      //   userAgentInfo: JSON.stringify(userAgentInfo),
      //   ip: clientIP,
      //   createdAt: new Date(),
      // });
    } catch (error) {
      logger.error('Failed to save to database', error as Error);
    }

    // ✅ 12. Отправка email (опционально)
    try {
      // await sendEmail({
      //   to: validatedData.email,
      //   subject: 'Thank you for your inquiry - Yansi.IO',
      //   template: 'contact-confirmation',
      //   data: validatedData,
      // });
    } catch (error) {
      logger.error('Failed to send email', error as Error);
    }

    // ✅ 13. Логирование успешной заявки
    logger.logContactSubmission(validatedData, { telegramSent, ip: clientIP });

    const duration = Date.now() - startTime;
    logger.logResponse('POST', '/api/contact', 200, duration, { success: true });

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully. We will contact you soon!',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.logApiError('POST', '/api/contact', error as Error, {
      statusCode: 500,

    });
    logger.logResponse('POST', '/api/contact', 500, duration, { success: false });

    return NextResponse.json(
      { error: 'Internal server error', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

// ✅ OPTIONS для CORS
export async function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// ✅ Обработка других методов
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
