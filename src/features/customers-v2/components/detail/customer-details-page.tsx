"use client"

import { Calendar, ChevronLeft, Clock, Sparkles } from "lucide-react";
import { Customer } from "../../types/customer.types"
import { Button } from "@/shared/components/shadcnui/button";
import { Tabs, TabsContent } from "@/shared/components/shadcnui/tabs";
import { lazy, Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { CustomerDetailsHeader } from "./customer-details-header";
import { CustomerDetailTabs } from "./customer-detail-tabs";
import { LoadingOverlay, LoadingSpinner, SkeletonLoader } from "@/shared/components";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";

interface ICustomerDetailsPageProps {
    customer: Customer;
}

const CustomerOverviewSection = lazy(() => import("./tabs/customer-overview-section").then(m => ({ default: m.CustomerOverviewSection })));
const CustomerContactsSection = lazy(() => import("../contacts/customer-contact-section").then(m => ({ default: m.CustomerContactsSection })));
const CustomerBillingSection = lazy(() => import("./tabs/customer-billing-section").then(m => ({ default: m.CustomerBillingSection })));
const CustomerBudgetsSection = lazy(() => import("../budgets/customer-budgets-section").then(m => ({ default: m.CustomerBudgetsSection })));

export function CustomerDetailsPage({ customer }: ICustomerDetailsPageProps) {

    const [activeTab, setActiveTab] = useState("overview");

    const router = useRouter();

    return (
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-xl p-6 hover:scale-[1.00] transition-all duration-300 shadow-lg">
            {/* 🎨 HEADER HERO avec Glass Morphism - Full Width */}
            <div className="relative border-b overflow-hidden">
                {/* Animated gradient blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

                {/* Decorative sparkles */}
                <div className="absolute top-8 right-8 animate-pulse">
                    <Sparkles className="h-8 w-8 text-primary/40" />
                </div>
                <div className="absolute top-16 right-24 animate-pulse" style={{ animationDelay: "0.5s" }}>
                    <Sparkles className="h-5 w-5 text-purple-500/40" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                    {/* Breadcrumb */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/customers-v2")}
                        className="mb-6 -ml-2 backdrop-blur-sm  hover:bg-primary/10 hover:text-primary/70 "
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Retour aux clients
                    </Button>

                    {/* Header content */}
                    <CustomerDetailsHeader customer={customer} />
                </div>
            </div>

            {/* 🎨 TABS NAVIGATION - Sticky */}
            <CustomerDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} customer={customer} />

            {/* 🎨 CONTENT - Full Width avec max-width */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-muted/20">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <Suspense fallback={<SkeletonLoader type="card" count={2} />}>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsContent value="overview" className="mt-0 space-y-8 animate-in fade-in duration-500">
                                <CustomerOverviewSection customer={customer} />
                            </TabsContent>

                            <TabsContent value="contacts" className="mt-0 space-y-6 animate-in fade-in duration-500">
                                <CustomerContactsSection customer={customer} />
                            </TabsContent>

                            <TabsContent value="billing" className="mt-0 space-y-8 animate-in fade-in duration-500">
                                <CustomerBillingSection customer={customer} />
                            </TabsContent>

                            <TabsContent value="budgets" className="mt-0 space-y-6 animate-in fade-in duration-500">
                                <CustomerBudgetsSection customer={customer} />
                            </TabsContent>
                        </Tabs>
                    </Suspense>

                </div>

                {/* 🎨 FOOTER avec infos */}
                <div className="border-t backdrop-blur-xl bg-muted/30 mt-12">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <div className="p-2 rounded-lg bg-background border border-border/50">
                                    <Calendar className="h-4 w-4" />
                                </div>
                                <span>
                                    Créé le{" "}
                                    <strong className="text-foreground">
                                        {new Date(customer.createdAt).toLocaleDateString("fr-FR", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </strong>
                                </span>
                            </div>

                            <div className="h-10 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

                            <div className="flex items-center gap-3 text-muted-foreground">
                                <div className="p-2 rounded-lg bg-background border border-border/50">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <span>
                                    Modifié le{" "}
                                    <strong className="text-foreground">
                                        {new Date(customer.lastModifiedAt).toLocaleDateString("fr-FR", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

