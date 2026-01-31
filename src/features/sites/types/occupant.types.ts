import { PreferredContactMethod } from "./site.types";
import { Unit } from "./unit.types";

export interface Occupant {
    id: string;
    unitId: string;
    unit?: Unit;
    type: OccupantType;
    personType: PersonType;

    // Identity
    firstName: string;
    lastName: string;
    companyName?: string;

    // Contact
    email?: string;
    phone?: string;
    mobile?: string;
    preferredContactMethod?: PreferredContactMethod;

    // Occupation Period
    moveInDate?: Date;
    moveOutDate?: Date;
    isActive: boolean; // Calculé: pas de moveOutDate

    // Portal Access
    hasPortalAccess: boolean;

    // Audit
    createdAt: Date;
    updatedAt: Date;
}

export enum OccupantType {
    Owner = 1,
    Tenant = 2,
    Temporary = 3,
}

export enum PersonType {
    Individual = 1,
    Company = 2,
}