// features/customers/components/edit-steps/EditStep3Billing.tsx
import React from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {  CustomerFormData as  CustomerUpdateDto } from "../../types/customer.types";

interface EditStep3BillingProps {
  formData: Partial<CustomerUpdateDto>;
  setFormData: (data: Partial<CustomerUpdateDto>) => void;
}

export const EditStep3Billing: React.FC<EditStep3BillingProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-8 max-w-[1200px]">
      {/* Payment Information Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Payment Information</h3>
        <div className="w-52 h-1 bg-[#635bff] rounded-full mb-6"></div>

        <div className="space-y-5">
          {/* Payment Method & Terms */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="paymentMethod" className="text-sm font-semibold text-gray-700 mb-2">
                Payment method *
              </Label>
              <select
                id="paymentMethod"
                value={ ""}
                onChange={(e) => setFormData({ ...formData })}
                className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                <option value="">Select payment method</option>
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
                value={ ""}
                onChange={(e) => setFormData({ ...formData})}
                className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                <option value="">Select payment terms</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Net 60">Net 60</option>
                <option value="Due on receipt">Due on receipt</option>
              </select>
            </div>
          </div>

          {/* Bank Details (if Bank Transfer) */}
          { (
            <div className="p-5 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h4 className="text-sm font-bold text-gray-900 mb-4">Bank Transfer Details</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankName" className="text-xs font-semibold text-gray-700 mb-2">
                      Bank name
                    </Label>
                    <Input
                      id="bankName"
                      className="h-10"
                      placeholder="BNP Paribas"
                    />
                  </div>
                  <div>
                    <Label htmlFor="iban" className="text-xs font-semibold text-gray-700 mb-2">
                      IBAN
                    </Label>
                    <Input
                      id="iban"
                      className="h-10"
                      placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bic" className="text-xs font-semibold text-gray-700 mb-2">
                    BIC / SWIFT
                  </Label>
                  <Input
                    id="bic"
                    className="h-10"
                    placeholder="BNPAFRPPXXX"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Currency & Invoice Prefix */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="currency" className="text-sm font-semibold text-gray-700 mb-2">
                Currency
              </Label>
              <select
                id="currency"
                value={"EUR"}
                onChange={(e) => setFormData({ ...formData })}
                className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                <option value="EUR">EUR - Euro (€)</option>
                <option value="USD">USD - US Dollar ($)</option>
                <option value="GBP">GBP - British Pound (£)</option>
                <option value="CHF">CHF - Swiss Franc (CHF)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="invoicePrefix" className="text-sm font-semibold text-gray-700 mb-2">
                Invoice prefix
              </Label>
              <Input
                id="invoicePrefix"
                value={ ""}
                onChange={(e) => setFormData({ ...formData })}
                className="h-12"
                placeholder="INV-"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Coefficients Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Pricing Coefficients</h3>
        <div className="w-48 h-1 bg-[#635bff] rounded-full mb-6"></div>

        <div className="space-y-5">
          <div className="p-5 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-4">
              These coefficients will be applied to base prices for this customer. Leave at 1.00 for standard pricing.
            </p>

            <div className="grid grid-cols-3 gap-5">
              <div>
                <Label htmlFor="laborCoeff" className="text-sm font-semibold text-gray-700 mb-2">
                  Labor coefficient
                </Label>
                <Input
                  id="laborCoeff"
                  type="number"
                  step="0.01"
                  value={formData.pricingCoefficients?.laborCoefficient || 1.0}
                  onChange={(e) => setFormData({
                    ...formData,
                    pricingCoefficients: {
                      ...formData.pricingCoefficients,
                      laborCoefficient: parseFloat(e.target.value)
                    } as any
                  })}
                  className="h-12"
                  placeholder="1.00"
                />
              </div>
              <div>
                <Label htmlFor="materialCoeff" className="text-sm font-semibold text-gray-700 mb-2">
                  Material coefficient
                </Label>
                <Input
                  id="materialCoeff"
                  type="number"
                  step="0.01"
                  value={formData.pricingCoefficients?.materialCoefficient || 1.0}
                  onChange={(e) => setFormData({
                    ...formData,
                    pricingCoefficients: {
                      ...formData.pricingCoefficients,
                      materialCoefficient: parseFloat(e.target.value)
                    } as any
                  })}
                  className="h-12"
                  placeholder="1.00"
                />
              </div>
              <div>
                <Label htmlFor="serviceCoeff" className="text-sm font-semibold text-gray-700 mb-2">
                  Service coefficient
                </Label>
                <Input
                  id="serviceCoeff"
                  type="number"
                  step="0.01"
                  value={formData.pricingCoefficients?.equipmentCoefficient || 1.0}
                  onChange={(e) => setFormData({
                    ...formData,
                    pricingCoefficients: {
                      ...formData.pricingCoefficients,
                      serviceCoefficient: parseFloat(e.target.value)
                    } as any
                  })}
                  className="h-12"
                  placeholder="1.00"
                />
              </div>
            </div>
          </div>

          {/* Discount */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="defaultDiscount" className="text-sm font-semibold text-gray-700 mb-2">
                Default discount (%)
              </Label>
              <Input
                id="defaultDiscount"
                type="number"
                step="0.01"
                value={formData.pricingCoefficients?.laborCoefficient || 0}
                onChange={(e) => setFormData({ ...formData })}
                className="h-12"
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="taxRate" className="text-sm font-semibold text-gray-700 mb-2">
                Tax rate (%)
              </Label>
              <Input
                id="taxRate"
                type="number"
                step="0.01"
                value={formData.pricingCoefficients?.materialCoefficient || 20.0}
                onChange={(e) => setFormData({ ...formData })}
                className="h-12"
                placeholder="20.00"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};