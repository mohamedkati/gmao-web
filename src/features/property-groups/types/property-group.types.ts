export enum PropertyGroupType {
  PropertyManagementCompany = 1,
  SyndicGroup = 2,
  RealEstateInvestor = 3,
  PublicHousing = 4,
  Corporate = 5,
  FamilyOffice = 6
}

export enum PropertyGroupStatus {
  Active = 1,
  Prospect = 2,
  Inactive = 3,
  Suspended = 4,
  Terminated = 5
}

export enum LegalForm {
  SAS = 1,
  SARL = 2,
  SA = 3,
  SCI = 4,
  EURL = 5,
  EI = 6,
  Association = 7,
  PublicEntity = 8
}

export enum ContactRole {
  GeneralManager = 1,
  OperationsManager = 2,
  CommercialManager = 3,
  AccountingManager = 4,
  TechnicalManager = 5,
  CustomerServiceManager = 6,
  LegalManager = 7,
  Assistant = 8
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

export interface GroupPricingCoefficients {
  laborCoefficient?: number;
  materialCoefficient?: number;
  equipmentCoefficient?: number;
  subcontractorCoefficient?: number;
  volumeDiscountPercent?: number;
  minimumAnnualRevenue?: number;
  emergencyCalloutFee?: number;
  monthlyMaintenanceFee?: number;
}

export interface PropertyGroupContact {
  id?: string;
  propertyGroupId?: string;
  role: ContactRole;
  personType: PersonType;
  firstName: string;
  lastName: string;
  position?: string;
  department?: string;
  email: string;
  phone?: string;
  mobile?: string;
  fax?: string;
  isPrimary: boolean;
  receivesInvoices: boolean;
  receivesReports: boolean;
  receivesAlerts: boolean;
  preferredContactMethod: PreferredContactMethod;
  notes?: string;
  created?: string;
  createdBy?: string;
  lastModified?: string;
  lastModifiedBy?: string;
}

export interface PropertyGroup {
  id: string;
  reference: string;
  name: string;
  description?: string;
  type: PropertyGroupType;
  status: PropertyGroupStatus;
  
  // Legal info
  legalName?: string;
  siren?: string;
  companyRegistrationNumber?: string;
  vatNumber?: string;
  legalForm?: LegalForm;
  
  // Address
  headquartersAddress?: Address;
  
  // Main contact
  mainContactName?: string;
  mainContactPosition?: string;
  mainContactEmail?: string;
  mainContactPhone?: string;
  mainContactMobile?: string;
  
  // Accounting contact
  accountingContactName?: string;
  accountingContactEmail?: string;
  accountingContactPhone?: string;
  
  // Billing
  consolidatedBilling: boolean;
  paymentTermsDays: number;
  volumeDiscountPercent?: number;
  preferredPaymentMethod?: string;
  
  // Pricing
  groupPricingCoefficients?: GroupPricingCoefficients;
  
  // Statistics
  totalCustomers: number;
  totalSites: number;
  totalUnits: number;
  totalAnnualRevenue: number;
  lastStatisticsUpdateDate?: string;
  
  // Contract
  frameworkContractStartDate?: string;
  frameworkContractEndDate?: string;
  frameworkContractReference?: string;
  autoRenewalFrameworkContract: boolean;
  
  // Notes
  internalNotes?: string;
  commercialNotes?: string;
  
  // Relations
  contacts: PropertyGroupContact[];
  
  // Audit
  created: string;
  createdBy?: string;
  lastModified: string;
  lastModifiedBy?: string;
}

export interface PropertyGroupFormData {
  // Step 1: Basic Info
  reference: string;
  name: string;
  description?: string;
  type: PropertyGroupType;
  status: PropertyGroupStatus;
  
  // Step 2: Legal Info
  legalName?: string;
  siren?: string;
  companyRegistrationNumber?: string;
  vatNumber?: string;
  legalForm?: LegalForm;
  
  // Step 3: Address
  headquartersAddress?: Address;
  
  // Step 4: Contacts
  mainContactName?: string;
  mainContactPosition?: string;
  mainContactEmail?: string;
  mainContactPhone?: string;
  mainContactMobile?: string;
  accountingContactName?: string;
  accountingContactEmail?: string;
  accountingContactPhone?: string;
  
  // Step 5: Billing & Pricing
  consolidatedBilling: boolean;
  paymentTermsDays?: number;
  volumeDiscountPercent?: number;
  preferredPaymentMethod?: string;
  groupPricingCoefficients?: GroupPricingCoefficients;
  
  // Step 6: Contract
  frameworkContractStartDate?: string;
  frameworkContractEndDate?: string;
  frameworkContractReference?: string;
  autoRenewalFrameworkContract: boolean;
  
  // Step 7: Notes
  internalNotes?: string;
  commercialNotes?: string;
}

export interface PropertyGroupFilters {
  search?: string;
  type?: PropertyGroupType[];
  status?: PropertyGroupStatus[];
  legalForm?: LegalForm[];
}

export interface PropertyGroupStats {
  totalGroups: number;
  activeGroups: number;
  prospectGroups: number;
  totalCustomers: number;
  totalSites: number;
  totalRevenue: number;
}