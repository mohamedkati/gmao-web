/* eslint-disable @typescript-eslint/no-explicit-any */
import * as signalR from '@microsoft/signalr';
import { getAuthToken } from '../auth/token-manager';
import { getTenantId } from '../tenant/tenant-utils';

export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'reconnecting';

/**
 * Client SignalR configuré pour l'application
 */
export class SignalRClient {
  private connection: signalR.HubConnection | null = null;
  private connectionState: ConnectionState = 'disconnected';
  private listeners: Map<string, Set<(...args: any[]) => void>> = new Map();
  private stateChangeCallbacks: Set<(state: ConnectionState) => void> = new Set();

  constructor(private hubUrl: string) {}

  /**
   * Démarre la connexion
   */
  async start(): Promise<void> {
    if (this.connection) {
      console.warn('[SignalR] Connection already exists');
      return;
    }

    try {
      this.setConnectionState('connecting');

      const token = getAuthToken();
      const tenantId = getTenantId();

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl, {
          accessTokenFactory: () => token || '',
          headers: {
            'X-Tenant-Id': tenantId || '',
          },
          transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            // Exponential backoff: 0, 2, 10, 30 seconds, puis 30 secondes
            if (retryContext.previousRetryCount === 0) return 0;
            if (retryContext.previousRetryCount === 1) return 2000;
            if (retryContext.previousRetryCount === 2) return 10000;
            return 30000;
          },
        })
        .configureLogging(
          process.env.NODE_ENV === 'development' 
            ? signalR.LogLevel.Debug 
            : signalR.LogLevel.Warning
        )
        .build();

      // Gestionnaires d'événements de connexion
      this.connection.onclose((error) => {
        console.error('[SignalR] Connection closed:', error);
        this.setConnectionState('disconnected');
      });

      this.connection.onreconnecting((error) => {
        console.warn('[SignalR] Reconnecting...', error);
        this.setConnectionState('reconnecting');
      });

      this.connection.onreconnected((connectionId) => {
        console.log('[SignalR] Reconnected:', connectionId);
        this.setConnectionState('connected');
        this.resubscribeListeners();
      });

      // Démarrer la connexion
      await this.connection.start();
      this.setConnectionState('connected');
      console.log('[SignalR] Connected successfully');

      // S'abonner aux événements déjà enregistrés
      this.resubscribeListeners();
    } catch (error) {
      console.error('[SignalR] Failed to start connection:', error);
      this.setConnectionState('disconnected');
      throw error;
    }
  }

  /**
   * Arrête la connexion
   */
  async stop(): Promise<void> {
    if (!this.connection) {
      return;
    }

    try {
      await this.connection.stop();
      this.connection = null;
      this.setConnectionState('disconnected');
      console.log('[SignalR] Connection stopped');
    } catch (error) {
      console.error('[SignalR] Error stopping connection:', error);
      throw error;
    }
  }

  /**
   * S'abonne à un événement
   */
  on(eventName: string, callback: (...args: any[]) => void): void {
    // Ajouter le callback à la liste des listeners
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(callback);

    // S'abonner sur la connexion si elle existe
    if (this.connection) {
      this.connection.on(eventName, callback);
    }
  }

  /**
   * Se désabonne d'un événement
   */
  off(eventName: string, callback: (...args: any[]) => void): void {
    const callbacks = this.listeners.get(eventName);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.listeners.delete(eventName);
      }
    }

    if (this.connection) {
      this.connection.off(eventName, callback);
    }
  }

  /**
   * Invoque une méthode sur le serveur
   */
  async invoke(methodName: string, ...args: any[]): Promise<any> {
    if (!this.connection) {
      throw new Error('SignalR connection not established');
    }

    try {
      return await this.connection.invoke(methodName, ...args);
    } catch (error) {
      console.error(`[SignalR] Error invoking ${methodName}:`, error);
      throw error;
    }
  }

  /**
   * Envoie une méthode sans attendre de réponse
   */
  async send(methodName: string, ...args: any[]): Promise<void> {
    if (!this.connection) {
      throw new Error('SignalR connection not established');
    }

    try {
      await this.connection.send(methodName, ...args);
    } catch (error) {
      console.error(`[SignalR] Error sending ${methodName}:`, error);
      throw error;
    }
  }

  /**
   * Récupère l'état de la connexion
   */
  getState(): ConnectionState {
    return this.connectionState;
  }

  /**
   * S'abonne aux changements d'état
   */
  onStateChange(callback: (state: ConnectionState) => void): () => void {
    this.stateChangeCallbacks.add(callback);
    
    // Retourner une fonction de nettoyage
    return () => {
      this.stateChangeCallbacks.delete(callback);
    };
  }

  /**
   * Vérifie si la connexion est établie
   */
  isConnected(): boolean {
    return this.connectionState === 'connected';
  }

  /**
   * Définit l'état de la connexion et notifie les callbacks
   */
  private setConnectionState(state: ConnectionState): void {
    this.connectionState = state;
    this.stateChangeCallbacks.forEach((callback) => callback(state));
  }

  /**
   * Réabonne tous les listeners après une reconnexion
   */
  private resubscribeListeners(): void {
    if (!this.connection) {
      return;
    }

    this.listeners.forEach((callbacks, eventName) => {
      callbacks.forEach((callback) => {
        this.connection!.on(eventName, callback);
      });
    });
  }
}

/**
 * Instance singleton du client SignalR
 */
let signalRClient: SignalRClient | null = null;

/**
 * Récupère l'instance du client SignalR
 */
export function getSignalRClient(): SignalRClient {
  if (!signalRClient) {
    const hubUrl = `${process.env.NEXT_PUBLIC_SIGNALR_URL}/notifications`;
    signalRClient = new SignalRClient(hubUrl);
  }
  return signalRClient;
}

/**
 * Événements SignalR prédéfinis
 */
export const SignalREvents = {
  // Work Orders
  WORK_ORDER_CREATED: 'WorkOrderCreated',
  WORK_ORDER_UPDATED: 'WorkOrderUpdated',
  WORK_ORDER_DELETED: 'WorkOrderDeleted',
  WORK_ORDER_ASSIGNED: 'WorkOrderAssigned',
  WORK_ORDER_STATUS_CHANGED: 'WorkOrderStatusChanged',

  // Assets
  ASSET_CREATED: 'AssetCreated',
  ASSET_UPDATED: 'AssetUpdated',
  ASSET_DELETED: 'AssetDeleted',

  // Notifications
  NOTIFICATION_RECEIVED: 'NotificationReceived',
  
  // Chat / Messages
  MESSAGE_RECEIVED: 'MessageReceived',
  
  // System
  SYSTEM_ANNOUNCEMENT: 'SystemAnnouncement',
} as const;