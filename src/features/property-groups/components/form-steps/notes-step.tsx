"use client";

import { UseFormReturn } from "react-hook-form";
import { PropertyGroupFormValues } from "../../schemas/property-groups.schema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadcnui/form";
import { Textarea } from "@/shared/components/shadcnui/textarea";
import { FileText, Lock } from "lucide-react";

interface NotesStepProps {
  form: UseFormReturn<PropertyGroupFormValues>;
}

export function NotesStep({ form }: NotesStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold">Notes et observations</h3>
          <p className="text-sm text-muted-foreground">
            Notes internes et commerciales
          </p>
        </div>
      </div>

      <FormField
        control={form.control}
        name="commercialNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes commerciales</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Notes visibles par l'équipe commerciale..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Notes partagées avec l'équipe commerciale
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="internalNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Notes internes
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Notes confidentielles internes..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Notes confidentielles à usage interne uniquement
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}