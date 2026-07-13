/**
 * Logging Utility
 * Централизованное логирование для API и приложения
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  data?: any;
  error?: string;
  stack?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private logLevel: LogLevel = 'info';

  constructor() {
    const level = process.env.LOG_LEVEL as LogLevel;
    if (level) {
      this.logLevel = level;
    }
  }

  /**
   * Проверяет, нужно ли логировать этот уровень
   */
  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
    return levels[level] >= levels[this.logLevel];
  }

  /**
   * Форматирует сообщение для логирования
   */
  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const levelUpper = level.toUpperCase().padEnd(5);

    let formatted = `[${timestamp}] ${levelUpper} ${message}`;

    if (data) {
      try {
        formatted += ` ${JSON.stringify(data)}`;
      } catch {
        formatted += ` [Circular reference or serialization error]`;
      }
    }

    return formatted;
  }

  /**
   * Добавляет лог в память
   */
  private addToMemory(entry: LogEntry): void {
    this.logs.push(entry);

    // Ограничиваем размер логов
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  /**
   * Debug логирование
   */
  debug(message: string, data?: any): void {
    if (!this.shouldLog('debug')) return;

    const entry: LogEntry = {
      timestamp: new Date(),
      level: 'debug',
      message,
      data,
    };

    console.debug(this.formatMessage('debug', message, data));
    this.addToMemory(entry);
  }

  /**
   * Info логирование
   */
  info(message: string, data?: any): void {
    if (!this.shouldLog('info')) return;

    const entry: LogEntry = {
      timestamp: new Date(),
      level: 'info',
      message,
      data,
    };

    console.info(this.formatMessage('info', message, data));
    this.addToMemory(entry);
  }

  /**
   * Warning логирование
   */
  warn(message: string, data?: any): void {
    if (!this.shouldLog('warn')) return;

    const entry: LogEntry = {
      timestamp: new Date(),
      level: 'warn',
      message,
      data,
    };

    console.warn(this.formatMessage('warn', message, data));
    this.addToMemory(entry);
  }

  /**
   * Error логирование
   */
  error(message: string, error?: Error | string, data?: any): void {
    if (!this.shouldLog('error')) return;

    let errorMessage: string = '';
    let stack: string = '';

    if (error instanceof Error) {
      errorMessage = error.message;
      stack = error.stack || '';
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    const entry: LogEntry = {
      timestamp: new Date(),
      level: 'error',
      message,
      data,
      error: errorMessage,
      stack,
    };

    console.error(this.formatMessage('error', message, { error: errorMessage, ...data }));
    if (stack) {
      console.error('Stack:', stack);
    }
    this.addToMemory(entry);
  }

  /**
   * Логирует API запрос
   */
  logRequest(
    method: string,
    path: string,
    options?: {
      body?: any;
      ip?: string;
      userAgent?: string;
    }
  ): void {
    this.info(`${method} ${path}`, {
      ip: options?.ip,
      userAgent: options?.userAgent?.substring(0, 100),
      bodySize: options?.body ? JSON.stringify(options.body).length : 0,
    });
  }

  /**
   * Логирует API ответ
   */
  logResponse(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    options?: { success?: boolean }
  ): void {
    const level = statusCode >= 400 ? 'warn' : 'info';
    const logFn = level === 'warn' ? this.warn.bind(this) : this.info.bind(this);

    logFn(`${method} ${path} - ${statusCode}`, {
      duration: `${duration}ms`,
      success: options?.success ?? statusCode < 400,
    });
  }

  /**
   * Логирует ошибку API
   */
  logApiError(
    method: string,
    path: string,
    error: Error,
    options?: { statusCode?: number; data?: any }
  ): void {
    this.error(`${method} ${path} - API Error`, error, {
      statusCode: options?.statusCode || 500,
      ...options?.data,
    });
  }

  /**
   * Логирует контактную заявку
   */
  logContactSubmission(data: any, options?: { telegramSent?: boolean; ip?: string }): void {
    this.info('Contact form submitted', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      telegramSent: options?.telegramSent,
      ip: options?.ip,
    });
  }

  /**
   * Возвращает логи (для дебага)
   */
  getLogs(limit?: number): LogEntry[] {
    if (limit) {
      return this.logs.slice(-limit);
    }
    return this.logs;
  }

  /**
   * Очищает логи
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Выводит логи в консоль (для дебага)
   */
  printLogs(): void {
    console.table(
      this.logs.map((log) => ({
        timestamp: log.timestamp.toISOString(),
        level: log.level,
        message: log.message,
        dataSize: log.data ? JSON.stringify(log.data).length : 0,
      }))
    );
  }
}

// ✅ Singleton instance
export const logger = new Logger();

export default logger;
