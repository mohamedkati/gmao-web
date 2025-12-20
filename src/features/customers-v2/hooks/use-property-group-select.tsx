
import { useCallback } from "react";
import { apiClient } from "@/shared/lib/api/api-client";
import { ApiResponse } from "@/shared/types/common.types";

export interface PropertyGroupSelectItem {
    id: string;
    reference: string;
    name: string;
    type: number;
}

export const usePropertyGroupSelect = () => {
    const fetchPropertyGroups = useCallback(async (search?: string) => {
        const params: any = {};
        if (search) {
            params.search = search;
        }

        const response : ApiResponse<PropertyGroupSelectItem[]> = await apiClient.get(
            "property-groups/select-as-key-value",
            { params }
        );
        return response.data;
    }, []);

    return {
        fetchPropertyGroups,
        queryKey: ["property-groups", "select"],
    };
};