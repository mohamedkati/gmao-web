// src/features/permissions/components/create-permission-dialog.tsx

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/shadcnui/select";
import { Switch } from "@/shared/components/shadcnui/switch";
import { Button } from "@/shared/components/shadcnui/button";
import { useCreatePermission } from "../../hooks/use-permissions";

const formSchema = z.object({
    resource: z.string().min(1, "Requis"),
    action: z.string().min(1, "Requis"),
    displayName: z.string().min(1, "Requis"),
    description: z.string().min(1, "Requis"),
    category: z.enum(["standard", "specific"]),
    isDangerous: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface CreatePermissionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreatePermissionDialog({ open, onOpenChange }: CreatePermissionDialogProps) {
    const createMutation = useCreatePermission();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            resource: "",
            action: "",
            displayName: "",
            description: "",
            category: "standard",
            isDangerous: false,
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
                    <DialogTitle>Créer une permission</DialogTitle>
                    <DialogDescription>
                        Ajoutez une nouvelle permission au système
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="resource"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ressource</FormLabel>
                                        <FormControl>
                                            <Input placeholder="customers" {...field} />
                                        </FormControl>
                                        <FormDescription>En minuscules, sans espaces</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="action"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Action</FormLabel>
                                        <FormControl>
                                            <Input placeholder="create" {...field} />
                                        </FormControl>
                                        <FormDescription>En minuscules, sans espaces</FormDescription>
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
                                            <FormDescription>Action sensible (delete, cancel, etc.)</FormDescription>
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