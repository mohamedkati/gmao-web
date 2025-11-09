// 'use client';

// import { ArrowLeft } from 'lucide-react';
// import Link from 'next/link';
// import { Button } from '@/shared/components/ui/button';
// import { PageHeader } from '@/shared/components/layout/page-header';
// import { Breadcrumb } from '@/shared/components/layout/breadcrumb';
// import { LoadingOverlay } from '@/shared/components/feedback/loading-overlay';
// import { ErrorState } from '@/shared/components/feedback/error-state';
// import { WorkOrderForm } from '@/features/work-orders/components/work-order-form';
// import { useWorkOrder } from '@/features/work-orders/hooks/use-work-order';
// import { useWorkOrderMutations } from '@/features/work-orders/hooks/use-work-order-mutations';
// import type { CreateWorkOrderFormData } from '@/features/work-orders/schemas/work-order.schema';

// interface EditWorkOrderPageProps {
//     params: {
//         id: string;
//     };
// }

// export default async function EditWorkOrderPage({params}: EditWorkOrderPageProps) {
//     const id = params.id;
//     const { data: workOrder, isLoading, error, refetch } = useWorkOrder(id);
//     const { update, isUpdating } = useWorkOrderMutations();

//     const handleSubmit = (data: CreateWorkOrderFormData) => {
//         update({ id: id, dto: data });
//     };

//     if (isLoading) {
//         return <LoadingOverlay message="Chargement..." />;
//     }

//     if (error || !workOrder) {
//         return (
//             <ErrorState
//                 message="Impossible de charger l'intervention"
//                 onRetry={() => refetch()}
//             />
//         );
//     }

//     return (
//         <div className="space-y-6">
//             {/* Breadcrumb */}
//             <Breadcrumb
//                 items={[
//                     { label: 'Interventions', href: '/work-orders' },
//                     { label: workOrder.title, href: `/work-orders/${id}` },
//                     { label: 'Modifier', href: `/work-orders/${id}/edit` },
//                 ]}
//             />

//             {/* Page Header */}
//             <PageHeader
//                 title="Modifier l'intervention"
//                 description={workOrder.title}
//             >
//                 <Button variant="outline" asChild>
//                     <Link href={`/work-orders/${id}`}>
//                         <ArrowLeft className="mr-2 h-4 w-4" />
//                         Annuler
//                     </Link>
//                 </Button>
//             </PageHeader>

//             {/* Form */}
//             <WorkOrderForm
//                 defaultValues={{
//                     title: workOrder.title,
//                     description: workOrder.description,
//                     priority: workOrder.priority,
//                     assetId: workOrder.assetId,
//                     technicianId: workOrder.technicianId,
//                     customerId: workOrder.customerId,
//                     scheduledDate: workOrder.scheduledDate
//                         ? new Date(workOrder.scheduledDate)
//                         : undefined,
//                     estimatedDuration: workOrder.estimatedDuration,
//                     notes: workOrder.notes,
//                 }}
//                 onSubmit={handleSubmit}
//                 isSubmitting={isUpdating}
//                 submitLabel="Enregistrer les modifications"
//             />
//         </div>
//     );
// }

import { ArrowLeft, Edit, Trash2, CheckCircle, Clock, Download, MessageSquare, Paperclip } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { PageHeader } from '@/shared/components/layout/page-header';
import { SplitView } from '@/shared/components/layout/split-view';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import { StatusTimeline } from '@/shared/components/business/status-timeline';
import { PriorityIndicator } from '@/shared/components/business/priority-indicator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/tabs';
import { ImageGallery } from '@/shared/components/advanced/image-gallery';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';

