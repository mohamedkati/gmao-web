import { DynamicSelect, SelectOption } from "@/shared/components/ui/dynamic-select";
import { usePaymentMethod } from "@/shared/hooks/app/use-payment-method";
import { PaymentMethod } from "@/shared/types/business/payment-methods";

interface PaymentMethodSelectProps {
    onValueChange: (value?: string) => void;
    value?:string;
}
export function PaymentMethodSelect({ onValueChange,value }: PaymentMethodSelectProps) {
    const { searchPaymentMethod, queryKey } = usePaymentMethod();

    const mapToOption = (item: PaymentMethod): SelectOption => ({
        value: item.id,
        label: item.name,
        subtitle: `${item.terms}`,
    });

    return <DynamicSelect
        value={value}
        fetchFunction={searchPaymentMethod}
        queryKey={queryKey}
        allowClear={true}
        placeholder="choisir le mode de réglement"
        searchPlaceholder="rechercher un mode de réglement"
        mapToOption={mapToOption}
        onValueChange={onValueChange}
    />
}