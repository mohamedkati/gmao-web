// features/customers/components/CustomerEditContent.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useCustomer } from "../hooks/user-customers.query";
import {  CustomerFormData as CustomerUpdateDto } from "../types/customer.types";
import { EditStep1BasicInfo } from "./edit-steps/EditStep1BasicInfo";
import { EditStep2Addresses } from "./edit-steps/EditStep2Addresses";
import { EditStep3Billing } from "./edit-steps/EditStep3Billing";
import { EditStep4Additional } from "./edit-steps/EditStep4Additional";

interface CustomerEditContentProps {
  customerId: string;
}

export const CustomerEditContent: React.FC<CustomerEditContentProps> = ({ customerId }) => {
  const router = useRouter();
  const { data: customer, isLoading } = useCustomer(customerId);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CustomerUpdateDto>>({});

  React.useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  if (isLoading) return <div>Loading...</div>;
  if (!customer) return <div>Customer not found</div>;

  const steps = [
    { id: 1, label: "Basic Information" },
    { id: 2, label: "Addresses" },
    { id: 3, label: "Billing & Payment" },
    { id: 4, label: "Additional Details" },
  ];

  const handleSave = async () => {
    // await updateMutation.mutateAsync({
    //   id: customerId,
    //   data: formData as CustomerUpdateDto,
    // });
    // router.push(`/customers/${customerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/customers")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Customer</h1>
                <p className="text-sm text-gray-500">{customer.companyName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => router.push(`/customers/${customerId}`)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={false}
                className="bg-gradient-to-r from-[#635bff] to-[#7a73ff]"
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-3 ${
                    currentStep === step.id ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep === step.id
                        ? "bg-[#635bff] text-white"
                        : currentStep > step.id
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {currentStep > step.id ? "✓" : step.id}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {currentStep === 1 && (
            <EditStep1BasicInfo formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 2 && (
            <EditStep2Addresses formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 3 && (
            <EditStep3Billing formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 4 && (
            <EditStep4Additional formData={formData} setFormData={setFormData} />
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-[1200px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              ⏱️ Last saved: <span className="font-semibold">2 minutes ago</span>
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline">Save as draft</Button>
              {currentStep > 1 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  variant="outline"
                >
                  ← Previous
                </Button>
              )}
              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-gradient-to-r from-[#635bff] to-[#7a73ff]"
                >
                  Next →
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={false}
                  className="bg-gradient-to-r from-green-600 to-green-500"
                >
                  ✓ Save changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};