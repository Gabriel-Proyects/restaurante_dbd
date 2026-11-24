/**
 * Utilidades de validación y saneamiento - La Niebla Store
 * Todo se valida en el navegador (proyecto escolar sin backend).
 */

export const MAX_QTY_PER_ITEM = 10;
export const MAX_NOTE_LENGTH = 120;

/** Escapa texto antes de insertarlo con innerHTML (evita inyección de HTML/JS). */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Limpia una nota libre: sin espacios extra, sin caracteres de control y con largo máximo. */
export function sanitizeNote(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_NOTE_LENGTH);
}

export function clampQty(value) {
  const n = parseInt(value, 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, MAX_QTY_PER_ITEM);
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(value).trim());
}

export function isValidName(value) {
  const v = String(value).trim();
  return v.length >= 3 && v.length <= 60 && /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]+$/.test(v) && v.includes(' ');
}

/** Teléfono mexicano: 10 dígitos. */
export function isValidPhone(value) {
  return /^\d{10}$/.test(String(value).replace(/\D/g, ''));
}

/** Código postal mexicano: 5 dígitos. */
export function isValidPostalCode(value) {
  return /^\d{5}$/.test(String(value).trim());
}

export function isValidAddressLine(value, min = 5) {
  const v = String(value).trim();
  return v.length >= min && v.length <= 100;
}

/** Algoritmo de Luhn para números de tarjeta (solo modo demostración). */
export function isValidCardNumber(value) {
  const digits = String(value).replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

/** Vencimiento MM/AA que no haya pasado. */
export function isValidExpiry(value, now = new Date()) {
  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(String(value).trim());
  if (!m) return false;
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return false;
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);
  return endOfMonth >= now;
}

export function isValidCvv(value) {
  return /^\d{3,4}$/.test(String(value).trim());
}

export function normalizeTrackingCode(value) {
  return String(value ?? '').trim().toUpperCase().replace(/\s+/g, '');
}

/** Folio con formato DBD-MERCH-123456. */
export function isValidTrackingCode(value) {
  return /^DBD-MERCH-\d{6}$/.test(normalizeTrackingCode(value));
}

/** Formato permitido para cupones: letras, números y ":" (3 a 20 caracteres). */
export function isValidCouponFormat(value) {
  return /^[A-Z0-9:]{3,20}$/.test(String(value).trim().toUpperCase());
}

export function formatMoney(value) {
  return `$${Number(value).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
}
