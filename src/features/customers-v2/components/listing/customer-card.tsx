"use client";

import { useState } from "react";
import { Card, CardContent } from "@/shared/components/shadcnui/card";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import { Button } from "@/shared/components/shadcnui/button";
import { Checkbox } from "@/shared/components/shadcnui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Badge } from "@/shared/components/shadcnui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Building,
  MoreVertical,
  Eye,
  Edit,
  Trash,
  Archive,
  User,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";
import { CustomerListItem, CustomerType } from "../../types/customer.types";

interface CustomerCardProps {
  customer: CustomerListItem;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onView?: (customer: CustomerListItem) => void;
  onEdit?: (customer: CustomerListItem) => void;
  onDelete?: (customer: CustomerListItem) => void;
  showCheckbox?: boolean;
}

export function CustomerCard({
  customer,
  isSelected = false,
  onSelect,
  onView,
  onEdit,
  onDelete,
  showCheckbox = false,
}: CustomerCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getCustomerTypeLabel = (type: CustomerType) => {
    switch (type) {
      case CustomerType.PropertyManager:
        return "Gestionnaire";
      case CustomerType.Syndic:
        return "Syndic";
      case CustomerType.Corporate:
        return "Entreprise";
      case CustomerType.Individual:
        return "Particulier";
      case CustomerType.Government:
        return "Administration";
      default:
        return "Client";
    }
  };

  const getTypeBadgeClass = (type: CustomerType) => {
    switch (type) {
      case CustomerType.PropertyManager:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      case CustomerType.Syndic:
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20";
      case CustomerType.Corporate:
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case CustomerType.Individual:
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20";
      case CustomerType.Government:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
    }
  };

  return (
    <Card
      className={cn(
        "group relative transition-all duration-200 cursor-pointer",
        "hover:shadow-md hover:-translate-y-0.5",
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onView?.(customer)}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          {showCheckbox && (
            <div
              className="pt-1"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(customer.id);
              }}
            >
              <Checkbox checked={isSelected} />
            </div>
          )}

          {/* Avatar */}
          <Avatar className="h-14 w-14 ring-2 ring-background">
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-semibold text-lg">
              {getInitials(customer.companyName)}
            </AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2.5">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-semibold text-lg truncate">
                    {customer.companyName}
                  </h3>
                  {/* {!customer.active && (
                    <Badge variant="secondary" className="text-xs">
                      Inactif
                    </Badge>
                  )} */}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn("text-xs font-medium", getTypeBadgeClass(customer.type))}>
                    {getCustomerTypeLabel(customer.type)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Réf: {customer.reference}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div
                className={cn(
                  "flex items-center gap-1 transition-opacity duration-200",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onView?.(customer);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(customer);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView?.(customer)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Voir les détails
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(customer)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      Archiver
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete?.(customer)}
                      className="text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {customer.primaryContactEmail && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{customer.primaryContactEmail}</span>
                </div>
              )}
              {customer.primaryContactPhone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{customer.primaryContactPhone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{customer.invoiceCity}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {customer.sitesCount} site{customer.sitesCount > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Property Group */}
            {customer.propertyGroupName && (
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Groupe: <strong className="text-foreground">{customer.propertyGroupName}</strong>
                </span>
              </div>
            )}

            {/* Stats Footer */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  <span>{customer.contactsCount} contact{customer.contactsCount > 1 ? "s" : ""}</span>
                </div>
                {customer.commercialName && (
                  <span>
                    Commercial: <strong className="text-foreground">{customer.commercialName}</strong>
                  </span>
                )}
              </div>
              {customer.totalBudget > 0 && (
                <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {customer.totalBudget.toLocaleString()}€
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}