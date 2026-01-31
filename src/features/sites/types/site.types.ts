// src/features/sites/types/site.types.ts

import { Customer, SharedCustomer } from "@/shared/types/business/shared-customer.types";
import { Unit } from "./unit.types";
import { Asset } from "./asset.types";
import { SiteDocument } from "./site-document.types";
import { PaymentMethod } from "@/shared/types/business/payment-methods";

// ============================================
// ENUMS
// ============================================

export enum SiteType {
    ResidentialBuilding = 1,
    CommercialBuilding = 2,
    MixedUse = 3,
    IndustrialFacility = 4,
    Office = 5,
    Warehouse = 6,
    RetailStore = 7,
    Hotel = 8,
    Hospital = 9,
    School = 10,
    GovernmentBuilding = 11,
}


export enum SiteViewMode {
    Cards = "cards",
    Table = "table",
    Map = "map",
}


export enum PreferredContactMethod {
    Email = 1,
    Phone = 2,
    SMS = 3,
    WhatsApp = 4,
}


// ============================================
// VALUE OBJECTS
// ============================================

export interface Address {
    firstAddressLine?: string;
    secondAddressLine?: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface GeoCoordinates {
    latitude: number;
    longitude: number;
}

export interface SiteAccess {
    accessCode1?: string;
    accessCode2?: string;
    accessComment?: string;
    workingHours?: string;
    keyBoxSite?: string;
}



// ============================================
// ENTITIES
// ============================================
export interface SiteListItem {

    id: string;
    reference: string;
    name: string;
    type: SiteType;
    customerName: string;
    city: string;
    unitsCount: number;
    address: Address;
    buildingYear?: number;
    customer?: SharedCustomer;
    commercial?: Staff;
    coordinates?: GeoCoordinates;
    surfaceArea?: number;
    commercialName?: string;
    createdAt: Date;
}
export interface Site {
    id: string;
    reference: string;
    name: string;
    type: SiteType;

    // Client
    customerId: string;
    customer?: SharedCustomer;
    clientContactId?: string;
    clientContact?: CustomerContact;

    // Addresses
    address: Address;
    billingAddress: Address;
    coordinates?: GeoCoordinates;

    // Building Info
    buildingYear?: number;
    surfaceArea?: number;
    floorsCount?: number;
    unitsCount?: number;

    // Legal
    siren?: string;
    siret?: string;

    // Communication
    mainMailAddress: string;
    invoiceMailAddress: string;
    comment?: string;
    commentReport?: string;

    // Team Assignment
    commercialId?: string;
    commercial?: Staff;
    operationsManagerId?: string;
    operationsManager?: Staff;
    sectorManagerId?: string;
    sectorManager?: Staff;
    technician1Id?: string;
    technician1?: Staff;
    technician2Id?: string;
    technician2?: Staff;

    // Metadata
    sectorTypeId: string;
    sectorType?: SectorType;
    clientTypeId: string;
    clientType?: SiteClientType;
    vatId: string;
    vat?: VAT;
    paymentMethodId?: string;
    paymentMethod?: PaymentMethod;

    // Access
    siteAccessInfo: SiteAccess;

    // Relations
    units: Unit[];
    assets: Asset[];
    documents: SiteDocument[];
    siteKeepers: SiteKeeper[];
    siteContacts: SiteContact[];
    // Audit
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}

export interface SiteContact {
    id: string;
    siteId: string;
    site?: Site;

    // Identity
    firstname: string;
    lastname: string;

    // Contact
    email: string;
    phone?: string;
    cellPhone?: string;
    fax?: string;

    // Additional Info
    note?: string;
    availabilityHours?: string;
    isPrimary: boolean;

    // Category
    siteContactCategoryId: string;
    siteContactCategory?: SiteContactCategory;
}

export interface SiteContactCategory {
    id: string;
    name: string; // "Technique" | "Administratif" | "Urgence" | "Gardien"
    priority?: number;
    contacts: SiteContact[];
}

export interface SiteKeeper {
    id: string;
    siteId: string;
    site?: Site;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    cellPhone?: string;
}

// ============================================
// REFERENCE DATA
// ============================================

export interface SectorType {
    id: string;
    code: string;
    description: string;
    sites: Site[];

}

export interface SiteClientType {
    id: string;
    code: string;
    siteCategoryId: string;
    siteCategory?: SiteCategory;
    sites: Site[];

}

export interface SiteCategory {
    id: string;
    code: string;
    description: string;
    siteClientTypes: SiteClientType[];
}

export interface VAT {
    id: string;
    name: string;
    code: string;
    valueRate: number;
    sites: Site[];
}


export interface Staff {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    position?: string;
}

export interface CustomerContact {
    id: string;
    customerId: string;
    customer?: Customer;
    firstName: string;
    lastName: string;
    fullName?: string;
    email: string;
    phone?: string;
    mobile?: string;
    position?: string;
    isPrimary: boolean;
    preferredContactMethod: PreferredContactMethod;
}

// ============================================
// UTILITY TYPES
// ============================================

export interface SiteListItem {
    id: string;
    reference: string;
    name: string;
    type: SiteType;
    customerName: string;
    city: string;
    unitsCount: number;
    surfaceArea?: number;
    commercialName?: string;
    createdAt: Date;
}

export interface SiteStats {
    totalUnits: number;
    occupiedUnits: number;
    vacantUnits: number;
    totalAssets: number;
    commonAssets: number;
    privateAssets: number;
    totalDocuments: number;
    totalOccupants: number;
}


export interface SiteTeamDto {
    commercial: SiteStaffDto;
    operationsManager: SiteStaffDto;
    sectorManager: SiteStaffDto;
    technician1: SiteStaffDto;
    technician2: SiteStaffDto;
}

export interface SiteStaffDto {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    responsibilities: string;
    employeeNumber: string;
}