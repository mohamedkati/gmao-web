import {
  PropertyGroup,
  PropertyGroupFormData,
  PropertyGroupContact,
} from "../types/property-group.types";
import {
  mockPropertyGroups,
  mockContacts,
  mockStats,
  getContactsByPropertyGroupId,
  getPropertyGroupById,
} from "../utils/mock-data";

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage
let groups = [...mockPropertyGroups];
let contacts = [...mockContacts];
let nextGroupId = 9;
let nextContactId = 7;

export const propertyGroupMockService = {
  // Get all property groups
  getAll: async (params?: any): Promise<PropertyGroup[]> => {
    await delay();
    
    let filteredGroups = [...groups];

    // Apply filters
    if (params?.search) {
      const search = params.search.toLowerCase();
      filteredGroups = filteredGroups.filter(
        g =>
          g.name.toLowerCase().includes(search) ||
          g.reference.toLowerCase().includes(search) ||
          g.legalName?.toLowerCase().includes(search)
      );
    }

    if (params?.type && params.type.length > 0) {
      filteredGroups = filteredGroups.filter(g => params.type.includes(g.type));
    }

    if (params?.status && params.status.length > 0) {
      filteredGroups = filteredGroups.filter(g => params.status.includes(g.status));
    }

    if (params?.legalForm && params.legalForm.length > 0) {
      filteredGroups = filteredGroups.filter(
        g => g.legalForm && params.legalForm.includes(g.legalForm)
      );
    }

    // Add contacts to each group
    return filteredGroups.map(g => ({
      ...g,
      contacts: contacts.filter(c => c.propertyGroupId === g.id),
    }));
  },

  // Get property group by ID
  getById: async (id: string): Promise<PropertyGroup> => {
    await delay();
    const group = groups.find(g => g.id === id);
    if (!group) {
      throw new Error("Groupe non trouvé");
    }
    return {
      ...group,
      contacts: contacts.filter(c => c.propertyGroupId === id),
    };
  },

  // Create property group
  create: async (data: PropertyGroupFormData): Promise<PropertyGroup> => {
    await delay(800);
    
    const newGroup: PropertyGroup = {
      id: String(nextGroupId++),
      ...data,
      totalCustomers: 0,
      totalSites: 0,
      totalUnits: 0,
      totalAnnualRevenue: 0,
      contacts: [],
      created: new Date().toISOString(),
      createdBy: "current-user@gmao.fr",
      lastModified: new Date().toISOString(),
      lastModifiedBy: "current-user@gmao.fr",
    };

    groups.push(newGroup);
    return newGroup;
  },

  // Update property group
  update: async (
    id: string,
    data: Partial<PropertyGroupFormData>
  ): Promise<PropertyGroup> => {
    await delay(800);
    
    const index = groups.findIndex(g => g.id === id);
    if (index === -1) {
      throw new Error("Groupe non trouvé");
    }

    const updatedGroup: PropertyGroup = {
      ...groups[index]!,
      ...data,
      lastModified: new Date().toISOString(),
      lastModifiedBy: "current-user@gmao.fr",
    };

    groups[index] = updatedGroup;
    return {
      ...updatedGroup,
      contacts: contacts.filter(c => c.propertyGroupId === id),
    };
  },

  // Delete property group
  delete: async (id: string): Promise<void> => {
    await delay(500);
    groups = groups.filter(g => g.id !== id);
    contacts = contacts.filter(c => c.propertyGroupId !== id);
  },

  // Get contacts for a property group
  getContacts: async (id: string): Promise<PropertyGroupContact[]> => {
    await delay();
    return contacts.filter(c => c.propertyGroupId === id);
  },

  // Add contact to property group
  addContact: async (
    id: string,
    contact: Omit<PropertyGroupContact, "id">
  ): Promise<PropertyGroupContact> => {
    await delay(600);
    
    const newContact: PropertyGroupContact = {
      ...contact,
      id: `contact-${nextContactId++}`,
      propertyGroupId: id,
      created: new Date().toISOString(),
      createdBy: "current-user@gmao.fr",
      lastModified: new Date().toISOString(),
      lastModifiedBy: "current-user@gmao.fr",
    };

    contacts.push(newContact);
    return newContact;
  },

  // Update contact
  updateContact: async (
    id: string,
    contactId: string,
    contact: Partial<PropertyGroupContact>
  ): Promise<PropertyGroupContact> => {
    await delay(600);
    
    const index = contacts.findIndex(c => c.id === contactId && c.propertyGroupId === id);
    if (index === -1) {
      throw new Error("Contact non trouvé");
    }

    const updatedContact: PropertyGroupContact = {
      ...contacts[index]!,
      ...contact,
      lastModified: new Date().toISOString(),
      lastModifiedBy: "current-user@gmao.fr",
    };

    contacts[index] = updatedContact;
    return updatedContact;
  },

  // Delete contact
  deleteContact: async (id: string, contactId: string): Promise<void> => {
    await delay(500);
    contacts = contacts.filter(c => !(c.id === contactId && c.propertyGroupId === id));
  },

  // Update statistics
  updateStatistics: async (id: string): Promise<PropertyGroup> => {
    await delay(1000);
    
    const index = groups.findIndex(g => g.id === id);
    if (index === -1) {
      throw new Error("Groupe non trouvé");
    }

    // Simulate statistics update with random values
    const updatedGroup: PropertyGroup = {
      ...groups[index]!,
      totalCustomers: Math.floor(Math.random() * 100) + 10,
      totalSites: Math.floor(Math.random() * 200) + 20,
      totalUnits: Math.floor(Math.random() * 1500) + 100,
      totalAnnualRevenue: Math.floor(Math.random() * 5000000) + 500000,
      lastStatisticsUpdateDate: new Date().toISOString(),
    };

    groups[index] = updatedGroup;
    return {
      ...updatedGroup,
      contacts: contacts.filter(c => c.propertyGroupId === id),
    };
  },

  // Get statistics
  getStatistics: async () => {
    await delay();
    
    const stats = {
      totalGroups: groups.length,
      activeGroups: groups.filter(g => g.status === 1).length,
      prospectGroups: groups.filter(g => g.status === 2).length,
      totalCustomers: groups.reduce((sum, g) => sum + g.totalCustomers, 0),
      totalSites: groups.reduce((sum, g) => sum + g.totalSites, 0),
      totalRevenue: groups.reduce((sum, g) => sum + g.totalAnnualRevenue, 0),
    };

    return stats;
  },
};