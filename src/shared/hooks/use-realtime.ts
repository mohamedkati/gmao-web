'use client';

import { useEffect } from 'react';
import { useSignalR } from '../lib/realtime/signalr-hooks';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Hook pour gérer les mises à jour en temps réel
 */
export function useRealtime() {
  const { client, isConnected } = useSignalR();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isConnected) return;

    // Gestionnaires d'événements globaux
    const handleDataUpdate = (data: { queryKey: string[] }) => {
      queryClient.invalidateQueries({ queryKey: data.queryKey });
    };

    client.on('DataUpdated', handleDataUpdate);

    return () => {
      client.off('DataUpdated', handleDataUpdate);
    };
  }, [client, isConnected, queryClient]);

  return {
    isConnected,
  };
}