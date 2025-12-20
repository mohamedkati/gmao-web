export enum CustomerType {
  PropertyManager = 1,
  Syndic = 2,
  Corporate = 3,
  Individual = 4,
  Government = 5
}

export enum BillingMode {
  Centralized = 1,
  PerSite = 2,
  DistributedByTantièmes = 3
}

export enum InvoiceFrequency {
  PerWorkOrder = 1,
  Weekly = 2,
  Monthly = 3,
  Quarterly = 4
}

export enum PersonType {
  Individual = 1,
  Company = 2
}

export enum PreferredContactMethod {
  Email = 1,
  Phone = 2,
  SMS = 3,
  WhatsApp = 4
}

export interface Address {
  firstAddressLine?: string;
  secondAddressLine?: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PricingCoefficients {
  laborCoefficient?: number;
  materialCoefficient?: number;
  equipmentCoefficient?: number;
  subcontractorCoefficient?: number;
}

export interface BillingSettings {
  mode: BillingMode;
  paymentTermsDays: number;
  autoGenerateInvoices: boolean;
  invoiceFrequency: InvoiceFrequency;
  sendEmailNotifications: boolean;
  applyLatePaymentFees: boolean;
  latePaymentFeePercent?: number;
}

export interface MaintenanceBudget {
  id?: string;
  customerId?: string;
  year: number;
  budgetedAmount: number;
  committedAmount: number;
  invoicedAmount: number;
  remainingBudget?: number;
  consumptionPercent?: number;
  alertThreshold: number;
  alertSent: boolean;
  created?: string;
  createdBy?: string;
  lastModified?: string;
  lastModifiedBy?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  terms: string;
  dueDays: number;
  days: number;
}

export interface CustomerContact {
  id?: string;
  customerId?: string;
  type: PersonType;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone?: string;
  mobile?: string;
  position?: string;
  isPrimary: boolean;
  preferredContactMethod: PreferredContactMethod;
  created?: string;
  createdBy?: string;
  lastModified?: string;
  lastModifiedBy?: string;
}

export interface CustomerListItem {
  id: string;
  reference: string;
  companyName: string;
  type: CustomerType;
  propertyGroupId?: string;
  propertyGroupName?: string;
  siren?: string;
  commercialId: string;
  commercialName?: string;
  paymentMethodId?: string;
  sitesCount: number;
  contactsCount: number;
  totalBudget: number;

  primaryContactEmail?: string;
  primaryContactPhone?: string;
  primaryContactName?: string;
  invoiceCity?: string;
}



export interface Customer extends CustomerListItem {
  pricingCoefficients: PricingCoefficients;
  billingSettings: BillingSettings;
  maintenanceBudgets: MaintenanceBudget[];
  invoiceAddress: Address;
  mailingAddress: Address;
  paymentMethod?: PaymentMethod;
  contacts: CustomerContact[];
  siren?: string;
  comment?: string;
  active?: boolean;
  // Audit
  createdAt: string;
  createdBy?: string;
  lastModifiedAt: string;
  lastModifiedBy?: string;

}
export interface CustomerFormData {
  // Basic Info
  reference: string;
  companyName: string;
  type: CustomerType;
  propertyGroupId?: string;
  siren?: string;
  comment?: string;
  active?: boolean;
  // Addresses
  invoiceAddress: Address;
  mailingAddress: Address;
  sameAsInvoiceAddress?: boolean; // Helper for form

  // Pricing
  pricingCoefficients: PricingCoefficients;

  // Billing
  billingSettings: BillingSettings;
  paymentMethodId?: string;

  // Commercial
  commercialId: string;
}

export interface CustomerFilters {
  search?: string;
  type?: CustomerType[];
  propertyGroupId?: string;
  commercialId?: string;
}

export interface CustomerStats {
  totalCustomers: number;
  propertyManagers: number;
  syndics: number;
  corporates: number;
  individuals: number;
  governments: number;
  totalBudget: number;
  averageBudget: number;
}

export interface CustomerQueryParams {
  // Pagination
  page?: number;
  pageSize?: number;

  // Filtres
  search?: string;
  types?: number[]; // CustomerType enum values
  active?: boolean;
  propertyGroupId?: string;
  commercialId?: string;
  city?: string;

  // Tri
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}