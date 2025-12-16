// features/customers/components/contacts/ContactCreateDrawer.tsx
"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useContactStore } from "../stores/useContactStore";
import { CustomerContact as CustomerContactCreateDto } from "../types/customer.types";
import { useAddCustomerContact } from "../hooks/user-customers.query";

export const ContactCreateDrawer: React.FC = () => {
  const { isCreateDrawerOpen, closeCreateDrawer, customerId } = useContactStore();
  const createMutation = useAddCustomerContact();
  const [formData, setFormData] = useState<Partial<CustomerContactCreateDto>>({
    isPrimary: false,
  });

  if (!isCreateDrawerOpen || !customerId) return null;

  const handleSubmit = async () => {
    // await createMutation.mutateAsync({
    //   ...formData,
    //   customerId,
    // } as CustomerContactCreateDto);
    // closeCreateDrawer();
    // setFormData({ isPrimary: false });
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
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Add new contact</h2>
              <p className="text-sm text-gray-500">Create a contact for this customer</p>
            </div>
            <button
              onClick={closeCreateDrawer}
              className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-6">
            {/* Primary Contact Toggle */}
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPrimary || false}
                  onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                  className="w-5 h-5 text-[#635bff] border-gray-300 rounded focus:ring-[#635bff]"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Set as primary contact</p>
                  <p className="text-xs text-gray-600">This will be the main contact for this customer</p>
                </div>
              </label>
            </div>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 mb-2">
                  First name *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName || ""}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Jean"
                  className="h-12"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 mb-2">
                  Last name *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName || ""}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Dupont"
                  className="h-12"
                />
              </div>
            </div>

            {/* Job Title */}
            <div>
              <Label htmlFor="jobTitle" className="text-sm font-semibold text-gray-700 mb-2">
                Job title
              </Label>
              <Input
                id="jobTitle"
                value={formData.type || ""}
                onChange={(e) => setFormData({ ...formData
                })}
                placeholder="CEO"
                className="h-12"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2">
                Email address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jean.dupont@acme.fr"
                className="h-12 border-2 border-[#635bff]"
              />
            </div>

            {/* Mobile Phone */}
            <div>
              <Label htmlFor="mobilePhone" className="text-sm font-semibold text-gray-700 mb-2">
                Mobile phone
              </Label>
              <Input
                id="mobilePhone"
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+33 6 12 34 56 78"
                className="h-12"
              />
            </div>

            {/* Office Phone */}
            <div>
              <Label htmlFor="officePhone" className="text-sm font-semibold text-gray-700 mb-2">
                Office phone
              </Label>
              <Input
                id="officePhone"
                type="tel"
                value={formData.mobile || ""}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="+33 1 23 45 67 89"
                className="h-12"
              />
            </div>

            {/* Preferred Contact Method */}
            <div>
              <Label htmlFor="preferredContactMethod" className="text-sm font-semibold text-gray-700 mb-2">
                Preferred contact method
              </Label>
              <select
                id="preferredContactMethod"
                value={formData.preferredContactMethod || ""}
                onChange={(e) => setFormData({ ...formData
                 })}
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                <option value="">Select method</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <Label htmlFor="department" className="text-sm font-semibold text-gray-700 mb-2">
                Department
              </Label>
              <Input
                id="department"
                value={formData.position || ""}
                onChange={(e) => setFormData({ ...formData,
                     })}
                placeholder="Operations"
                className="h-12"
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-sm font-semibold text-gray-700 mb-2">
                Notes
                <span className="text-xs text-gray-400 ml-2">(optional)</span>
              </Label>
              <textarea
                id="notes"
                value={ ""}
                onChange={(e) => setFormData({ ...formData
                })}
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent resize-none"
                placeholder="Add any additional information about this contact..."
              />
            </div>
          </div>
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
          <Button
            onClick={handleSubmit}
            disabled={createMutation.isPending}
            className="px-6 bg-gradient-to-r from-[#635bff] to-[#7a73ff]"
          >
            Add contact
          </Button>
        </div>
      </div>
    </>
  );
};