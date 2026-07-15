/**
 * String Utilities
 * Функции для работы со строками
 */

/**
 * Преобразует текст в slug (URL-friendly)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

/**
 * Обрезает текст до определенной длины с многоточием
 */
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Форматирует телефонный номер
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // Format as +XX XXX XXX XX XX
  if (digits.length === 12) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`;
  }

  return phone;
}

/**
 * Генерирует мета-описание из текста
 */
export function generateMetaDescription(text: string, maxLength: number = 160): string {
  const description = text.replace(/[^a-zA-Z0-9\s.,-]/g, '');
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
}
