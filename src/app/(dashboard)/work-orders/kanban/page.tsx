'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Filter } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { PageHeader } from '@/shared/components/layout/page-header';
import { KanbanBoard } from '@/shared/components/advanced/kanban-board';
import { WorkOrderQuickView } from '@/shared/components/business/work-order-quick-view';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';

// 📊 Données Mock
const initialColumns = [
  {
    id: 'backlog',
    title: 'Demandes',
    color: '#6b7280',
    cards: [
      {
        id: '1',
        title: 'Fuite d\'eau salle de bain',
        description: 'Fuite importante au niveau du lavabo',
        priority: 'high' as const,
        assignee: 'Non assigné',
        tags: ['Plomberie', 'Urgent'],
      },
      {
        id: '2',
        title: 'Panne d\'éclairage hall',
        description: 'Plusieurs néons ne fonctionnent plus',
        priority: 'medium' as const,
        assignee: 'Non assigné',
        tags: ['Électricité'],
      },
    ],
  },
  {
    id: 'planned',
    title: 'Planifiées',
    color: '#3b82f6',
    cards: [
      {
        id: '3',
        title: 'Maintenance chaudière',
        description: 'Contrôle annuel obligatoire',
        priority: 'medium' as const,
        assignee: 'Pierre B.',
        tags: ['Chauffage', 'Préventive'],
      },
      {
        id: '4',
        title: 'Inspection ascenseur',
        description: 'Inspection réglementaire trimestrielle',
        priority: 'high' as const,
        assignee: 'Sophie L.',
        tags: ['Ascenseur', 'Réglementaire'],
      },
      {
        id: '5',
        title: 'Remplacement filtres CVC',
        description: 'Changement des filtres climatisation',
        priority: 'low' as const,
        assignee: 'Marie D.',
        tags: ['Climatisation', 'Préventive'],
      },
    ],
  },
  {
    id: 'in_progress',
    title: 'En cours',
    color: '#f59e0b',
    cards: [
      {
        id: '6',
        title: 'Réparation porte coupe-feu',
        description: 'Mécanisme de fermeture défectueux',
        priority: 'high' as const,
        assignee: 'Jean M.',
        tags: ['Sécurité', 'Urgent'],
      },
      {
        id: '7',
        title: 'Débouchage canalisation',
        description: 'Canalisation bouchée au sous-sol',
        priority: 'medium' as const,
        assignee: 'Claire M.',
        tags: ['Plomberie'],
      },
    ],
  },
  {
    id: 'completed',
    title: 'Terminées',
    color: '#22c55e',
    cards: [
      {
        id: '8',
        title: 'Changement ampoules parking',
        description: 'Remplacement de 12 ampoules LED',
        priority: 'low' as const,
        assignee: 'Luc P.',
        tags: ['Électricité'],
      },
      {
        id: '9',
        title: 'Réparation serrure entrée',
        description: 'Remplacement cylindre défectueux',
        priority: 'medium' as const,
        assignee: 'Jean M.',
        tags: ['Serrurerie'],
      },
    ],
  },
];

const mockWorkOrders = [
  {
    id: '1',
    title: 'Fuite d\'eau salle de bain',
    description: 'Fuite importante au niveau du lavabo du 3ème étage',
    status: 'En attente',
    priority: 'high',
    assetName: 'Sanitaires Étage 3',
    location: 'Bâtiment A - Étage 3',
  },
  {
    id: '3',
    title: 'Maintenance chaudière',
    description: 'Contrôle annuel obligatoire de la chaudière principale',
    status: 'Planifiée',
    priority: 'medium',
    assetName: 'Chaudière Principale',
    technicianName: 'Pierre Bernard',
    location: 'Bâtiment A - Sous-sol',
    scheduledDate: new Date('2024-11-15T09:00:00'),
    estimatedDuration: 120,
  },
  {
    id: '6',
    title: 'Réparation porte coupe-feu',
    description: 'Mécanisme de fermeture automatique défectueux',
    status: 'En cours',
    priority: 'high',
    assetName: 'Porte Coupe-feu B2',
    technicianName: 'Jean Martin',
    location: 'Bâtiment B - Étage 2',
    scheduledDate: new Date(),
    estimatedDuration: 90,
  },
];

export default function WorkOrdersKanbanPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardMove = (cardId: string, fromColumnId: string, toColumnId: string) => {
    setColumns((prevColumns) => {
      // Find the card in the source column
      const fromColumn = prevColumns.find((col) => col.id === fromColumnId);
      const card = fromColumn?.cards.find((c) => c.id === cardId);

      if (!card) return prevColumns;

      // Remove card from source column
      const newColumns = prevColumns.map((col) => {
        if (col.id === fromColumnId) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== cardId),
          };
        }
        if (col.id === toColumnId) {
          return {
            ...col,
            cards: [...col.cards, card],
          };
        }
        return col;
      });

      return newColumns;
    });
  };

  const handleCardClick = (card: any) => {
    setSelectedCard(card.id);
  };

  const selectedWorkOrder = mockWorkOrders.find((wo) => wo.id === selectedCard);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title={
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/work-orders">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span>Vue Kanban</span>
          </div>
        }
        description="Gérez vos interventions en mode visuel"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle intervention
          </Button>
        </div>
      </PageHeader>

      {/* Kanban Board */}
      <KanbanBoard
        columns={columns}
        onCardMove={handleCardMove}
        onCardClick={handleCardClick}
      />

      {/* Quick View Dialog */}
      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-2xl">
          {selectedWorkOrder && (
            <WorkOrderQuickView
              workOrder={selectedWorkOrder}
              onView={() => {
                window.location.href = `/work-orders/${selectedCard}`;
              }}
              onEdit={() => {
                window.location.href = `/work-orders/${selectedCard}/edit`;
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}