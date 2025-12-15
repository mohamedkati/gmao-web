// src/app/(dashboard)/admin/audit/permissions/page.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { Calendar } from "@/shared/components/shadcnui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/shadcnui/popover";
import { CalendarIcon, Download, Filter, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { usePermissionAudit } from "@/features/permissions/hooks/use-permissions";
import { PermissionAuditFilter } from "@/features/permissions/types/permission.types";
import { AuditLogsTable } from "@/features/permissions/components/listing/audit-logs-table";

export default function PermissionAuditPage() {
  const [filters, setFilters] = useState<PermissionAuditFilter>({
    limit: 100,
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { data: auditLogs, isLoading, refetch } = usePermissionAudit(filters);

  const handleApplyFilters = () => {
    setFilters({
      ...filters,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });
  };

  const handleClearFilters = () => {
    setFilters({ limit: 100 });
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleExport = () => {
    // TODO: Implémenter l'export CSV
    console.log("Export audit logs", auditLogs);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Journal d'audit des permissions
          </h1>
          <p className="text-muted-foreground">
            Consultez l'historique des modifications de permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
          <CardDescription>
            Filtrez les logs d'audit par période ou par type d'action
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {/* Date de début */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date de début</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP", { locale: fr })
                    ) : (
                      <span>Sélectionner</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Date de fin */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date de fin</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PPP", { locale: fr })
                    ) : (
                      <span>Sélectionner</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Limite */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre de résultats</label>
              <Input
                type="number"
                min={1}
                max={1000}
                value={filters.limit}
                onChange={(e) =>
                  setFilters({ ...filters, limit: parseInt(e.target.value) })
                }
              />
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <label className="text-sm font-medium">&nbsp;</label>
              <div className="flex gap-2">
                <Button onClick={handleApplyFilters} className="flex-1">
                  Appliquer
                </Button>
                <Button variant="outline" onClick={handleClearFilters}>
                  Réinitialiser
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total d'événements</CardDescription>
            <CardTitle className="text-3xl">{auditLogs?.length || 0}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Permissions accordées</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {auditLogs?.filter((a) => a.action === "PERMISSION_GRANTED").length || 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Permissions révoquées</CardDescription>
            <CardTitle className="text-3xl text-red-600">
              {auditLogs?.filter((a) => a.action === "PERMISSION_REVOKED").length || 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Rôles modifiés</CardDescription>
            <CardTitle className="text-3xl text-blue-600">
              {auditLogs?.filter((a) => a.action.includes("ROLE")).length || 0}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Audit Logs Table */}
      <AuditLogsTable logs={auditLogs || []} isLoading={isLoading} />
    </div>
  );
}