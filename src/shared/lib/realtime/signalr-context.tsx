'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { SignalRClient, getSignalRClient, ConnectionState } from './signalr-client';

interface SignalRContextType {
  client: SignalRClient;
  isConnected: boolean;
  connectionState: ConnectionState;
}

export const SignalRContext = createContext<SignalRContextType | null>(null);

interface SignalRProviderProps {
  children: ReactNode;
  autoConnect?: boolean;
}

export function SignalRProvider({ children, autoConnect = true }: SignalRProviderProps) {
  const [client] = useState(() => getSignalRClient());
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');

  useEffect(() => {
    // S'abonner aux changements d'état
    const unsubscribe = client.onStateChange((state) => {
      setConnectionState(state);
    });

    // Connexion automatique si activée
    if (autoConnect) {
      client.start().catch((error) => {
        console.error('[SignalR Provider] Auto-connect failed:', error);
      });
    }

    // Nettoyage
    return () => {
      unsubscribe();
      client.stop();
    };
  }, [client, autoConnect]);

  return (
    <SignalRContext.Provider
      value={{
        client,
        isConnected: connectionState === 'connected',
        connectionState,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
}