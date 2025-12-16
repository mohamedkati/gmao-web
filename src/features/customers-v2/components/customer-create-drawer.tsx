// features/customers/components/CustomerCreateDrawer.tsx
"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useCustomerStore } from "../stores/useCustomerStore";
import { CustomerFormData as CustomerCreateDto, CustomerType } from "../types/customer.types";
import { useCreateCustomer } from "../hooks/user-customers.query";

export const CustomerCreateDrawer: React.FC = () => {
    const { isCreateDrawerOpen, closeCreateDrawer } = useCustomerStore();
    const createMutation = useCreateCustomer();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<CustomerCreateDto>>({
    });

    if (!isCreateDrawerOpen) return null;

    const handleSubmit = async () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            await createMutation.mutateAsync(formData as CustomerCreateDto);
            closeCreateDrawer();
            setCurrentStep(1);
            // setFormData({ customerType: "Professional" });
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-900 bg-opacity-60 z-40"
                onClick={closeCreateDrawer}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 h-full w-[550px] bg-white shadow-2xl z-50 flex flex-col">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">Add new customer</h2>
                            <p className="text-sm text-gray-500">Step {currentStep} of 3</p>
                        </div>
                        <button
                            onClick={closeCreateDrawer}
                            className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 flex items-center gap-2">
                        {[1, 2, 3].map((step) => (
                            <div
                                key={step}
                                className={`h-1.5 flex-1 rounded-full transition-colors ${step <= currentStep ? "bg-[#635bff]" : "bg-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            {/* Info Banner */}
                            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                                <p className="text-sm font-medium text-gray-900 mb-1">💡 Quick tip</p>
                                <p className="text-xs text-gray-600">
                                    Start by entering the company details. You'll be able to add more information in the next steps.
                                </p>
                            </div>

                            {/* Company Name */}
                            <div>
                                <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700 mb-2">
                                    Company name *
                                </Label>
                                <Input
                                    id="companyName"
                                    value={formData.companyName || ""}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    placeholder="Acme Corporation"
                                    className="h-12"
                                />
                            </div>

                            {/* Contact Name */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 mb-2">
                                        Contact first name *
                                    </Label>
                                    <Input
                                        id="firstName"
                                        value={formData.companyName || ""}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        placeholder="John"
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 mb-2">
                                        Last name *
                                    </Label>
                                    <Input
                                        id="lastName"
                                        value={formData.reference || ""}
                                        onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                                        placeholder="Doe"
                                        className="h-12"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2">
                                    Email address *
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.siren || ""}
                                    onChange={(e) => setFormData({ ...formData, siren: e.target.value })}
                                    placeholder="john.doe@acme.com"
                                    className="h-12 border-2 border-[#635bff]"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700 mb-2">
                                    Phone number
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    value={formData.commercialId || ""}
                                    onChange={(e) => setFormData({ ...formData, commercialId: e.target.value })}
                                    placeholder="+33 1 23 45 67 89"
                                    className="h-12"
                                />
                            </div>

                            {/* Customer Type */}
                            <div>
                                <Label htmlFor="customerType" className="text-sm font-semibold text-gray-700 mb-2">
                                    Customer type *
                                </Label>
                                <select
                                    id="customerType"
                                    value={formData.type || "Professional"}
                                    onChange={(e) => setFormData({ ...formData, type: CustomerType.Corporate })}
                                    className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                                >
                                    <option value="Professional">Professional</option>
                                    <option value="Enterprise">Enterprise</option>
                                    <option value="Individual">Individual</option>
                                </select>
                            </div>

                            {/* SIRET */}
                            <div>
                                <Label htmlFor="siret" className="text-sm font-semibold text-gray-700 mb-2">
                                    SIRET number
                                </Label>
                                <Input
                                    id="siret"
                                    value={formData.pricingCoefficients?.laborCoefficient || ""}
                                    onChange={(e) => setFormData({ ...formData })}
                                    placeholder="123 456 789 00012"
                                    className="h-12"
                                />
                            </div>

                            {/* Tags */}
                            <div>
                                <Label htmlFor="tags" className="text-sm font-semibold text-gray-700 mb-2">
                                    Tags
                                    <span className="text-xs text-gray-400 ml-2">(comma separated)</span>
                                </Label>
                                <Input
                                    id="tags"
                                    value={ ""}
                                    onChange={(e) => setFormData({ ...formData })}
                                    placeholder="VIP, Premium"
                                    className="h-12"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Address */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            {/* Info Banner */}
                            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                                <p className="text-sm font-medium text-gray-900 mb-1">📍 Address information</p>
                                <p className="text-xs text-gray-600">
                                    Enter the billing address for this customer. You can add a different mailing address if needed.
                                </p>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900">Billing Address</h3>

                            {/* Street */}
                            <div>
                                <Label htmlFor="street" className="text-sm font-semibold text-gray-700 mb-2">
                                    Street address *
                                </Label>
                                <Input
                                    id="street"
                                    value={formData.invoiceAddress?.street|| ""}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                    })}
                                    placeholder="123 Rue de la Paix"
                                    className="h-12"
                                />
                            </div>

                            {/* City & Postal Code */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="city" className="text-sm font-semibold text-gray-700 mb-2">
                                        City *
                                    </Label>
                                    <Input
                                        id="city"
                                        value={formData.invoiceAddress?.city || ""}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                        })}
                                        placeholder="Paris"
                                        className="h-12"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="postalCode" className="text-sm font-semibold text-gray-700 mb-2">
                                        Postal code *
                                    </Label>
                                    <Input
                                        id="postalCode"
                                        value={formData.invoiceAddress?.postalCode || ""}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                        })}
                                        placeholder="75001"
                                        className="h-12"
                                    />
                                </div>
                            </div>

                            {/* Country */}
                            <div>
                                <Label htmlFor="country" className="text-sm font-semibold text-gray-700 mb-2">
                                    Country *
                                </Label>
                                <select
                                    id="country"
                                    value={formData.invoiceAddress?.country || ""}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                    })}
                                    className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                                >
                                    <option value="">Select country</option>
                                    <option value="France">🇫🇷 France</option>
                                    <option value="Belgium">🇧🇪 Belgium</option>
                                    <option value="Switzerland">🇨🇭 Switzerland</option>
                                    <option value="Luxembourg">🇱🇺 Luxembourg</option>
                                </select>
                            </div>

                            {/* Same as billing checkbox */}
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    id="sameAsBilling"
                                    className="w-4 h-4 text-[#635bff] border-gray-300 rounded focus:ring-[#635bff]"
                                />
                                <Label htmlFor="sameAsBilling" className="text-sm font-medium text-gray-600 cursor-pointer">
                                    Mailing address is the same as billing address
                                </Label>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Billing & Payment */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            {/* Info Banner */}
                            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                                <p className="text-sm font-medium text-gray-900 mb-1">💰 Payment information</p>
                                <p className="text-xs text-gray-600">
                                    Configure payment terms and pricing for this customer.
                                </p>
                            </div>

                            {/* Payment Method & Terms */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="paymentMethod" className="text-sm font-semibold text-gray-700 mb-2">
                                        Payment method *
                                    </Label>
                                    <select
                                        id="paymentMethod"
                                        value={formData.paymentMethodId || ""}
                                        onChange={(e) => setFormData({ ...formData
                                        })}
                                        className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                                    >
                                        <option value="">Select method</option>
                                        <option value="BankTransfer">Bank Transfer</option>
                                        <option value="CreditCard">Credit Card</option>
                                        <option value="Check">Check</option>
                                        <option value="DirectDebit">Direct Debit</option>
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="paymentTerms" className="text-sm font-semibold text-gray-700 mb-2">
                                        Payment terms *
                                    </Label>
                                    <select
                                        id="paymentTerms"
                                        value={formData.billingSettings?.paymentTermsDays || ""}
                                        onChange={(e) => setFormData({ ...formData
                                        })}
                                        className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                                    >
                                        <option value="">Select terms</option>
                                        <option value="Net 15">Net 15</option>
                                        <option value="Net 30">Net 30</option>
                                        <option value="Net 45">Net 45</option>
                                        <option value="Net 60">Net 60</option>
                                        <option value="Due on receipt">Due on receipt</option>
                                    </select>
                                </div>
                            </div>

                            {/* VAT Number */}
                            <div>
                                <Label htmlFor="tvaNumber" className="text-sm font-semibold text-gray-700 mb-2">
                                    VAT number
                                </Label>
                                <Input
                                    id="tvaNumber"
                                    value={ ""}
                                    onChange={(e) => setFormData({ ...formData
                                    })}
                                    placeholder="FR12345678901"
                                    className="h-12"
                                />
                            </div>

                            {/* Pricing Coefficients */}
                            <div className="bg-orange-50 rounded-lg p-4">
                                <h4 className="text-sm font-bold text-gray-900 mb-3">Pricing Coefficients</h4>
                                <p className="text-xs text-gray-600 mb-4">
                                    Apply custom pricing multipliers for this customer. Default is 1.00 for standard pricing.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="laborCoeff" className="text-xs font-semibold text-gray-700 mb-2">
                                            Labor coefficient
                                        </Label>
                                        <Input
                                            id="laborCoeff"
                                            type="number"
                                            step="0.01"
                                            defaultValue="1.00"
                                            className="h-10"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="materialCoeff" className="text-xs font-semibold text-gray-700 mb-2">
                                            Material coefficient
                                        </Label>
                                        <Input
                                            id="materialCoeff"
                                            type="number"
                                            step="0.01"
                                            defaultValue="1.00"
                                            className="h-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <Label htmlFor="notes" className="text-sm font-semibold text-gray-700 mb-2">
                                    Notes
                                    <span className="text-xs text-gray-400 ml-2">(optional)</span>
                                </Label>
                                <textarea
                                    id="notes"
                                    value={formData.comment || ""}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent resize-none"
                                    placeholder="Add any additional information..."
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                    <Button
                        onClick={closeCreateDrawer}
                        variant="outline"
                        className="px-6"
                    >
                        Cancel
                    </Button>
                    <div className="flex items-center gap-3">
                        {currentStep > 1 && (
                            <Button
                                onClick={() => setCurrentStep(currentStep - 1)}
                                variant="outline"
                                className="px-6"
                            >
                                Back
                            </Button>
                        )}
                        <Button
                            onClick={handleSubmit}
                            disabled={createMutation.isPending}
                            className="px-6 bg-gradient-to-r from-[#635bff] to-[#7a73ff]"
                        >
                            {currentStep === 3 ? "Create customer" : "Continue"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};