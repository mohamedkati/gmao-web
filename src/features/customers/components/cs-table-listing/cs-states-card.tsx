"use client";

import { Card, CardContent } from "@/shared/components/shadcnui/card";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import { useCustomerStatistics } from "../../hooks/user-customers.query";
import {
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  Building,
  Landmark,
  User,
} from "lucide-react";
import { formatCurrency } from "../../utils/customer.utils";

export function CustomerStatsCards() {
  const { data: stats, isLoading } = useCustomerStatistics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Clients
              </p>
              <p className="text-2xl font-bold">{stats.totalCustomers}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3" />
                <span>{stats.propertyManagers} gestionnaires</span>
              </div>
            </div>
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Syndics</p>
              <p className="text-2xl font-bold">{stats.syndics}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Briefcase className="h-3 w-3" />
                <span>{stats.corporates} entreprises</span>
              </div>
            </div>
            <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3">
              <Building className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Collectivités
              </p>
              <p className="text-2xl font-bold">{stats.governments}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{stats.individuals} particuliers</span>
              </div>
            </div>
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
              <Landmark className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Budget Total 2024
              </p>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalBudget)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Moy: {formatCurrency(stats.averageBudget)}
              </p>
            </div>
            <div className="rounded-full bg-orange-100 dark:bg-orange-900 p-3">
              <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}