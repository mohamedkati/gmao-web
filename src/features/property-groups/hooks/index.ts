// src/features/property-groups/hooks/index.ts

// Configuration simple pour basculer entre mock et API réelle
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// Import des hooks mock
import {
  usePropertyGroupsMock as usePropertyGroupsMock,
  usePropertyGroupMock as usePropertyGroupMock,
  usePropertyGroupContactsMock as usePropertyGroupContactsMock,
  usePropertyGroupStatisticsMock as usePropertyGroupStatisticsMock,
  useCreatePropertyGroupMock as useCreatePropertyGroupMock,
  useUpdatePropertyGroupMock as useUpdatePropertyGroupMock,
  useDeletePropertyGroupMock as useDeletePropertyGroupMock,
  useAddPropertyGroupContactMock as useAddPropertyGroupContactMock,
  useUpdatePropertyGroupContactMock as useUpdatePropertyGroupContactMock,
  useDeletePropertyGroupContactMock as useDeletePropertyGroupContactMock,
  useUpdatePropertyGroupStatisticsMock as useUpdatePropertyGroupStatisticsMock,
} from "./use-property-group-mock";

// Import des hooks API réelle
import {
  usePropertyGroups as usePropertyGroupsReal,
  usePropertyGroup as usePropertyGroupReal,
  usePropertyGroupContacts as usePropertyGroupContactsReal,
  usePropertyGroupStatistics as usePropertyGroupStatisticsReal,
  useCreatePropertyGroup as useCreatePropertyGroupReal,
  useUpdatePropertyGroup as useUpdatePropertyGroupReal,
  useDeletePropertyGroup as useDeletePropertyGroupReal,
  useAddPropertyGroupContact as useAddPropertyGroupContactReal,
  useUpdatePropertyGroupContact as useUpdatePropertyGroupContactReal,
  useDeletePropertyGroupContact as useDeletePropertyGroupContactReal,
  useUpdatePropertyGroupStatistics as useUpdatePropertyGroupStatisticsReal,
} from "./use-property-groups";

// Export des hooks appropriés selon la configuration
export const usePropertyGroups = USE_MOCK ? usePropertyGroupsMock : usePropertyGroupsReal;
export const usePropertyGroup = USE_MOCK ? usePropertyGroupMock : usePropertyGroupReal;
export const usePropertyGroupContacts = USE_MOCK ? usePropertyGroupContactsMock : usePropertyGroupContactsReal;
export const usePropertyGroupStatistics = USE_MOCK ? usePropertyGroupStatisticsMock : usePropertyGroupStatisticsReal;
export const useCreatePropertyGroup = USE_MOCK ? useCreatePropertyGroupMock : useCreatePropertyGroupReal;
export const useUpdatePropertyGroup = USE_MOCK ? useUpdatePropertyGroupMock : useUpdatePropertyGroupReal;
export const useDeletePropertyGroup = USE_MOCK ? useDeletePropertyGroupMock : useDeletePropertyGroupReal;
export const useAddPropertyGroupContact = USE_MOCK ? useAddPropertyGroupContactMock : useAddPropertyGroupContactReal;
export const useUpdatePropertyGroupContact = USE_MOCK ? useUpdatePropertyGroupContactMock : useUpdatePropertyGroupContactReal;
export const useDeletePropertyGroupContact = USE_MOCK ? useDeletePropertyGroupContactMock : useDeletePropertyGroupContactReal;
export const useUpdatePropertyGroupStatistics = USE_MOCK ? useUpdatePropertyGroupStatisticsMock : useUpdatePropertyGroupStatisticsReal;