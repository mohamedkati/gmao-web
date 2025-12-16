import { BudgetCreateDrawer } from "@/features/customers-v2/components/budget-create-contact";
import { ContactCreateDrawer } from "@/features/customers-v2/components/contact-create-drawer";
import { CustomerCreateDrawer } from "@/features/customers-v2/components/customer-create-drawer";
import { CustomerListContent } from "@/features/customers-v2/components/customer-listing";

export default function Customerpage() {

    return <>
        {/* Global Drawers - Always mounted */}
        <CustomerListContent></CustomerListContent>
        <CustomerCreateDrawer />
        <ContactCreateDrawer />
        <BudgetCreateDrawer />
    </>
}