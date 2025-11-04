import { 
  format, 
  formatDistance, 
  isToday,
  isYesterday,
  isTomorrow,
  parseISO,
  isValid,
  addDays,
  subDays,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Formate une date selon un pattern
 */
export function formatDate(
  date: Date | string | number,
  pattern: string = 'PP'
): string {
  const dateObj = toDate(date);
  if (!dateObj) return '';
  
  return format(dateObj, pattern, { locale: fr });
}

/**
 * Formate une date et heure
 */
export function formatDateTime(date: Date | string | number): string {
  return formatDate(date, 'PPpp');
}

/**
 * Formate une date relative (il y a X jours)
 */
export function formatRelativeDate(date: Date | string | number): string {
  const dateObj = toDate(date);
  if (!dateObj) return '';

  return formatDistance(dateObj, new Date(), { 
    addSuffix: true, 
    locale: fr 
  });
}

/**
 * Formate une date de manière contextuelle
 */
export function formatContextualDate(date: Date | string | number): string {
  const dateObj = toDate(date);
  if (!dateObj) return '';

  if (isToday(dateObj)) {
    return `Aujourd'hui à ${format(dateObj, 'HH:mm')}`;
  }

  if (isYesterday(dateObj)) {
    return `Hier à ${format(dateObj, 'HH:mm')}`;
  }

  if (isTomorrow(dateObj)) {
    return `Demain à ${format(dateObj, 'HH:mm')}`;
  }

  return formatDate(dateObj, 'PPp');
}

/**
 * Formate une durée en minutes/heures
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
}

/**
 * Convertit une valeur en objet Date
 */
export function toDate(value: Date | string | number): Date | null {
  if (value instanceof Date) {
    return isValid(value) ? value : null;
  }

  if (typeof value === 'string') {
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : null;
  }

  if (typeof value === 'number') {
    const parsed = new Date(value);
    return isValid(parsed) ? parsed : null;
  }

  return null;
}

/**
 * Raccourcis pour les périodes courantes
 */
export const dateRanges = {
  today: () => ({
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
  }),
  
  yesterday: () => ({
    start: startOfDay(subDays(new Date(), 1)),
    end: endOfDay(subDays(new Date(), 1)),
  }),
  
  tomorrow: () => ({
    start: startOfDay(addDays(new Date(), 1)),
    end: endOfDay(addDays(new Date(), 1)),
  }),
  
  thisWeek: () => ({
    start: startOfWeek(new Date(), { locale: fr }),
    end: endOfWeek(new Date(), { locale: fr }),
  }),
  
  thisMonth: () => ({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  }),
  
  last7Days: () => ({
    start: startOfDay(subDays(new Date(), 7)),
    end: endOfDay(new Date()),
  }),
  
  last30Days: () => ({
    start: startOfDay(subDays(new Date(), 30)),
    end: endOfDay(new Date()),
  }),
};

/**
 * Vérifie si deux dates sont le même jour
 */
export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  
  if (!d1 || !d2) return false;
  
  return format(d1, 'yyyy-MM-dd') === format(d2, 'yyyy-MM-dd');
}