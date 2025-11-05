import { fakerFR as faker } from '@faker-js/faker';
import {
  WorkOrder,
  WorkOrderStatus,
  WorkOrderPriority,
} from '../../types/work-order.types';

/**
 * Génère un bon d'intervention factice
 */
export function generateMockWorkOrder(overrides: Partial<WorkOrder> = {}): WorkOrder {
  const statusValues = Object.values(WorkOrderStatus);
  const priorityValues = Object.values(WorkOrderPriority);

  const status = faker.helpers.arrayElement(statusValues);
  const priority = faker.helpers.arrayElement(priorityValues);
  const id = faker.string.uuid();

  const createdAt = faker.date.recent({ days: 30 });
  const scheduledDate =
    status !== WorkOrderStatus.PENDING
      ? faker.date.soon({ days: 15, refDate: createdAt })
      : undefined;

  const completedDate =
    status === WorkOrderStatus.COMPLETED
      ? faker.date.soon({ days: 20, refDate: scheduledDate })
      : undefined;

  return {
    id,
    title: `Intervention ${faker.word.adjective()} ${faker.word.noun()}`,
    description: faker.lorem.sentences(2),
    status,
    priority,
    assetId: faker.string.uuid(),
    assetName: faker.helpers.arrayElement([
      'Chaudière Gaz A1',
      'Pompe Hydraulique PX-200',
      'Ventilateur Industriel V9',
      'Panneau de contrôle électrique',
      'Adoucisseur S20',
    ]),
    technicianId: faker.string.uuid(),
    technicianName: faker.person.fullName(),
    customerId: faker.string.uuid(),
    customerName: faker.company.name(),
    scheduledDate: scheduledDate?.toISOString(),
    completedDate: completedDate?.toISOString(),
    estimatedDuration: faker.number.int({ min: 30, max: 180 }),
    actualDuration:
      status === WorkOrderStatus.COMPLETED
        ? faker.number.int({ min: 20, max: 240 })
        : undefined,
    notes: faker.lorem.sentences(1),
    createdAt: createdAt.toISOString(),
    updatedAt: faker.date.soon({ days: 5, refDate: createdAt }).toISOString(),
    tenantId: 'mock-tenant',
    ...overrides,
  };
}

/**
 * Génère une liste de bons d'intervention factices
 */
export function generateMockWorkOrders(count: number = 25): WorkOrder[] {
  return Array.from({ length: count }, () => generateMockWorkOrder());
}
