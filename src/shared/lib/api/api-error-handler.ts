import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>; // Pour les erreurs de validation
}

/**
 * Extrait un message d'erreur lisible depuis une erreur API
 */
export function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    // Erreur de validation (400)
    if (error.response?.status === 400) {
      const validationErrors = error.response.data?.errors;
      if (validationErrors) {
        return formatValidationErrors(validationErrors);
      }
    }

    // Message d'erreur du serveur
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    // Message d'erreur générique basé sur le status
    switch (error.response?.status) {
      case 401:
        return 'Non autorisé. Veuillez vous connecter.';
      case 403:
        return 'Accès refusé. Vous n\'avez pas les permissions nécessaires.';
      case 404:
        return 'Ressource non trouvée.';
      case 409:
        return 'Conflit. Cette ressource existe déjà.';
      case 422:
        return 'Données invalides.';
      case 429:
        return 'Trop de requêtes. Veuillez réessayer plus tard.';
      case 500:
        return 'Erreur serveur. Veuillez réessayer plus tard.';
      case 503:
        return 'Service temporairement indisponible.';
      default:
        return error.message || 'Une erreur est survenue.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Une erreur inattendue est survenue.';
}

/**
 * Formate les erreurs de validation
 */
function formatValidationErrors(errors: Record<string, string[]>): string {
  const messages = Object.entries(errors)
    .map(([field, fieldErrors]) => {
      const fieldName = formatFieldName(field);
      return `${fieldName}: ${fieldErrors.join(', ')}`;
    })
    .join('\n');

  return messages || 'Erreur de validation.';
}

/**
 * Formate un nom de champ pour l'affichage
 */
function formatFieldName(field: string): string {
  return field
    .replace(/([A-Z])/g, ' $1') // Ajouter un espace avant les majuscules
    .replace(/^./, (str) => str.toUpperCase()) // Première lettre en majuscule
    .trim();
}

/**
 * Vérifie si une erreur est une erreur réseau
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return !error.response && error.message === 'Network Error';
  }
  return false;
}

/**
 * Vérifie si une erreur est une erreur de timeout
 */
export function isTimeoutError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.code === 'ECONNABORTED';
  }
  return false;
}

/**
 * Vérifie si une erreur est une erreur de validation
 */
export function isValidationError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 400 && !!error.response.data?.errors;
  }
  return false;
}

/**
 * Classe d'erreur personnalisée pour l'API
 */
export class ApiException extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiException';
  }
}

/**
 * Convertit une erreur Axios en ApiException
 */
export function toApiException(error: unknown): ApiException {
  if (error instanceof AxiosError) {
    return new ApiException(
      extractErrorMessage(error),
      error.response?.status,
      error.response?.data?.code,
      error.response?.data?.errors
    );
  }

  if (error instanceof Error) {
    return new ApiException(error.message);
  }

  return new ApiException('Une erreur inattendue est survenue.');
}