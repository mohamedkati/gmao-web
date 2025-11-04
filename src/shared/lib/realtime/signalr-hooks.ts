/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useContext, useEffect, useCallback } from 'react';
import { SignalRContext } from './signalr-context';
import { SignalREvents } from './signalr-client';

/**
 * Hook pour utiliser SignalR
 */
export function useSignalR() {
    const context = useContext(SignalRContext);

    if (!context) {
        throw new Error('useSignalR must be used within SignalRProvider');
    }

    return context;
}

/**
 * Hook pour s'abonner à un événement SignalR
 */
export function useSignalREvent<T = any>(
    eventName: string,
    callback: (data: T) => void,
    deps: any[] = []
) {
    const { client, isConnected } = useSignalR();

    useEffect(() => {
        if (!isConnected) {
            return;
        }

        const handler = (data: T) => {
            callback(data);
        };

        client.on(eventName, handler);

        return () => {
            client.off(eventName, handler);
        };
    }, [client, isConnected, eventName, deps, callback]);
    //   }, [client, isConnected, eventName, ...deps]); was
}

/**
 * Hook pour invoquer une méthode SignalR
 */
export function useSignalRInvoke() {
    const { client, isConnected } = useSignalR();

    const invoke = useCallback(
        async (methodName: string, ...args: any[]) => {
            if (!isConnected) {
                throw new Error('SignalR not connected');
            }

            return await client.invoke(methodName, ...args);
        },
        [client, isConnected]
    );

    return { invoke, isConnected };
}

/**
 * Hook pour écouter les mises à jour de Work Orders
 */
export function useWorkOrderUpdates(
    onUpdate: (workOrder: any) => void,
    onDelete?: (id: string) => void
) {
    useSignalREvent(SignalREvents.WORK_ORDER_CREATED, onUpdate);
    useSignalREvent(SignalREvents.WORK_ORDER_UPDATED, onUpdate);

    //TODO - GMAO check this
    if (onDelete) {
        useSignalREvent(SignalREvents.WORK_ORDER_DELETED, onDelete);
    }
}

/**
 * Hook pour écouter les notifications
 */
export function useNotifications(onNotification: (notification: any) => void) {
    useSignalREvent(SignalREvents.NOTIFICATION_RECEIVED, onNotification);
}