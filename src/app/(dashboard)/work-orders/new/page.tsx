"use client"
import { WorkOrderForm } from "@/features/work-orders/components/work-order-form";

export default function Page() {
    function data(d:any){
        console.log(d);
    }
    return <WorkOrderForm 
    onSubmit={data}
    submitLabel="ajouter">

    </WorkOrderForm>
}