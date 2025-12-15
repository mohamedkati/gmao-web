// src/features/permissions/components/audit-logs-table.tsx

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Badge } from "@/shared/components/shadcnui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PermissionAudit } from "../../types/permission.types";

interface AuditLogsTableProps {
  logs: PermissionAudit[];
  isLoading?: boolean;
}

export function AuditLogsTable({ logs, isLoading }: AuditLogsTableProps) {
  const getActionBadgeVariant = (action: string) => {
    if (action.includes("GRANTED") || action.includes("CREATED")) return "default";
    if (action.includes("REVOKED") || action.includes("DELETED")) return "destructive";
    if (action.includes("UPDATED") || action.includes("ASSIGNED")) return "secondary";
    return "outline";
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      PERMISSION_GRANTED: "Permission accordée",
      PERMISSION_REVOKED: "Permission révoquée",
      PERMISSION_CREATED: "Permission créée",
      PERMISSION_UPDATED: "Permission modifiée",
      PERMISSION_DELETED: "Permission supprimée",
      ROLE_CREATED: "Rôle créé",
      ROLE_UPDATED: "Rôle modifié",
      ROLE_DELETED: "Rôle supprimé",
      ROLE_PERMISSIONS_ASSIGNED: "Permissions assignées au rôle",
      ROLE_PERMISSION_REMOVED: "Permission retirée du rôle",
    };
    return labels[action] || action;
  };

  const columns: ColumnDef<PermissionAudit>[] = [
    {
      accessorKey: "timestamp",
      header: "Date/Heure",
      cell: ({ row }) => (
        <div className="text-sm">
          {format(new Date(row.original.timestamp), "PPP à HH:mm", { locale: fr })}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <Badge variant={getActionBadgeVariant(row.original.action)}>
          {getActionLabel(row.original.action)}
        </Badge>
      ),
    },
    {
      accessorKey: "permissionCode",
      header: "Permission",
      cell: ({ row }) =>
        row.original.permissionCode ? (
          <code className="px-2 py-1 bg-muted rounded text-xs font-mono">
            {row.original.permissionCode}
          </code>
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      accessorKey: "details",
      header: "Détails",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground line-clamp-1">
          {row.original.details}
        </span>
      ),
    },
    {
      accessorKey: "userId",
      header: "Utilisateur",
      cell: ({ row }) => (
        <span className="text-sm font-mono">{row.original.userId.substring(0, 8)}...</span>
      ),
    },
    {
      accessorKey: "ipAddress",
      header: "Adresse IP",
      cell: ({ row }) => (
        <code className="text-xs text-muted-foreground">{row.original.ipAddress}</code>
      ),
    },
  ];

  return <DataTable columns={columns} data={logs} isLoading={isLoading} />;
}