import { Site } from "./site.types";
import { Unit } from "./unit.types";

export enum AssetStatus {
    Active = 1,
    Inactive = 2,
    UnderMaintenance = 3,
    Decommissioned = 4,
    Faulty = 5,
}

export enum CriticalityLevel {
    Low = 1,
    Medium = 2,
    High = 3,
    Critical = 4,
}

export enum AssetHealthStatus {
    Excellent = 1,
    Good = 2,
    Fair = 3,
    Poor = 4,
    Critical = 5,
}

export enum WarrantyType {
    Manufacturer = 1,
    Extended = 2,
    ServiceContract = 3,
}

export interface AssetLocation {
    planDocumentId?: string;
    xPosition?: number;
    yPosition?: number;
    locationDescription?: string;
}


export interface AssetReliabilityMetrics {
    totalFailures: number;
    totalMaintenanceHours: number;
    mtbf: number; // Mean Time Between Failures (hours)
    mttr: number; // Mean Time To Repair (hours)
    availabilityPercent: number;
    failuresPerYear: number;
    lastFailureDate?: Date;
    lastMaintenanceDate?: Date;
    isHighRisk: boolean;
    recommendReplacement: boolean;
}


export interface Asset {
    id: string;
    reference: string;
    name: string;

    // Category
    categoryId: string;
    category?: AssetCategory;

    // Location
    siteId: string;
    site?: Site;
    unitId?: string;
    unit?: Unit;
    isCommonAsset: boolean;
    location?: AssetLocation;

    // Technical Details
    manufacturer?: string;
    model?: string;
    serialNumber?: string;
    installationDate: Date;

    // Status
    status: AssetStatus;
    criticalityLevel: CriticalityLevel;
    healthStatus: AssetHealthStatus;

    // Reliability
    reliabilityMetrics?: AssetReliabilityMetrics;

    // Hierarchy
    parentAssetId?: string;
    parentAsset?: Asset;
    childAssets: Asset[];

    // Relations
    maintenancePlans: MaintenancePlan[];
    warranties: Warranty[];

    // Audit
    createdAt: Date;
    updatedAt: Date;
}



export enum MaintenanceFrequency {
    Daily = 1,
    Weekly = 2,
    Monthly = 3,
    Quarterly = 4,
    SemiAnnual = 5,
    Annual = 6,
    Biennial = 7,
    Custom = 99,
}


export interface MaintenancePlan {
    id: string;
    name: string;
    assetId: string;
    asset?: Asset;
    frequency: MaintenanceFrequency;
    lastExecutionDate?: Date;
    nextExecutionDate?: Date;
    isActive: boolean;
    alertDaysBefore: number;
    tasks: MaintenanceTask[];

    // Audit
    createdAt: Date;
    updatedAt: Date;
}

export interface MaintenanceTask {
    id: string;
    maintenancePlanId: string;
    maintenancePlan?: MaintenancePlan;
    taskOrder: number;
    description: string;
    estimatedDurationMinutes?: number;
    requiredSkillId?: string;
    requiredSkill?: Skill;
}

export interface Warranty {
    id: string;
    assetId: string;
    asset?: Asset;
    type: WarrantyType;
    providerName: string;
    warrantyNumber?: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    coveredItems?: string;
    exclusions?: string;
    contactPhone?: string;
    contactEmail?: string;
    claimsCount: number;
    claimedAmount: number;
    sendExpirationAlert: boolean;
    alertDaysBefore: number;
}

export interface Skill {
    id: string;
    name: string;
    description?: string;
    category?: string;
}

export interface AssetCategory {
    id: string;
    name: string;
    description?: string;
    code?: string;

    // Hierarchy
    parentCategoryId?: string;
    parentCategory?: AssetCategory;
    subCategories: AssetCategory[];
}