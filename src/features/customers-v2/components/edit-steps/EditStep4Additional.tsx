// features/customers/components/edit-steps/EditStep4Additional.tsx
import React from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { CustomerFormData as CustomerUpdateDto } from "../../types/customer.types";

interface EditStep4AdditionalProps {
  formData: Partial<CustomerUpdateDto>;
  setFormData: (data: Partial<CustomerUpdateDto>) => void;
}

export const EditStep4Additional: React.FC<EditStep4AdditionalProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-8 max-w-[1200px]">
      {/* Commercial Assignment Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Commercial Assignment</h3>
        <div className="w-56 h-1 bg-[#635bff] rounded-full mb-6"></div>

        <div className="space-y-5">
          <div>
            <Label htmlFor="assignedCommercialId" className="text-sm font-semibold text-gray-700 mb-2">
              Assigned commercial
            </Label>
            <select
              id="assignedCommercialId"
              value={formData.commercialId || ""}
              onChange={(e) => setFormData({ ...formData, commercialId: e.target.value })}
              className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
            >
              <option value="">Select a commercial</option>
              <option value="1">Mohammed Ahmed - Sales Manager</option>
              <option value="2">Sophie Martin - Account Executive</option>
              <option value="3">Lucas Dubois - Senior Sales Rep</option>
            </select>
          </div>

          <div>
            <Label htmlFor="accountManagerId" className="text-sm font-semibold text-gray-700 mb-2">
              Account manager
            </Label>
            <select
              id="accountManagerId"
              value={ ""}
              onChange={(e) => setFormData({ ...formData})}
              className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
            >
              <option value="">Select an account manager</option>
              <option value="1">Marie Laurent - Account Manager</option>
              <option value="2">Pierre Bernard - Senior Account Manager</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contract Information Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Contract Information</h3>
        <div className="w-52 h-1 bg-[#635bff] rounded-full mb-6"></div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="contractStartDate" className="text-sm font-semibold text-gray-700 mb-2">
                Contract start date
              </Label>
              <Input
                id="contractStartDate"
                type="date"
                value={""}
                onChange={(e) => setFormData({ ...formData })}
                className="h-12"
              />
            </div>
            <div>
              <Label htmlFor="contractEndDate" className="text-sm font-semibold text-gray-700 mb-2">
                Contract end date
              </Label>
              <Input
                id="contractEndDate"
                type="date"
                value={ ""}
                onChange={(e) => setFormData({ ...formData })}
                className="h-12"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contractType" className="text-sm font-semibold text-gray-700 mb-2">
              Contract type
            </Label>
            <select
              id="contractType"
              value={ ""}
              onChange={(e) => setFormData({ ...formData})}
              className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
            >
              <option value="">Select contract type</option>
              <option value="Annual">Annual Maintenance</option>
              <option value="Quarterly">Quarterly Service</option>
              <option value="Monthly">Monthly Subscription</option>
              <option value="OneTime">One-Time Project</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Notes & Comments</h3>
        <div className="w-48 h-1 bg-[#635bff] rounded-full mb-6"></div>

        <div className="space-y-5">
          <div>
            <Label htmlFor="internalNotes" className="text-sm font-semibold text-gray-700 mb-2">
              Internal notes
              <span className="text-xs text-gray-400 ml-2">(visible only to your team)</span>
            </Label>
            <textarea
              id="internalNotes"
              value={formData.comment || ""}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent resize-none"
              placeholder="Add internal notes about this customer..."
            />
          </div>

          <div>
            <Label htmlFor="notes" className="text-sm font-semibold text-gray-700 mb-2">
              Customer notes
              <span className="text-xs text-gray-400 ml-2">(may be visible to customer)</span>
            </Label>
            <textarea
              id="notes"
              value={formData.companyName || ""}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent resize-none"
              placeholder="Add customer-facing notes..."
            />
          </div>
        </div>
      </div>

    </div>
  );
};