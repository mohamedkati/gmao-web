// src/features/permissions/components/edit-permission-dialog.tsx

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/shadcnui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadcnui/form";
import { Input } from "@/shared/components/shadcnui/input";
import { Textarea } from "@/shared/components/shadcnui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import { Switch } from "@/shared/components/shadcnui/switch";
import { Button } from "@/shared/components/shadcnui/button";
import { useUpdatePermission } from "../hooks/use-permissions";
import { Permission } from "../types/permission.types";

const formSchema = z.object({
  displayName: z.string().min(1, "Requis"),
  description: z.string().min(1, "Requis"),
  category: z.enum(["standard", "specific"]),
  isDangerous: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface EditPermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  permission: Permission;
}

export function EditPermissionDialog({
  open,
  onOpenChange,
  permission,
}: EditPermissionDialogProps) {
  const updateMutation = useUpdatePermission();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: permission.displayName,
      description: permission.description,
      category: permission.category,
      isDangerous: permission.isDangerous,
    },
  });

  useEffect(() => {
    if (permission) {
      form.reset({
        displayName: permission.displayName,
        description: permission.description,
        category: permission.category,
        isDangerous: permission.isDangerous,
      });
    }
  }, [permission, form]);

  const onSubmit = (data: FormValues) => {
    updateMutation.mutate(
      { id: permission.id, dto: data },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier la permission</DialogTitle>
          <DialogDescription>
            Modifiez les informations de la permission {permission.code}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Informations non modifiables */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Ressource
                </label>
                <p className="text-sm font-mono mt-1">{permission.resource}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Action
                </label>
                <p className="text-sm font-mono mt-1">{permission.action}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Code complet
                </label>
                <p className="text-sm font-mono mt-1">{permission.code}</p>
              </div>
            </div>

            {/* Champs modifiables */}
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom affiché</FormLabel>
                  <FormControl>
                    <Input placeholder="Créer des clients" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Permet de créer de nouveaux clients dans le système"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="standard">Standard (CRUD)</SelectItem>
                        <SelectItem value="specific">Spécifique (Métier)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isDangerous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Dangereuse</FormLabel>
                      <FormDescription>
                        Action sensible (delete, cancel, etc.)
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Mise à jour..." : "Mettre à jour"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}