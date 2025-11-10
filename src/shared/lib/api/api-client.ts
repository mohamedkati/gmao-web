/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { API_ENDPOINTS } from '../constants/api.constants';
import { getTenantId } from '../tenant/tenant-utils';
import { getAuthToken, refreshToken, clearTokens } from '../auth/token-manager';
import { toast } from 'sonner';
import qs from "qs";
/**
 * Instance Axios configurée pour l'application
 */
class ClientApi {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      paramsSerializer: {
        // return qs.stringify(params, { arrayFormat: "repeat" });
        serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" })
      },
      withCredentials: false, // Pour les cookies
    });

    /**
     * Request Interceptor
     * Ajoute automatiquement le token et le tenant ID
     */
    this.client.interceptors.request.use(
      async (config) => {
        // Ajouter le token d'authentification
        const token = getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Ajouter le Tenant ID
        const tenantId = getTenantId();
        if (tenantId) {
          config.headers['X-Tenant-Id'] = tenantId;
        }

        // Ajouter un request ID pour le tracking
        config.headers['X-Request-Id'] = generateRequestId();

        // Log en développement
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      }
    );

    /**
     * Response Interceptor
     * Gère automatiquement le refresh token et les erreurs
     */
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log en développement
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data,
          });
        }

        return handleReponse(response);
      },
      async (error: AxiosError) => {
        console.error('[API Error Details]', {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
          fullURL: `${error.config?.baseURL}${error.config?.url}`,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.config?.headers,
          message: error.message,
        });
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        if (error.message === 'Network Error' || !error.response) {
          console.error('[CORS Error] Vérifiez la configuration CORS de votre API');
          return Promise.reject({
            message: 'Erreur de connexion au serveur. Vérifiez que l\'API est accessible.',
            originalError: error
          });
        }
        // Gestion du 401 (Unauthorized) - Tentative de refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await refreshToken();

            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(originalRequest);
            }
          } catch (refreshError) {
            // Impossible de rafraîchir le token
            clearTokens();

            // Redirect vers login (côté client uniquement)
            if (typeof window !== 'undefined') {
              window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
            }

            return Promise.reject(refreshError);
          }
        }

        // Gestion du 403 (Forbidden)
        if (error.response?.status === 403) {
          console.error('[API] Accès refusé:', error.response.data);
          toast.error('Vous n\'avez pas les permissions nécessaires');

          if (typeof window !== 'undefined') {
            // Afficher un message d'erreur
            // toast.error('Vous n\'avez pas les permissions nécessaires');
          }
        }

        // Gestion du 404 (Not Found)
        if (error.response?.status === 404) {
          console.error('[API] Ressource non trouvée:', error.config?.url);
          toast.error("Ressource not found " + error.response.data);
        }

        // Gestion du 500 (Server Error)
        if (error.response?.status === 500) {
          console.error('[API] Erreur serveur:', error.response.data);

          if (typeof window !== 'undefined') {
            // toast.error('Une erreur serveur est survenue');
          }
        }

        // Log de l'erreur
        console.error('[API Error]', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });

        return this.handleErrorResponse(error);
      }
    );
  }

  public get client_instance() {
    return this.client;
  }

  handleErrorResponse(error: AxiosError) {
    const resError = (error.response?.data as any);

    if ((resError?.isSucceeded !== undefined && resError?.isSucceeded === false) || resError?.isValidationError) {
      return resError;
    }

    return Promise.reject(error);
  }
}
// generate and config one axios instance for the whole app
export const apiClient = new ClientApi().client_instance;

export function handleReponse(response: AxiosResponse) {
  // if (response.data?.isSucceeded !== undefined && response?.data.isSucceeded === true)
  return response.data;
  // TODO => throw error. or show error message
}
// export default apiClient;


// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   withCredentials: true, // Pour les cookies
// });

// /**
//  * Request Interceptor
//  * Ajoute automatiquement le token et le tenant ID
//  */
// apiClient.interceptors.request.use(
//   async (config) => {
//     // Ajouter le token d'authentification
//     const token = getAuthToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Ajouter le Tenant ID
//     const tenantId = getTenantId();
//     if (tenantId) {
//       config.headers['X-Tenant-Id'] = tenantId;
//     }

//     // Ajouter un request ID pour le tracking
//     config.headers['X-Request-Id'] = generateRequestId();

//     // Log en développement
//     if (process.env.NODE_ENV === 'development') {
//       console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
//         headers: config.headers,
//         data: config.data,
//       });
//     }

//     return config;
//   },
//   (error) => {
//     console.error('[API Request Error]', error);
//     return Promise.reject(error);
//   }
// );

// /**
//  * Response Interceptor
//  * Gère automatiquement le refresh token et les erreurs
//  */
// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // Log en développement
//     if (process.env.NODE_ENV === 'development') {
//       console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
//         status: response.status,
//         data: response.data,
//       });
//     }

//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

//     // Gestion du 401 (Unauthorized) - Tentative de refresh token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const newToken = await refreshToken();

//         if (newToken && originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return apiClient(originalRequest);
//         }
//       } catch (refreshError) {
//         // Impossible de rafraîchir le token
//         clearTokens();

//         // Redirect vers login (côté client uniquement)
//         if (typeof window !== 'undefined') {
//           window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
//         }

//         return Promise.reject(refreshError);
//       }
//     }

//     // Gestion du 403 (Forbidden)
//     if (error.response?.status === 403) {
//       console.error('[API] Accès refusé:', error.response.data);

//       if (typeof window !== 'undefined') {
//         // Afficher un message d'erreur
//         // toast.error('Vous n\'avez pas les permissions nécessaires');
//       }
//     }

//     // Gestion du 404 (Not Found)
//     if (error.response?.status === 404) {
//       console.error('[API] Ressource non trouvée:', error.config?.url);
//     }

//     // Gestion du 500 (Server Error)
//     if (error.response?.status === 500) {
//       console.error('[API] Erreur serveur:', error.response.data);

//       if (typeof window !== 'undefined') {
//         // toast.error('Une erreur serveur est survenue');
//       }
//     }

//     // Log de l'erreur
//     console.error('[API Error]', {
//       url: error.config?.url,
//       method: error.config?.method,
//       status: error.response?.status,
//       message: error.message,
//       data: error.response?.data,
//     });

//     return Promise.reject(error);
//   }
// );

/**
 * Génère un ID unique pour chaque requête
 */
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Helper pour les requêtes GET avec cache
 */
export async function getCached<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.get<T>(url, {
    ...config,
    headers: {
      ...config?.headers,
      'Cache-Control': 'max-age=300', // 5 minutes
    },
  });
  return response.data;
}

/**
 * Helper pour les uploads de fichiers
 */
export async function uploadFile(
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && onProgress) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });

  return response.data;
}

/**
 * Helper pour les téléchargements de fichiers
 */
export async function downloadFile(
  url: string,
  filename: string
): Promise<void> {
  const response = await apiClient.get(url, {
    responseType: 'blob',
  });

  // Créer un lien de téléchargement
  const blob = new Blob([response.data]);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // Nettoyer
  window.URL.revokeObjectURL(link.href);
}

// export default apiClient;

