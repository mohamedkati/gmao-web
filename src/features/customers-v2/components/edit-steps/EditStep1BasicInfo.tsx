// features/customers/components/edit-steps/EditStep1BasicInfo.tsx
import React from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {CustomerFormData as  CustomerUpdateDto } from "../../types/customer.types";

interface EditStep1BasicInfoProps {
  formData: Partial<CustomerUpdateDto>;
  setFormData: (data: Partial<CustomerUpdateDto>) => void;
}

export const EditStep1BasicInfo: React.FC<EditStep1BasicInfoProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-8 max-w-[1200px]">
      {/* Info Banner */}
      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
        <p className="text-sm font-medium text-gray-900 mb-1">📝 Basic Information</p>
        <p className="text-xs text-gray-600">
          Update the company and primary contact information for this customer.
        </p>
      </div>

      {/* Company Information Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Company Information</h3>
        <div className="w-48 h-1 bg-[#635bff] rounded-full mb-6"></div>

        <div className="space-y-5">
          {/* Company Name & Type */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700 mb-2">
                Company name *
              </Label>
              <Input
                id="companyName"
                value={formData.companyName || ""}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="h-12"
                placeholder="Acme Corporation"
              />
            </div>
            <div>
              <Label htmlFor="customerType" className="text-sm font-semibold text-gray-700 mb-2">
                Customer type *
              </Label>
              <select
                id="customerType"
                value={ "Professional"}
                onChange={(e) => setFormData({ ...formData})}
                className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Individual">Individual</option>
              </select>
            </div>
          </div>

          {/* SIRET & VAT */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="siret" className="text-sm font-semibold text-gray-700 mb-2">
                SIRET number
              </Label>
              <Input
                id="siret"
                value={ ""}
                onChange={(e) => setFormData({ ...formData})}
                className="h-12"
                placeholder="123 456 789 00012"
              />
            </div>
            <div>
              <Label htmlFor="tvaNumber" className="text-sm font-semibold text-gray-700 mb-2">
                VAT number
              </Label>
              <Input
                id="tvaNumber"
                value={ ""}
                onChange={(e) => setFormData({ ...formData })}
                className="h-12"
                placeholder="FR12345678901"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Contact Person Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Primary Contact Person</h3>
        <div className="w-52 h-1 bg-[#635bff] rounded-full mb-6"></div>

        <div className="space-y-5">
          {/* First & Last Name */}
          <div className="grid grid-cols-3 gap-5">
            <div>
              <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 mb-2">
                First name
              </Label>
              <Input
                id="firstName"
                value={""}
                onChange={(e) => setFormData({ ...formData})}
                className="h-12"
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 mb-2">
                Last name
              </Label>
              <Input
                id="lastName"
                value={ ""}
                onChange={(e) => setFormData({ ...formData })}
                className="h-12"
                placeholder="Doe"
              />
            </div>
            <div>
              <Label htmlFor="jobTitle" className="text-sm font-semibold text-gray-700 mb-2">
                Job title
              </Label>
              <Input
                id="jobTitle"
                value={ ""}
                onChange={(e) => setFormData({ ...formData })}
                className="h-12"
                placeholder="CEO"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2">
                Email address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={""}
                  onChange={(e) => setFormData({ ...formData})}
                  className="h-12 pr-24"
                  placeholder="john.doe@acme.com"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-green-50 text-green-600 text-xs font-bold rounded">
                  ✓ Verified
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700 mb-2">
                Phone number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={ ""}
                onChange={(e) => setFormData({ ...formData })}
                className="h-12"
                placeholder="+33 1 23 45 67 89"
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="mobilePhone" className="text-sm font-semibold text-gray-700 mb-2">
                Mobile phone
              </Label>
              <Input
                id="mobilePhone"
                type="tel"
                value={ ""}
                onChange={(e) => setFormData({ ...formData })}
                className="h-12"
                placeholder="+33 6 12 34 56 78"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Communication Preferences Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Communication Preferences</h3>
        <div className="w-60 h-1 bg-[#635bff] rounded-full mb-6"></div>

        <div className="space-y-5">
          {/* Preferred Contact Method & Language */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="preferredContactMethod" className="text-sm font-semibold text-gray-700 mb-2">
                Preferred contact method
              </Label>
              <select
                id="preferredContactMethod"
                value={""}
                onChange={(e) => setFormData({ ...formData })}
                className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                <option value="">Select method</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
            <div>
              <Label htmlFor="language" className="text-sm font-semibold text-gray-700 mb-2">
                Preferred language
              </Label>
              <select
                id="language"
                value={"French"}
                onChange={(e) => setFormData({ ...formData })}
                className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                <option value="French">🇫🇷 French</option>
                <option value="English">🇬🇧 English</option>
                <option value="Spanish">🇪🇸 Spanish</option>
                <option value="German">🇩🇪 German</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" className="text-sm font-semibold text-gray-700 mb-2">
              Tags
            </Label>
            <div className="flex items-center gap-2 flex-wrap p-3 bg-gray-50 rounded-lg border-2 border-gray-300 min-h-[48px]">
              {/* {formData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-[#e0d9ff] text-[#635bff] text-sm font-semibold rounded-full"
                >
                  {tag}
                  <button
                    onClick={() => {
                      const newTags = formData.tags?.filter((_, i) => i !== index);
                      setFormData({ ...formData, tags: newTags });
                    }}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))} */}
              {/* <input
                type="text"
                placeholder="Add tag..."
                className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    const newTag = e.currentTarget.value.trim();
                    setFormData({
                      ...formData,
                      tags: [...(formData.tags || []), newTag],
                    });
                    e.currentTarget.value = "";
                  }
                }}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};