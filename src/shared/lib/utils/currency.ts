/**
 * Formate un montant en devise
 */
export function formatCurrency(
  amount: number,
  currency: string = 'EUR',
  locale: string = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formate un montant compact (1K, 1M, etc.)
 */
export function formatCurrencyCompact(
  amount: number,
  currency: string = 'EUR',
  locale: string = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(amount);
}

/**
 * Formate un nombre
 */
export function formatNumber(
  value: number,
  locale: string = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Formate un pourcentage
 */
export function formatPercentage(
  value: number,
  locale: string = 'fr-FR',
  decimals: number = 0
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

/**
 * Parse une chaîne en montant
 */
export function parseCurrency(value: string): number {
  // Retirer tous les caractères non-numériques sauf . et ,
  const cleaned = value.replace(/[^\d.,]/g, '');
  
  // Remplacer la virgule par un point
  const normalized = cleaned.replace(',', '.');
  
  return parseFloat(normalized) || 0;
}