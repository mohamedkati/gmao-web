// src/features/permissions/components/edit-role-dialog.tsx

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
import { Button } from "@/shared/components/shadcnui/button";
import { useUpdateRole } from "../../hooks/use-permissions";
import { Role } from "../../types/permission.types";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Requis")
    .regex(/^[A-Za-z]+$/, "Uniquement des lettres, sans espaces"),
  displayName: z.string().min(1, "Requis"),
  description: z.string().min(1, "Requis"),
  priority: z.coerce.number().min(1).max(100),
});

type FormValues = z.infer<typeof formSchema>;

interface EditRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role;
}

export function EditRoleDialog({ open, onOpenChange, role }: EditRoleDialogProps) {
  const updateMutation = useUpdateRole();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: role.name,
      displayName: role.displayName,
      description: role.description,
      priority: role.priority,
    },
  });

  useEffect(() => {
    if (role) {
      form.reset({
        name: role.name,
        displayName: role.displayName,
        description: role.description,
        priority: role.priority,
      });
    }
  }, [role, form]);

  const onSubmit = (data: FormValues) => {
    updateMutation.mutate(
      { id: role.id, dto: data },
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
          <DialogTitle>Modifier le rôle</DialogTitle>
          <DialogDescription>
            Modifiez les informations du rôle {role.displayName}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identifiant</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={role.isSystem} />
                    </FormControl>
                    {role.isSystem && (
                      <FormDescription>
                        Identifiant système non modifiable
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priorité</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={100} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom affiché</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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