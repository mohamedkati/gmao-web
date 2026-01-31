import { Asset } from "./asset.types";
import { Occupant } from "./occupant.types";
import {  Site } from "./site.types";

export enum UnitType {
    Apartment = 1,
    House = 2,
    Office = 3,
    Store = 4,
    Parking = 5,
    Storage = 6,
    CommonArea = 7,
}

export enum UnitStatus {
    Occupied = 1,
    Vacant = 2,
    UnderRenovation = 3,
    Reserved = 4,
}

export interface Unit {
    id: string;
    reference: string;
    siteId: string;
    site?: Site;
    type: UnitType;
    status: UnitStatus;
    floor?: string;
    doorNumber?: string;
    surfaceArea?: number;
    rooms?: number;
    ownershipSharesCount: number;

    // Relations
    activeOccupant?: Occupant; // L'occupant actuellement actif
    occupants: Occupant[]; // Tous les occupants (actifs + historique)
    assets: Asset[];

    // Audit
    createdAt: Date;
    updatedAt: Date;
}

export interface UnitListItem {
    id: string;
    reference: string;
    type: UnitType;
    status: UnitStatus;
    siteId: string;
    floor?: string;
    doorNumber?: string;
    surfaceArea?: number;
    occupantName?: string;
}