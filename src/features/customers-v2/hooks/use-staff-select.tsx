import { useCallback } from "react";
import { apiClient } from "@/shared/lib/api/api-client";
import { ApiResponse } from "@/shared/types/common.types";

export interface StaffSelectItem {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export const useStaffSelect = () => {
  const fetchStaff = useCallback(async (search?: string) => {
    const params: any = { }; // Filtrer uniquement les commerciaux
    if (search) {
      params.search = search;
    }
    
    const response :ApiResponse<StaffSelectItem[]> = await apiClient.get(
      "staffs/select-as-key-value",
      { params }
    );
    return response.data;
  }, []);

  return {
    fetchStaff,
    queryKey: ["staff", "select", "commercial"],
  };
};