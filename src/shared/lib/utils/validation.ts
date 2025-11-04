/**
 * Valide un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valide un numéro de téléphone français
 */
export function isValidPhoneFR(phone: string): boolean {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
}

/**
 * Valide un SIRET français
 */
export function isValidSiret(siret: string): boolean {
  const cleaned = siret.replace(/\s/g, '');
  if (!/^\d{14}$/.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < cleaned.length; i++) {
    let digit = parseInt(cleaned[i]!);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return sum % 10 === 0;
}

/**
 * Valide une URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valide un code postal français
 */
export function isValidPostalCodeFR(postalCode: string): boolean {
  return /^[0-9]{5}$/.test(postalCode);
}

/**
 * Valide la force d'un mot de passe
 */
export function validatePasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push('Au moins 8 caractères');

  if (/[a-z]/.test(password)) score++;
  else feedback.push('Au moins une minuscule');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Au moins une majuscule');

  if (/[0-9]/.test(password)) score++;
  else feedback.push('Au moins un chiffre');

  if (/[^a-zA-Z0-9]/.test(password)) score++;
  else feedback.push('Au moins un caractère spécial');

  return { score, feedback };
}