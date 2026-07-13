/**
 * Telegram Bot Integration
 * Отправка сообщений о новых заявках в Telegram
 */

interface TelegramMessage {
  name: string;
  phone: string;
  email: string;
  company?: string;
  message: string;
  pageName?: string;
  pageUrl?: string;
  language?: string;
  utm?: UTMParams;
  tracking?: TrackingData;
  timestamp: Date;
}

interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

interface TrackingData {
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
}

interface TelegramResponse {
  ok: boolean;
  result?: {
    message_id: number;
    date: number;
  };
  error_code?: number;
  description?: string;
}

/**
 * Форматирует заявку для отправки в Telegram
 */
export function formatTelegramMessage(data: TelegramMessage): string {
  const lines: string[] = [];

  // ✅ Заголовок
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('🆕 НОВАЯ ЗАЯВКА');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  // ✅ Основная информация
  lines.push('👤 <b>Имя:</b> ' + escapeHtml(data.name));
  lines.push('📧 <b>Email:</b> ' + escapeHtml(data.email));
  lines.push('📱 <b>Телефон:</b> ' + escapeHtml(data.phone));

  if (data.company) {
    lines.push('🏢 <b>Компания:</b> ' + escapeHtml(data.company));
  }

  lines.push('');
  lines.push('💬 <b>Сообщение:</b>');
  lines.push(escapeHtml(data.message));
  lines.push('');

  // ✅ Информация о странице
  if (data.pageName || data.pageUrl) {
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('📄 <b>Источник заявки:</b>');
    if (data.pageName) {
      lines.push('<b>Страница:</b> ' + escapeHtml(data.pageName));
    }
    if (data.pageUrl) {
      lines.push('🔗 <b>URL:</b> ' + escapeHtml(data.pageUrl));
    }
    if (data.language) {
      lines.push('🌐 <b>Язык:</b> ' + escapeHtml(data.language.toUpperCase()));
    }
    lines.push('');
  }

  // ✅ UTM параметры
  if (data.utm && Object.values(data.utm).some(v => v)) {
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('📊 <b>UTM параметры:</b>');
    if (data.utm.source) lines.push(`  • <b>Source:</b> ${escapeHtml(data.utm.source)}`);
    if (data.utm.medium) lines.push(`  • <b>Medium:</b> ${escapeHtml(data.utm.medium)}`);
    if (data.utm.campaign) lines.push(`  • <b>Campaign:</b> ${escapeHtml(data.utm.campaign)}`);
    if (data.utm.content) lines.push(`  • <b>Content:</b> ${escapeHtml(data.utm.content)}`);
    if (data.utm.term) lines.push(`  • <b>Term:</b> ${escapeHtml(data.utm.term)}`);
    lines.push('');
  }

  // ✅ Tracking параметры
  if (data.tracking && Object.values(data.tracking).some(v => v)) {
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('🔍 <b>Трекинг:</b>');
    if (data.tracking.gclid) lines.push(`  • <b>Google:</b> ${escapeHtml(data.tracking.gclid.substring(0, 20))}...`);
    if (data.tracking.fbclid) lines.push(`  • <b>Facebook:</b> ${escapeHtml(data.tracking.fbclid.substring(0, 20))}...`);
    if (data.tracking.referrer) lines.push(`  • <b>Referrer:</b> ${escapeHtml(data.tracking.referrer)}`);
    if (data.tracking.ip) lines.push(`  • <b>IP:</b> <code>${data.tracking.ip}</code>`);
    if (data.tracking.userAgent) {
      const ua = parseUserAgent(data.tracking.userAgent);
      lines.push(`  • <b>Browser:</b> ${ua}`);
    }
    lines.push('');
  }

  // ✅ Дата и время
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('⏰ <b>Дата:</b> ' + formatDate(data.timestamp));
  lines.push('⏱️ <b>Время:</b> ' + formatTime(data.timestamp));
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return lines.join('\n');
}

/**
 * Отправляет сообщение в Telegram
 */
export async function sendTelegramMessage(
  message: string,
  options?: {
    parseMode?: 'HTML' | 'Markdown';
    disableWebPagePreview?: boolean;
  }
): Promise<TelegramResponse> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;

  if (!botToken || !chatId) {
    throw new Error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
  }

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const payload: Record<string, any> = {
    chat_id: chatId,
    text: message,
    parse_mode: options?.parseMode || 'HTML',
    disable_web_page_preview: options?.disableWebPagePreview !== false,
  };

  // ✅ Поддержка тем в группе
  if (threadId) {
    payload.message_thread_id = parseInt(threadId);
  }

  try {
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000), // 10 сек timeout
    });

    const data: TelegramResponse = await response.json();

    if (!data.ok) {
      throw new Error(`Telegram error: ${data.description} (${data.error_code})`);
    }

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to send Telegram message: ${errorMessage}`);
  }
}

/**
 * Утилиты форматирования
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function parseUserAgent(userAgent: string): string {
  const browsers: Record<string, string> = {
    'Chrome': '🔵',
    'Firefox': '🔶',
    'Safari': '🔷',
    'Edge': '💙',
    'Opera': '🔴',
    'Mobile': '📱',
  };

  for (const [name, emoji] of Object.entries(browsers)) {
    if (userAgent.includes(name)) {
      return `${emoji} ${name}`;
    }
  }

  return '🌐 Unknown';
}

/**
 * Парсирует User Agent для более полной информации
 */
export function getUserAgentInfo(userAgent: string): {
  browser: string;
  os: string;
  device: string;
} {
  let browser = 'Unknown';
  let os = 'Unknown';
  let device = 'Desktop';

  // Browser detection
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  else if (userAgent.includes('Opera')) browser = 'Opera';

  // OS detection
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

  // Device detection
  if (userAgent.includes('Mobile') || userAgent.includes('Android')) device = 'Mobile';
  else if (userAgent.includes('iPad')) device = 'Tablet';

  return { browser, os, device };
}

export default {
  formatTelegramMessage,
  sendTelegramMessage,
  getUserAgentInfo,
};