// 📊 Données Mock
const workOrder = {
  id: 'WO-2024-001',
  title: 'Réparation chaudière principale',
  description:
    'La chaudière du bâtiment A présente une fuite au niveau du circuit primaire. Intervention urgente requise pour éviter tout risque de panne complète du système de chauffage.',
  status: 'in_progress',
  priority: 'high' as const,
  createdAt: new Date('2024-11-01T08:00:00'),
  scheduledDate: new Date('2024-11-05T09:00:00'),
  estimatedDuration: 180, // minutes
  asset: {
    id: '1',
    name: 'Chaudière Principale',
    type: 'Chauffage',
    location: 'Bâtiment A - Sous-sol',
  },
  technician: {
    id: '1',
    name: 'Jean Martin',
    email: 'jean.martin@gmao.fr',
    phone: '+33 6 12 34 56 78',
    specialties: ['Électricité', 'Plomberie'],
  },
  customer: {
    id: '1',
    name: 'Résidence Les Jardins',
    contact: 'M. Dupont',
    email: 'contact@lesjardins.fr',
    phone: '+33 1 23 45 67 89',
  },
  createdBy: {
    name: 'Sophie Laurent',
    role: 'Gestionnaire',
  },
};

const timeline = [
  {
    id: '1',
    title: 'Intervention créée',
    description: 'Demande d\'intervention reçue du client',
    status: 'completed' as const,
    timestamp: new Date('2024-11-01T08:00:00'),
    user: 'Sophie Laurent',
  },
  {
    id: '2',
    title: 'Technicien assigné',
    description: 'Jean Martin a été assigné à cette intervention',
    status: 'completed' as const,
    timestamp: new Date('2024-11-01T08:30:00'),
    user: 'Sophie Laurent',
  },
  {
    id: '3',
    title: 'Intervention planifiée',
    description: 'Date et heure confirmées avec le client',
    status: 'completed' as const,
    timestamp: new Date('2024-11-01T09:00:00'),
    user: 'Jean Martin',
  },
  {
    id: '4',
    title: 'En cours d\'intervention',
    description: 'Le technicien est sur place et travaille sur le problème',
    status: 'in_progress' as const,
    timestamp: new Date('2024-11-05T09:15:00'),
    user: 'Jean Martin',
  },
  {
    id: '5',
    title: 'En attente de pièce',
    description: 'Joint d\'étanchéité commandé, livraison prévue demain',
    status: 'pending' as const,
    timestamp: new Date('2024-11-05T11:00:00'),
    user: 'Jean Martin',
  },
];

const comments = [
  {
    id: '1',
    author: 'Jean Martin',
    role: 'Technicien',
    content:
      'Diagnostic effectué : fuite au niveau du joint du circuit primaire. Nécessite remplacement du joint et purge du circuit.',
    timestamp: new Date('2024-11-05T09:45:00'),
  },
  {
    id: '2',
    author: 'Sophie Laurent',
    role: 'Gestionnaire',
    content: 'Joint commandé chez le fournisseur. Livraison prévue demain matin.',
    timestamp: new Date('2024-11-05T10:30:00'),
  },
  {
    id: '3',
    author: 'Jean Martin',
    role: 'Technicien',
    content:
      'Isolation de la zone effectuée. Système de chauffage secondaire activé pour assurer le minimum.',
    timestamp: new Date('2024-11-05T11:15:00'),
  },
];

const attachments = [
  {
    id: '1',
    name: 'diagnostic-chaudiere.pdf',
    type: 'application/pdf',
    size: '2.3 MB',
    uploadedBy: 'Jean Martin',
    uploadedAt: new Date('2024-11-05T09:50:00'),
  },
  {
    id: '2',
    name: 'photo-fuite.jpg',
    type: 'image/jpeg',
    size: '1.8 MB',
    uploadedBy: 'Jean Martin',
    uploadedAt: new Date('2024-11-05T09:55:00'),
  },
];

const photos = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
    alt: 'Photo de la fuite',
    caption: 'Fuite au niveau du circuit primaire',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
    alt: 'Vue d\'ensemble',
    caption: 'Vue d\'ensemble de la chaudière',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
    alt: 'Détail du joint',
    caption: 'Joint défectueux à remplacer',
  },
];

const materials = [
  { name: 'Joint étanchéité DN25', quantity: 1, unit: 'pièce' },
  { name: 'Liquide de refroidissement', quantity: 5, unit: 'litres' },
  { name: 'Filtre à eau', quantity: 1, unit: 'pièce' },
];

