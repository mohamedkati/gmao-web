// features/customers/components/edit-steps/EditStep2Addresses.tsx
import React from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { CustomerFormData as CustomerUpdateDto } from "../../types/customer.types";

interface EditStep2AddressesProps {
  formData: Partial<CustomerUpdateDto>;
  setFormData: (data: Partial<CustomerUpdateDto>) => void;
}

export const EditStep2Addresses: React.FC<EditStep2AddressesProps> = ({ formData, setFormData }) => {
  const [sameAsBilling, setSameAsBilling] = React.useState(false);

  return (
    <div className="space-y-8 max-w-[1200px]">
      {/* Billing Address Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Billing Address</h3>
        <div className="w-40 h-1 bg-[#635bff] rounded-full mb-6"></div>

        <div className="space-y-5">
          {/* Street */}
          <div>
            <Label htmlFor="billingStreet" className="text-sm font-semibold text-gray-700 mb-2">
              Street address *
            </Label>
            <Input
              id="billingStreet"
              value={formData.invoiceAddress?.street || ""}
              onChange={(e) => setFormData({
                ...formData,
                invoiceAddress: { ...formData.invoiceAddress, street: e.target.value } as any
              })}
              className="h-12"
              placeholder="123 Rue de la Paix"
            />
          </div>

          {/* City & Postal Code */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="billingCity" className="text-sm font-semibold text-gray-700 mb-2">
                City *
              </Label>
              <Input
                id="billingCity"
                value={formData.invoiceAddress?.city || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  invoiceAddress: { ...formData.invoiceAddress, city: e.target.value } as any
                })}
                className="h-12"
                placeholder="Paris"
              />
            </div>
            <div>
              <Label htmlFor="billingPostalCode" className="text-sm font-semibold text-gray-700 mb-2">
                Postal code *
              </Label>
              <Input
                id="billingPostalCode"
                value={formData.invoiceAddress?.postalCode || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  invoiceAddress: { ...formData.invoiceAddress, postalCode: e.target.value } as any
                })}
                className="h-12"
                placeholder="75001"
              />
            </div>
          </div>

          {/* State & Country */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="billingState" className="text-sm font-semibold text-gray-700 mb-2">
                State / Region
              </Label>
              <Input
                id="billingState"
                value={formData.invoiceAddress?.firstAddressLine || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  invoiceAddress: { ...formData.invoiceAddress, state: e.target.value } as any
                })}
                className="h-12"
                placeholder="Île-de-France"
              />
            </div>
            <div>
              <Label htmlFor="billingCountry" className="text-sm font-semibold text-gray-700 mb-2">
                Country *
              </Label>
              <select
                id="billingCountry"
                value={formData.invoiceAddress?.country || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  invoiceAddress: { ...formData.invoiceAddress, country: e.target.value } as any
                })}
                className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                <option value="">Select country</option>
                <option value="France">🇫🇷 France</option>
                <option value="Belgium">🇧🇪 Belgium</option>
                <option value="Switzerland">🇨🇭 Switzerland</option>
                <option value="Luxembourg">🇱🇺 Luxembourg</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Mailing Address Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Mailing Address</h3>
        <div className="w-44 h-1 bg-[#635bff] rounded-full mb-6"></div>

        {/* Same as Billing checkbox */}
        <div className="flex items-center gap-3 p-5 bg-gray-50 rounded-lg mb-5">
          <input
            type="checkbox"
            id="sameAsBilling"
            checked={sameAsBilling}
            onChange={(e) => {
              setSameAsBilling(e.target.checked);
              if (e.target.checked) {
                setFormData({
                  ...formData,
                  mailingAddress: formData.invoiceAddress
                });
              }
            }}
            className="w-4 h-4 text-[#635bff] border-gray-300 rounded focus:ring-[#635bff]"
          />
          <Label htmlFor="sameAsBilling" className="text-sm font-medium text-gray-600 cursor-pointer">
            Mailing address is the same as billing address
          </Label>
        </div>

        <div className="space-y-5">
          {/* Street */}
          <div>
            <Label htmlFor="mailingStreet" className="text-sm font-semibold text-gray-700 mb-2">
              Street address
            </Label>
            <Input
              id="mailingStreet"
              value={formData.mailingAddress?.street || ""}
              onChange={(e) => setFormData({
                ...formData,
                mailingAddress: { ...formData.mailingAddress, street: e.target.value } as any
              })}
              className="h-12"
              placeholder="456 Avenue des Champs"
              disabled={sameAsBilling}
            />
          </div>

          {/* City & Postal Code */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="mailingCity" className="text-sm font-semibold text-gray-700 mb-2">
                City
              </Label>
              <Input
                id="mailingCity"
                value={formData.mailingAddress?.city || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  mailingAddress: { ...formData.mailingAddress, city: e.target.value } as any
                })}
                className="h-12"
                placeholder="Paris"
                disabled={sameAsBilling}
              />
            </div>
            <div>
              <Label htmlFor="mailingPostalCode" className="text-sm font-semibold text-gray-700 mb-2">
                Postal code
              </Label>
              <Input
                id="mailingPostalCode"
                value={formData.mailingAddress?.postalCode || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  mailingAddress: { ...formData.mailingAddress, postalCode: e.target.value } as any
                })}
                className="h-12"
                placeholder="75008"
                disabled={sameAsBilling}
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <Label htmlFor="mailingCountry" className="text-sm font-semibold text-gray-700 mb-2">
              Country
            </Label>
            <select
              id="mailingCountry"
              value={formData.mailingAddress?.country || ""}
              onChange={(e) => setFormData({
                ...formData,
                mailingAddress: { ...formData.mailingAddress, country: e.target.value } as any
              })}
              className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              disabled={sameAsBilling}
            >
              <option value="">Select country</option>
              <option value="France">🇫🇷 France</option>
              <option value="Belgium">🇧🇪 Belgium</option>
              <option value="Switzerland">🇨🇭 Switzerland</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};