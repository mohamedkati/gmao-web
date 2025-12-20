
"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/shared/components/shadcnui/button";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import { ChevronLeft, Edit, AlertCircle, Sparkles } from "lucide-react";
import { CustomerForm } from "@/features/customers-v2/components/customer-form";
import { useCustomer } from "@/features/customers-v2/hooks/user-customers.query";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import { Badge } from "@/shared/components/shadcnui/badge";
import { CustomerType } from "@/features/customers-v2/types/customer.types";

export default function EditCustomerPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;

  const { data: customer, isLoading, error } = useCustomer(customerId);

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getTypeIcon = (type: CustomerType) => {
    // Same as before
    return "🏢";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="border-b p-6">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <div className="flex items-center gap-6">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-10 w-96" />
                <Skeleton className="h-6 w-64" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="max-w-5xl mx-auto space-y-4">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !customer) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-md">
          <div className="rounded-full bg-destructive/10 p-6 inline-flex mb-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Client introuvable</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Le client que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => router.push("/customers")}>
            Retour à la liste
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header Hero */}
      <div className="relative border-b overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        {/* Decorative sparkles */}
        <div className="absolute top-8 right-8 animate-pulse">
          <Sparkles className="h-8 w-8 text-primary/40" />
        </div>
        <div className="absolute top-16 right-24 animate-pulse" style={{ animationDelay: "0.5s" }}>
          <Sparkles className="h-5 w-5 text-purple-500/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/customers-v2/${customerId}`)}
            className="mb-6 -ml-2 backdrop-blur-sm hover:bg-primary/10 hover:text-primary/70"
          >
            <ChevronLeft className="mr-2 h-4 w-4  " />
            Retour aux détails
          </Button>

          {/* Header content */}
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-purple-500/40 rounded-full blur-2xl animate-pulse" />
              <Avatar className="h-20 w-20 ring-4 ring-background shadow-2xl relative border-4 border-white/20">
                <AvatarFallback className="bg-gradient-to-br from-primary via-primary to-primary/60 text-primary-foreground font-bold text-2xl">
                  {getInitials(customer.companyName)}
                </AvatarFallback>
              </Avatar>
              {/* Status indicator */}
              {customer.active && (
                <div className="absolute bottom-0 right-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-md animate-pulse" />
                    <div className="relative h-6 w-6 bg-green-500 border-4 border-background rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold tracking-tight">
                  {customer.companyName}
                </h1>
                {!customer.active && (
                  <Badge variant="secondary">Inactif</Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Modification des informations du client
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-3 rounded-xl bg-primary/20 backdrop-blur-sm">
                <Edit className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <CustomerForm mode="edit" initialData={customer} />
        </div>
      </div>
    </div>
  );
}