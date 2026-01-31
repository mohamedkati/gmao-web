import { PaymentMethod } from "./payment-methods";

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

export interface SharedCustomerContact {
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

 interface CustomerListItem {
  id: string;
  reference: string;
  companyName: string;
  type: CustomerType;
  propertyGroupId?: string;
  propertyGroupName?: string;
  commercialId?: string;
  paymentMethodId?: string;
}



export interface Customer extends CustomerListItem {
  pricingCoefficients?: PricingCoefficients;
  invoiceAddress?: Address;
  mailingAddress?: Address;
  paymentMethod?: PaymentMethod;
    active:boolean;

}


export interface SharedCustomer{
  id: string;
  reference: string;
  companyName: string;
  propertyGroupId?: string;
  propertyGroupName?: string;
  commercialId?: string;
  paymentMethodId?: string;
}