export enum PropertyGroupType {
  PropertyManagementCompany = 1,
  SyndicGroup = 2,
  RealEstateInvestor = 3,
  PublicHousing = 4,
  Corporate = 5,
  FamilyOffice = 6,
}

export enum PropertyGroupStatus {
  Active = 1,
  Prospect = 2,
  Inactive = 3,
  Suspended = 4,
  Terminated = 5,
}

export enum LegalForm {
  SAS = 1,
  SARL = 2,
  SA = 3,
  SCI = 4,
  EURL = 5,
  EI = 6,
  Association = 7,
  PublicEntity = 8,
}

export enum PreferredContactMethod {
  Email = 1,
  Phone = 2,
  Mobile = 3,
  Fax = 4,
}

export enum PersonType {
  Individual = 1,
  Company = 2,
}

export enum ContactRole {
  GeneralManager = 1,
  OperationsManager = 2,
  CommercialManager = 3,
  AccountingManager = 4,
  TechnicalManager = 5,
  CustomerServiceManager = 6,
  LegalManager = 7,
  Assistant = 8,
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
  laborCoefficient: number;
  materialCoefficient: number;
  equipmentCoefficient: number;
  subcontractorCoefficient: number;
  volumeDiscountPercent: number;
  minimumAnnualRevenue: number;
  emergencyCalloutFee?: number | null;
  monthlyMaintenanceFee?: number | null;
}

export interface PropertyGroupContact {
  id: string;
  propertyGroupId: string;
  role: ContactRole;
  personType: PersonType;
  firstName: string;
  lastName: string;
  fullName?: string;
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
}

export interface PropertyGroup {
  id: string;
  reference: string;
  name: string;
  description?: string;
  type: PropertyGroupType;
  status: PropertyGroupStatus;
  legalName?: string;
  siren?: string;
  companyRegistrationNumber?: string;
  vatNumber?: string;
  legalForm?: LegalForm;
  headquartersAddress?: Address;
  mainContactName?: string;
  mainContactPosition?: string;
  mainContactEmail?: string;
  mainContactPhone?: string;
  mainContactMobile?: string;
  accountingContactName?: string;
  accountingContactEmail?: string;
  accountingContactPhone?: string;
  consolidatedBilling: boolean;
  paymentTermsDays: number;
  volumeDiscountPercent?: number;
  preferredPaymentMethod?: string;
  groupPricingCoefficients?: GroupPricingCoefficients;
  totalCustomers: number;
  totalSites: number;
  totalUnits: number;
  totalAnnualRevenue: number;
  lastStatisticsUpdateDate?: string;
  frameworkContractStartDate?: string;
  frameworkContractEndDate?: string;
  frameworkContractReference?: string;
  autoRenewalFrameworkContract: boolean;
  internalNotes?: string;
  commercialNotes?: string;
  customers?: unknown[];
  contacts: PropertyGroupContact[];
}