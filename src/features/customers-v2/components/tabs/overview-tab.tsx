// features/customers/components/tabs/OverviewTab.tsx
import React from "react";
import { Building2, Users, DollarSign, Wrench } from "lucide-react";
import { StatsCard } from "@/shared/components/stripe/stats-card";
import { QuickAccessCard } from "@/shared/components/stripe/quick-access-card";
import { Customer } from "../../types/customer.types";

interface OverviewTabProps {
    customer: Customer;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ customer }) => {
    return (
        <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-6">
                <StatsCard
                    icon={Building2}
                    iconBgColor="bg-[#e0d9ff] text-[#635bff]"
                    label="PROPERTIES"
                    value="8"
                    subtitle="sites"
                />
                <StatsCard
                    icon={Users}
                    iconBgColor="bg-green-50 text-green-600"
                    label="CONTACTS"
                    value="3"
                    subtitle="people"
                />
                <StatsCard
                    icon={DollarSign}
                    iconBgColor="bg-orange-50 text-orange-500"
                    label="ACTIVE BUDGETS"
                    value="5"
                    subtitle="/ €245K"
                />
                <StatsCard
                    icon={Wrench}
                    iconBgColor="bg-red-50 text-red-600"
                    label="WORK ORDERS (OPEN)"
                    value="12"
                    subtitle="3 urgent"
                />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-[580px_1fr] gap-6">
                {/* Left Column - Customer Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Customer Information</h2>
                        <button className="px-4 py-2 bg-gray-50 text-[#635bff] text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                            ✏️ Edit
                        </button>
                    </div>

                    <div className="border-t border-gray-100 pt-6 space-y-6">
                        {/* Company */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">COMPANY</p>
                                <p className="text-sm font-medium text-gray-900">{customer.companyName}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">TYPE</p>
                                <span className="inline-flex px-3 py-1 bg-[#e0d9ff] text-[#635bff] text-xs font-semibold rounded-full">
                                    {customer.type || "Professional"}
                                </span>
                            </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">EMAIL</p>
                                <p className="text-sm font-medium text-gray-900">{"TEST @ test.com"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">PHONE</p>
                                <p className="text-sm font-medium text-gray-900">{"0641830560"}</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">ADDRESS</p>
                            <p className="text-sm font-medium text-gray-900">{customer.invoiceAddress?.street || "N/A"}</p>
                            <p className="text-sm text-gray-500">
                                {customer.invoiceAddress?.postalCode} {customer.invoiceAddress?.city}, {customer.invoiceAddress?.country}
                            </p>
                        </div>

                        {/* SIRET & VAT */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">SIRET</p>
                                <p className="text-sm font-medium text-gray-900">{customer.siren || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">VAT NUMBER</p>
                                <p className="text-sm font-medium text-gray-900">{"020203325263"}</p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">TAGS</p>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-[#e0d9ff] text-[#635bff] text-xs font-semibold rounded-full">VIP</span>
                                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">Premium</span>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">PAYMENT METHOD</p>
                                <p className="text-sm font-medium text-gray-900">{customer.paymentMethod?.name || "Bank Transfer"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">PAYMENT TERMS</p>
                                <p className="text-sm font-medium text-gray-900">{customer.billingSettings.paymentTermsDays || "Net 30"}</p>
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">CUSTOMER SINCE</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {customer.created ? new Date(customer.created).toLocaleDateString() : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">LAST UPDATED</p>
                                <p className="text-sm font-medium text-gray-900">2 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Quick Access */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Access</h2>

                    <div className="border-t border-gray-100 pt-6">
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <QuickAccessCard
                                icon={Users}
                                iconBgColor="bg-green-50 text-green-600"
                                title="Contacts"
                                subtitle="3 people"
                                onClick={() => { }}
                            />
                            <QuickAccessCard
                                icon={DollarSign}
                                iconBgColor="bg-[#e0d9ff] text-[#635bff]"
                                title="Budgets"
                                subtitle="5 active • €245K total"
                                onClick={() => { }}
                            />
                            <QuickAccessCard
                                icon={Building2}
                                iconBgColor="bg-[#e0d9ff] text-[#635bff]"
                                title="Properties"
                                subtitle="8 sites"
                                onClick={() => { }}
                            />
                            <QuickAccessCard
                                icon={Wrench}
                                iconBgColor="bg-orange-50 text-orange-500"
                                title="Work Orders"
                                subtitle="12 open • 3 urgent"
                                onClick={() => { }}
                            />
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-gray-900">Recent Activity</h3>
                                <button className="text-sm font-semibold text-[#635bff] hover:text-[#7a73ff] transition-colors">
                                    View all →
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Activity Item 1 */}
                                <div className="flex gap-3">
                                    <div className="relative">
                                        <div className="w-3 h-3 rounded-full bg-[#635bff]" />
                                        <div className="absolute top-3 left-1.5 w-0.5 h-10 bg-gray-200" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 mb-1">Invoice #INV-2024-089 paid</p>
                                        <p className="text-xs text-gray-400">2 hours ago</p>
                                    </div>
                                </div>

                                {/* Activity Item 2 */}
                                <div className="flex gap-3">
                                    <div className="relative">
                                        <div className="w-3 h-3 rounded-full bg-green-600" />
                                        <div className="absolute top-3 left-1.5 w-0.5 h-10 bg-gray-200" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 mb-1">New property "Villa Mer" added</p>
                                        <p className="text-xs text-gray-400">Yesterday at 3:24 PM</p>
                                    </div>
                                </div>

                                {/* Activity Item 3 */}
                                <div className="flex gap-3">
                                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 mb-1">Budget updated for Site A</p>
                                        <p className="text-xs text-gray-400">Dec 13 at 10:15 AM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};