// Query Keys Factory pour une meilleure organisation
export const siteQueryKeys = {
  // Sites
  sites: {
    all: ["sites"] as const,
    lists: () => [...siteQueryKeys.sites.all, "list"] as const,
    list: (filters: any) => [...siteQueryKeys.sites.lists(), filters] as const,
    details: () => [...siteQueryKeys.sites.all, "detail"] as const,
    detail: (id: string) => [...siteQueryKeys.sites.details(), id] as const,
    teamMembers: (id: string) => [...siteQueryKeys.sites.detail(id), "teamMembers"] as const,
  },
  
  // Units
  units: {
    all: ["units"] as const,
    lists: () => [...siteQueryKeys.units.all, "list"] as const,
    list: (siteId: string, filters?: any) =>
      [...siteQueryKeys.units.lists(), siteId, filters] as const,
    details: () => [...siteQueryKeys.units.all, "detail"] as const,
    detail: (id: string) => [...siteQueryKeys.units.details(), id] as const,
  },
  
  // Assets
  assets: {
    all: ["assets"] as const,
    lists: () => [...siteQueryKeys.assets.all, "list"] as const,
    list: (siteId: string, filters?: any) =>
      [...siteQueryKeys.assets.lists(), siteId, filters] as const,
    details: () => [...siteQueryKeys.assets.all, "detail"] as const,
    detail: (id: string) => [...siteQueryKeys.assets.details(), id] as const,
    hierarchy: (siteId: string) =>
      [...siteQueryKeys.assets.all, "hierarchy", siteId] as const,
  },
  
  // Documents
  documents: {
    all: ["documents"] as const,
    lists: () => [...siteQueryKeys.documents.all, "list"] as const,
    list: (siteId: string, filters?: any) =>
      [...siteQueryKeys.documents.lists(), siteId, filters] as const,
  },
  
  // Customers
  customers: {
    all: ["customers"] as const,
    lists: () => [...siteQueryKeys.customers.all, "list"] as const,
    list: (filters?: any) => [...siteQueryKeys.customers.lists(), filters] as const,
    details: () => [...siteQueryKeys.customers.all, "detail"] as const,
    detail: (id: string) => [...siteQueryKeys.customers.details(), id] as const,
  },
  
  // Staff
  staff: {
    all: ["staff"] as const,
    lists: () => [...siteQueryKeys.staff.all, "list"] as const,
    list: (filters?: any) => [...siteQueryKeys.staff.lists(), filters] as const,
  },
  
  // Property Groups
  propertyGroups: {
    all: ["propertyGroups"] as const,
    lists: () => [...siteQueryKeys.propertyGroups.all, "list"] as const,
    list: (filters?: any) => [...siteQueryKeys.propertyGroups.lists(), filters] as const,
    details: () => [...siteQueryKeys.propertyGroups.all, "detail"] as const,
    detail: (id: string) => [...siteQueryKeys.propertyGroups.details(), id] as const,
  },
};