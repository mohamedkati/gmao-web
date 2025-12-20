import { AppService } from "@/shared/services/app.service";
import { useQuery } from "@tanstack/react-query"


const PaymentsQuery = {
    all: ['payment-method'] as const,
    lists: () => [...PaymentsQuery.all, 'list'] as const,
    list: (filter?: string) => [...PaymentsQuery.lists(), filter] as const,
    keyValue: (search?: string) => [...PaymentsQuery.all, 'select-as-key-value', search] as const,
    byId: (id?: string) => [...PaymentsQuery.all, 'details', id] as const
}

export const getPaymentMethodByIdQuery = (id?: string) => {
    return useQuery({
        queryKey: PaymentsQuery.byId(id),
        queryFn: () => {
            if (!id) return undefined
            return AppService.paymentMethod.getById(id)
        },
        enabled: !!id,
    });
} 
