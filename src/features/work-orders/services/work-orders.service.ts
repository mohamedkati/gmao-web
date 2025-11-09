import apiClient from '@/shared/lib/api/api-client';
import { API_ENDPOINTS } from '@/shared/lib/constants/api.constants';
import {
    type WorkOrder,
    type CreateWorkOrderDto,
    type UpdateWorkOrderDto,
    WorkOrderStatus,
} from '../types/work-order.types';
import type { PaginatedResponse } from '@/shared/types/common.types';
import { generateMockWorkOrder, generateMockWorkOrders } from './mock/work-orders.mock';


let MOCK_DATA: WorkOrder[] = generateMockWorkOrders(150); // jeu de données initial

function simulateDelay(ms = 400) {
    return new Promise((res) => setTimeout(res, ms));
}

export const workOrdersService = {
    /**
     * Récupère tous les work orders
     */
    getAll: async (): Promise<WorkOrder[]> => {
        await simulateDelay(10);
        // const { data } = await apiClient.get<WorkOrder[]>(API_ENDPOINTS.WORK_ORDERS.BASE);
        // return data;
        console.log("getAll intervs called");
        return [...MOCK_DATA];
    },

    /**
     * Récupère les work orders paginés
     */
    getPaginated: async (
        page: number = 1,
        pageSize: number = 20
    ): Promise<PaginatedResponse<WorkOrder>> => {
        // const { data } = await apiClient.get<PaginatedResponse<WorkOrder>>(
        //   API_ENDPOINTS.WORK_ORDERS.BASE,
        //   {
        //     params: { page, pageSize },
        //   }
        // );
        // return data;

        await simulateDelay(10);
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return { data: MOCK_DATA.slice(start, end), meta: { page: page, pageSize: pageSize, total: MOCK_DATA.length, totalPages: Math.ceil(MOCK_DATA.length / pageSize) } };
    },

    /**
     * Récupère un work order par ID
     */
    getById: async (id: string): Promise<WorkOrder> => {
        // const { data } = await apiClient.get<WorkOrder>(
        //     API_ENDPOINTS.WORK_ORDERS.BY_ID(id)
        // );
        // return data;

        await simulateDelay();
        const order = MOCK_DATA.find((w) => w.id === id);
        if (!order) throw new Error('Work order introuvable');
        return order;
    },

    /**
     * Récupère les work orders par statut
     */
    getByStatus: async (status: string): Promise<WorkOrder[]> => {
        // const { data } = await apiClient.get<WorkOrder[]>(
        //     API_ENDPOINTS.WORK_ORDERS.BY_STATUS(status)
        // );
        // return data;

        await simulateDelay(10);
        return MOCK_DATA.filter((w) => w.status === status);
    },

    /**
     * Crée un work order
     */
    create: async (dto: CreateWorkOrderDto): Promise<WorkOrder> => {
        // const { data } = await apiClient.post<WorkOrder>(
        //     API_ENDPOINTS.WORK_ORDERS.BASE,
        //     dto
        // );
        // return data;

        await simulateDelay();
        const newOrder = generateMockWorkOrder({
            id: crypto.randomUUID(),
            ...dto,
            status: WorkOrderStatus.PENDING,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        MOCK_DATA.unshift(newOrder);
        return newOrder;
    },

    /**
     * Met à jour un work order
     */
    update: async (id: string, dto: UpdateWorkOrderDto): Promise<WorkOrder> => {
        // const { data } = await apiClient.put<WorkOrder>(
        //     API_ENDPOINTS.WORK_ORDERS.BY_ID(id),
        //     dto
        // );
        // return data;

        await simulateDelay();
        const index = MOCK_DATA.findIndex((w) => w.id === id);
        if (index === -1) throw new Error('Work order non trouvé');
        const order = MOCK_DATA[index];
        MOCK_DATA[index] = { ...order!, ...dto, completedDate: dto.completedDate, updatedAt: new Date().toISOString() };
        return MOCK_DATA[index];
    },

    /**
     * Supprime un work order
     */
    delete: async (id: string): Promise<void> => {
        // await apiClient.delete(API_ENDPOINTS.WORK_ORDERS.BY_ID(id));

        await simulateDelay();
        MOCK_DATA = MOCK_DATA.filter((w) => w.id !== id);
    },

    /**
     * Assigne un technicien
     */
    assign: async (id: string, technicianId: string): Promise<WorkOrder> => {
        // const { data } = await apiClient.post<WorkOrder>(
        //     API_ENDPOINTS.WORK_ORDERS.ASSIGN(id),
        //     { technicianId }
        // );
        // return data;

        await simulateDelay(10);
        const order = MOCK_DATA.find((w) => w.id === id);
        if (!order) throw new Error('Work order non trouvé');
        order.technicianId = technicianId;
        order.updatedAt = new Date().toISOString();
        return order;
    },

    /**
     * Marque comme terminé
     */
    complete: async (id: string): Promise<WorkOrder> => {
        // const { data } = await apiClient.post<WorkOrder>(
        //     API_ENDPOINTS.WORK_ORDERS.COMPLETE(id)
        // );
        // return data;

        await simulateDelay();
        const order = MOCK_DATA.find((w) => w.id === id);
        if (!order) throw new Error('Work order non trouvé');
        order.status = WorkOrderStatus.COMPLETED;
        order.completedDate = new Date().toISOString();
        order.updatedAt = new Date().toISOString();
        return order;
    },

    /**
     * Annule un work order
     */
    cancel: async (id: string): Promise<WorkOrder> => {
        // const { data } = await apiClient.post<WorkOrder>(
        //     API_ENDPOINTS.WORK_ORDERS.CANCEL(id)
        // );
        // return data;
        await simulateDelay();
        const order = MOCK_DATA.find((w) => w.id === id);
        if (!order) throw new Error('Work order non trouvé');
        order.status = WorkOrderStatus.CANCELLED;
        order.updatedAt = new Date().toISOString();
        return order;
    },

    /**
     * Export en PDF/Excel
     */
    export: async (format: 'pdf' | 'excel'): Promise<Blob> => {
        const { data } = await apiClient.get(API_ENDPOINTS.WORK_ORDERS.EXPORT, {
            params: { format },
            responseType: 'blob',
        });
        return data;
    },
};