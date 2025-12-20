"use client"

import { CreditCard, DollarSign, Sparkles, Users2 } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/shadcnui/tabs";
import { cn } from "@/shared/lib/utils/cn";
import { Customer } from "../../types/customer.types";

interface CustomerDetailTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    customer: Customer
}
export function CustomerDetailTabs({ activeTab, setActiveTab, customer }: CustomerDetailTabsProps) {
    return (
        <Tabs>
            <div className="sticky top-0 z-20 border-b backdrop-blur-xl bg-background/80 shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-8">
                        <TabsTrigger
                            value="overview"
                            onClick={() => setActiveTab("overview")}
                            className={cn(
                                "relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200",
                                activeTab === "overview" && "data-[state=active]:text-foreground"
                            )}
                        >
                            <span className="relative z-10 flex items-center gap-2 font-medium">
                                <Sparkles className="h-4 w-4" />
                                Vue d'ensemble
                            </span>
                            {activeTab === "overview" && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500" />
                            )}
                        </TabsTrigger>

                        <TabsTrigger
                            value="contacts"
                            onClick={() => setActiveTab("contacts")}
                            className={cn(
                                "relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200",
                                activeTab === "contacts" && "data-[state=active]:text-foreground"
                            )}
                        >
                            <span className="relative z-10 flex items-center gap-2 font-medium">
                                <Users2 className="h-4 w-4" />
                                Contacts
                                <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full flex items-center justify-center text-xs backdrop-blur-sm">
                                    {customer.contacts.length || 0}
                                </Badge>
                            </span>
                            {activeTab === "contacts" && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500" />
                            )}
                        </TabsTrigger>

                        <TabsTrigger
                            value="billing"
                            onClick={() => setActiveTab("billing")}
                            className={cn(
                                "relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200",
                                activeTab === "billing" && "data-[state=active]:text-foreground"
                            )}
                        >
                            <span className="relative z-10 flex items-center gap-2 font-medium">
                                <CreditCard className="h-4 w-4" />
                                Facturation
                            </span>
                            {activeTab === "billing" && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500" />
                            )}
                        </TabsTrigger>

                        <TabsTrigger
                            value="budgets"
                            onClick={() => setActiveTab("budgets")}
                            className={cn(
                                "relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200",
                                activeTab === "budgets" && "data-[state=active]:text-foreground"
                            )}
                        >
                            <span className="relative z-10 flex items-center gap-2 font-medium">
                                <DollarSign className="h-4 w-4" />
                                Budgets
                                <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full flex items-center justify-center text-xs backdrop-blur-sm">
                                    {customer.maintenanceBudgets.length}
                                </Badge>
                            </span>
                            {activeTab === "budgets" && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500" />
                            )}
                        </TabsTrigger>
                    </TabsList>
                </div>
            </div>
        </Tabs>
    )
}