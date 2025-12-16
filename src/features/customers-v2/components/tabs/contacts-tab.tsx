// features/customers/components/tabs/ContactsTab.tsx
import React from "react";
import { Mail, Edit, MoreVertical, Plus } from "lucide-react";
import { StripeAvatar } from "@/shared/components/stripe/stripe-avatar";
import { Button } from "@/shared/components/ui/button";
import { useContactStore } from "../../stores/useContactStore";
import { useCustomerContacts } from "../../hooks/user-customers.query";

interface ContactsTabProps {
  customerId: string;
}

export const ContactsTab: React.FC<ContactsTabProps> = ({ customerId }) => {
  const { data: contacts, isLoading } = useCustomerContacts(customerId);
  const { openCreateDrawer } = useContactStore();

  if (isLoading) return <div>Loading contacts...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Customer Contacts</h2>
            <p className="text-sm text-gray-500">Manage all contacts associated with this customer</p>
          </div>
          <Button
            onClick={() => openCreateDrawer(customerId)}
            className="bg-gradient-to-r from-[#635bff] to-[#7a73ff]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add contact
          </Button>
        </div>
      </div>

      {/* Contacts List */}
      <div className="p-6 space-y-4">
        {contacts?.map((contact) => (
          <div key={contact.id} className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <StripeAvatar
                  name={`${contact.firstName} ${contact.lastName}`}
                  size="lg"
                  className={contact.isPrimary ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"}
                />

                {/* Info */}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    {contact.isPrimary && (
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">
                        PRIMARY
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{contact.jobTitle || "N/A"}</p>

                  {/* Contact Details */}
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <span>📧 {contact.email}</span>
                    {contact.mobilePhone && <span>📱 {contact.mobilePhone}</span>}
                    {contact.officePhone && <span>☎️ {contact.officePhone}</span>}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Add More Placeholder */}
        <button
          onClick={() => openCreateDrawer(customerId)}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-gray-400 hover:border-[#635bff] hover:text-[#635bff] transition-colors"
        >
          + Add another contact
        </button>
      </div>
    </div>
  );
};