"use client";

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
import { useCreateRole } from "../../hooks/use-permissions";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Requis")
    .regex(/^[A-Za-z]+$/, "Uniquement des lettres, sans espaces"),
  displayName: z.string().min(1, "Requis"),
  description: z.string().min(1, "Requis"),
  priority: z.coerce.number().min(1).max(100).default(50),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateRoleDialog({ open, onOpenChange }: CreateRoleDialogProps) {
  const createMutation = useCreateRole();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      displayName: "",
      description: "",
      priority: 50,
    },
  });

  const onSubmit = (data: FormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Créer un rôle</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau rôle au système. Vous pourrez assigner les permissions ensuite.
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
                      <Input placeholder="CustomRole" {...field} />
                    </FormControl>
                    <FormDescription>Sans espaces, lettres uniquement</FormDescription>
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
                    <FormDescription>1-100 (plus élevé = plus de pouvoir)</FormDescription>
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
                    <Input placeholder="Mon Rôle Personnalisé" {...field} />
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
                      placeholder="Description du rôle et de ses responsabilités"
                      {...field}
                    />
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
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Création..." : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}