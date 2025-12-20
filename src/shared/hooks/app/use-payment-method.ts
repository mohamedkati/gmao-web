import { apiClient } from "@/shared/lib/api/api-client";
import { PaymentMethod } from "@/shared/types/business/payment-methods";
import { ApiResponse } from "@/shared/types/common.types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export const usePaymentMethod = () => {
    const searchPaymentMethod = useCallback(async (search?: string) => {
        const params: any = {};
        if (search)
            params.search = search;
        const response: ApiResponse<PaymentMethod[]> = await apiClient.get('/payment-methods/get-as-key-value', { params })
        return response.data;
    }, []);

    return {
        searchPaymentMethod,
        queryKey: ['payment-methods', 'select']
    }
}