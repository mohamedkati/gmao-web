import { apiClient } from "../lib/api/api-client";
import { PaymentMethod } from "../types/business/payment-methods";
import { ApiResponse } from "../types/common.types";


export const AppService = {

    paymentMethod: {
        listAll: async (filter?:string) => {
            const params : any = {};
            if(filter)
                params.search = filter;

            const response : ApiResponse<PaymentMethod[]> = await apiClient.get(`/payment-methods`,{params});
            return response.data;
        },

        getById: async(id?:string)=>{
            const response : ApiResponse<PaymentMethod> = await apiClient.get(`/payment-methods/${id}`);
            return response.data;
        }
    }
}