export default function WorkOrderDetailPage() {
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
            <div>
              <div className="flex items-center gap-2">
                <span>{workOrder.title}</span>
                <Badge variant="outline">{workOrder.id}</Badge>
              </div>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                Créé le {workOrder.createdAt.toLocaleDateString('fr-FR')} par{' '}
                {workOrder.createdBy.name}
              </p>
            </div>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </PageHeader>

      {/* Status & Priority */}
      <div className="flex items-center gap-3">
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400">
          <Clock className="mr-1 h-3 w-3" />
          En cours
        </Badge>
        <PriorityIndicator priority={workOrder.priority} />
      </div>

      {/* Main Content */}
      <SplitView
        ratio="2:1"
        sticky="right"
        left={
          <div className="space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {workOrder.description}
                </p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="timeline" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="timeline">Historique</TabsTrigger>
                <TabsTrigger value="comments">
                  Commentaires
                  <Badge variant="secondary" className="ml-2">
                    {comments.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="attachments">
                  Fichiers
                  <Badge variant="secondary" className="ml-2">
                    {attachments.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>

              {/* Timeline Tab */}
              <TabsContent value="timeline">
                <Card>
                  <CardContent className="pt-6">
                    <StatusTimeline events={timeline} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Comments Tab */}
              <TabsContent value="comments" className="space-y-4">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    {/* Existing Comments */}
                    {comments.map((comment, index) => (
                      <div key={comment.id}>
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {comment.author
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold">
                                {comment.author}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {comment.role}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {comment.timestamp.toLocaleString('fr-FR')}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                        {index < comments.length - 1 && <Separator className="mt-6" />}
                      </div>
                    ))}

                    {/* New Comment Form */}
                    <Separator />
                    <div className="space-y-3">
                      <Label>Ajouter un commentaire</Label>
                      <Textarea
                        placeholder="Écrivez votre commentaire..."
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end">
                        <Button>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Publier
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Attachments Tab */}
              <TabsContent value="attachments">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    {attachments.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Paperclip className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {file.size} • Ajouté par {file.uploadedBy} le{' '}
                              {file.uploadedAt.toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full">
                      <Paperclip className="mr-2 h-4 w-4" />
                      Ajouter un fichier
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Photos Tab */}
              <TabsContent value="photos">
                <Card>
                  <CardContent className="pt-6">
                    <ImageGallery images={photos} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        }
        right={
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Marquer comme terminée
                </Button>
                <Button variant="outline" className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  Reprogrammer
                </Button>
              </CardContent>
            </Card>

            {/* Asset Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Équipement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold">{workOrder.asset.name}</p>
                  <p className="text-xs text-muted-foreground">{workOrder.asset.type}</p>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Localisation</span>
                    <span className="font-medium text-right">
                      {workOrder.asset.location}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/assets/${workOrder.asset.id}`}>
                    Voir l'équipement
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Technician Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Technicien</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {workOrder.technician.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">
                      {workOrder.technician.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {workOrder.technician.specialties.join(', ')}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{workOrder.technician.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Téléphone</span>
                    <span className="font-medium">{workOrder.technician.phone}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/technicians/${workOrder.technician.id}`}>
                    Voir le profil
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold">{workOrder.customer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Contact: {workOrder.customer.contact}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{workOrder.customer.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Téléphone</span>
                    <span className="font-medium">{workOrder.customer.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Planning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Date prévue</span>
                    <span className="font-medium">
                      {workOrder.scheduledDate.toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Heure</span>
                    <span className="font-medium">
                      {workOrder.scheduledDate.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Durée estimée</span>
                    <span className="font-medium">
                      {Math.floor(workOrder.estimatedDuration / 60)}h{' '}
                      {workOrder.estimatedDuration % 60}min
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Materials */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Matériel utilisé</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {materials.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm p-2 rounded border"
                    >
                      <span className="text-muted-foreground">{material.name}</span>
                      <span className="font-medium">
                        {material.quantity} {material.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        }
      />
    </div>
  );
}