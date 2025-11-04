'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/shadcnui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcnui/select';
import { DatePicker } from '@/shared/components/forms/date-picker';
import { Combobox } from '@/shared/components/forms/combobox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { LoadingSpinner } from '@/shared/components/feedback/loading-spinner';
import { createWorkOrderSchema, type CreateWorkOrderFormData } from '../schemas/work-order.schema';
import { WorkOrderPriority } from '../types/work-order.types';
import { WORK_ORDER_PRIORITY_LABELS } from '../constants/work-order.constants';

interface WorkOrderFormProps {
  defaultValues?: Partial<CreateWorkOrderFormData>;
  onSubmit: (data: CreateWorkOrderFormData) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

// Mock data - À remplacer par de vraies données
const mockAssets = [
  { value: '1', label: 'Chaudière principale - Bâtiment A' },
  { value: '2', label: 'Ascenseur 1 - Tour B' },
  { value: '3', label: 'Climatisation - Étage 3' },
];

const mockTechnicians = [
  { value: '1', label: 'Jean Dupont' },
  { value: '2', label: 'Marie Martin' },
  { value: '3', label: 'Pierre Bernard' },
];

const mockCustomers = [
  { value: '1', label: 'Société ABC' },
  { value: '2', label: 'Entreprise XYZ' },
  { value: '3', label: 'Client DEF' },
];

export function WorkOrderForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Créer l\'intervention',
}: WorkOrderFormProps) {
  const form = useForm<CreateWorkOrderFormData>({
    resolver: zodResolver(createWorkOrderSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: WorkOrderPriority.MEDIUM,
      assetId: '',
      technicianId: '',
      customerId: '',
      estimatedDuration: undefined,
      notes: '',
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
            <CardDescription>
              Détails de base de l'intervention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Titre */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Réparation chaudière"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez l'intervention à effectuer..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priorité */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priorité *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une priorité" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(WORK_ORDER_PRIORITY_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Assignation */}
        <Card>
          <CardHeader>
            <CardTitle>Assignation</CardTitle>
            <CardDescription>
              Équipement, client et technicien
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Client */}
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client *</FormLabel>
                  <FormControl>
                    <Combobox
                      options={mockCustomers}
                      value={field.value}
                      onSelect={field.onChange}
                      placeholder="Sélectionner un client"
                      searchPlaceholder="Rechercher un client..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Équipement */}
            <FormField
              control={form.control}
              name="assetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Équipement *</FormLabel>
                  <FormControl>
                    <Combobox
                      options={mockAssets}
                      value={field.value}
                      onSelect={field.onChange}
                      placeholder="Sélectionner un équipement"
                      searchPlaceholder="Rechercher un équipement..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Technicien */}
            <FormField
              control={form.control}
              name="technicianId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technicien</FormLabel>
                  <FormControl>
                    <Combobox
                      options={mockTechnicians}
                      value={field.value || ''}
                      onSelect={field.onChange}
                      placeholder="Sélectionner un technicien (optionnel)"
                      searchPlaceholder="Rechercher un technicien..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Planification */}
        <Card>
          <CardHeader>
            <CardTitle>Planification</CardTitle>
            <CardDescription>
              Date et durée estimée
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date planifiée */}
            <FormField
              control={form.control}
              name="scheduledDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date planifiée</FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value}
                      onSelect={field.onChange}
                      placeholder="Sélectionner une date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Durée estimée */}
            <FormField
              control={form.control}
              name="estimatedDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durée estimée (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 120"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? parseInt(value) : undefined);
                      }}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Notes additionnelles</CardTitle>
            <CardDescription>
              Informations complémentaires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Ajoutez des notes si nécessaire..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting}
          >
            Réinitialiser
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <LoadingSpinner size="sm" className="mr-2" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}