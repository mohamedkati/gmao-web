import { Site } from "./site.types";

export enum DocumentType {
    Plan = 1,
    Certificate = 2,
    Contract = 3,
    Invoice = 4,
    Report = 5,
    Photo = 6,
    Other = 99,
}

export interface SiteDocument {
    id: string;
    siteId: string;
    site?: Site;
    type: DocumentType;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType?: string;
    description?: string;
    expirationDate?: Date;
    sendExpirationAlert: boolean;
    isPlan: boolean;

    // Audit
    createdAt: Date;
    updatedAt: Date;
}