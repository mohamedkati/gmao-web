// src/features/sites/components/details/site-assets-tab-hierarchical.tsx

"use client";

import { useState } from "react";
import { Site } from "../../../types/site.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Progress } from "@/shared/components/shadcnui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import {
  Wrench,
  Plus,
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronDown,
  Edit,
  Eye,
  MoreVertical,
  TrendingUp,
  Layers,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils/cn";

interface SiteAssetsTabHierarchicalProps {
  site: Site;
}

// Mock data avec hiérarchie parent/enfant
const mockAssetsHierarchy = [
  {
    id: "1",
    reference: "SYS-001",
    name: "Système de Chauffage",
    category: "Chauffage",
    isCommonAsset: true,
    status: "operational",
    healthStatus: "good",
    children: [
      {
        id: "1-1",
        reference: "EQ-001",
        name: "Chaudière principale",
        category: "Chauffage",
        location: "Sous-sol technique",
        status: "operational",
        healthStatus: "good",
        lastMaintenance: "2024-11-15",
        nextMaintenance: "2025-01-15",
        criticalityLevel: "high",
        children: [
          {
            id: "1-1-1",
            reference: "COMP-001",
            name: "Brûleur principal",
            category: "Composant",
            status: "operational",
            healthStatus: "excellent",
            lastMaintenance: "2024-11-15",
            nextMaintenance: "2025-01-15",
            criticalityLevel: "high",
          },
          {
            id: "1-1-2",
            reference: "COMP-002",
            name: "Circulateur 1",
            category: "Composant",
            status: "operational",
            healthStatus: "good",
            lastMaintenance: "2024-11-15",
            nextMaintenance: "2025-01-15",
            criticalityLevel: "medium",
          },
        ],
      },
      {
        id: "1-2",
        reference: "EQ-002",
        name: "Chaudière secondaire",
        category: "Chauffage",
        location: "Sous-sol technique",
        status: "operational",
        healthStatus: "fair",
        lastMaintenance: "2024-10-20",
        nextMaintenance: "2024-12-20",
        criticalityLevel: "medium",
      },
      {
        id: "1-3",
        reference: "EQ-003",
        name: "Réseau de distribution",
        category: "Chauffage",
        location: "Colonne technique",
        status: "operational",
        healthStatus: "good",
        lastMaintenance: "2024-09-10",
        nextMaintenance: "2025-03-10",
        criticalityLevel: "medium",
      },
    ],
  },
  {
    id: "2",
    reference: "SYS-002",
    name: "Système d'Ascenseurs",
    category: "Ascenseurs",
    isCommonAsset: true,
    status: "operational",
    healthStatus: "fair",
    children: [
      {
        id: "2-1",
        reference: "EQ-004",
        name: "Ascenseur A",
        category: "Ascenseurs",
        location: "Cage A",
        status: "operational",
        healthStatus: "fair",
        lastMaintenance: "2024-12-01",
        nextMaintenance: "2025-03-01",
        criticalityLevel: "high",
        children: [
          {
            id: "2-1-1",
            reference: "COMP-003",
            name: "Moteur principal",
            category: "Composant",
            status: "operational",
            healthStatus: "fair",
            lastMaintenance: "2024-12-01",
            nextMaintenance: "2025-03-01",
            criticalityLevel: "high",
          },
          {
            id: "2-1-2",
            reference: "COMP-004",
            name: "Système de sécurité",
            category: "Composant",
            status: "operational",
            healthStatus: "good",
            lastMaintenance: "2024-12-01",
            nextMaintenance: "2025-03-01",
            criticalityLevel: "high",
          },
        ],
      },
      {
        id: "2-2",
        reference: "EQ-005",
        name: "Ascenseur B",
        category: "Ascenseurs",
        location: "Cage B",
        status: "operational",
        healthStatus: "good",
        lastMaintenance: "2024-11-28",
        nextMaintenance: "2025-02-28",
        criticalityLevel: "high",
      },
    ],
  },
  {
    id: "3",
    reference: "SYS-003",
    name: "Système de Ventilation",
    category: "Ventilation",
    isCommonAsset: true,
    status: "maintenance",
    healthStatus: "poor",
    children: [
      {
        id: "3-1",
        reference: "EQ-006",
        name: "VMC principale",
        category: "Ventilation",
        location: "Toiture",
        status: "maintenance",
        healthStatus: "poor",
        lastMaintenance: "2024-10-15",
        nextMaintenance: "2024-12-30",
        criticalityLevel: "medium",
      },
      {
        id: "3-2",
        reference: "EQ-007",
        name: "Extracteurs parkings",
        category: "Ventilation",
        location: "Sous-sol -2",
        status: "operational",
        healthStatus: "good",
        lastMaintenance: "2024-11-05",
        nextMaintenance: "2025-02-05",
        criticalityLevel: "medium",
      },
    ],
  },
  {
    id: "4",
    reference: "EQ-008",
    name: "Porte automatique principale",
    category: "Portes",
    location: "Entrée principale",
    isCommonAsset: true,
    status: "operational",
    healthStatus: "excellent",
    lastMaintenance: "2024-12-10",
    nextMaintenance: "2025-06-10",
    criticalityLevel: "low",
  },
];

export function SiteAssetsTabHierarchical({ site }: SiteAssetsTabHierarchicalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["1", "2", "3"]));
  const [expandAll, setExpandAll] = useState(false);

  // Fonction pour compter tous les assets (y compris enfants)
  const countAllAssets = (assets: any[]): number => {
    return assets.reduce((count, asset) => {
      return count + 1 + (asset.children ? countAllAssets(asset.children) : 0);
    }, 0);
  };

  const totalAssets = countAllAssets(mockAssetsHierarchy);

  // Fonction pour compter par statut
  const countByStatus = (assets: any[], status: string): number => {
    return assets.reduce((count, asset) => {
      const current = asset.status === status ? 1 : 0;
      const children = asset.children ? countByStatus(asset.children, status) : 0;
      return count + current + children;
    }, 0);
  };

  const stats = {
    total: totalAssets,
    operational: countByStatus(mockAssetsHierarchy, "operational"),
    maintenance: countByStatus(mockAssetsHierarchy, "maintenance"),
    critical: 3, // Mock
    healthScore: 78, // Mock
  };

  const categories = ["Chauffage", "Ascenseurs", "Ventilation", "Portes", "Composant"];

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const toggleExpandAll = () => {
    if (expandAll) {
      setExpandedNodes(new Set());
    } else {
      const allIds = new Set<string>();
      const collectIds = (assets: any[]) => {
        assets.forEach((asset) => {
          if (asset.children && asset.children.length > 0) {
            allIds.add(asset.id);
            collectIds(asset.children);
          }
        });
      };
      collectIds(mockAssetsHierarchy);
      setExpandedNodes(allIds);
    }
    setExpandAll(!expandAll);
  };

  return (
    <div className="space-y-6">
      {/* Header avec stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total" value={stats.total} icon={Wrench} color="blue" />
        <StatCard
          label="Opérationnels"
          value={stats.operational}
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          label="En maintenance"
          value={stats.maintenance}
          icon={Clock}
          color="orange"
        />
        <StatCard
          label="Critiques"
          value={stats.critical}
          icon={AlertCircle}
          color="red"
        />
        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Santé globale</p>
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold">{stats.healthScore}%</p>
            <Progress value={stats.healthScore} className="h-2" />
          </div>
        </Card>
      </div>

      {/* Filters & Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Équipements (Vue Hiérarchique)
              </CardTitle>
              <CardDescription>
                Organisation en systèmes et sous-systèmes
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={toggleExpandAll}>
                {expandAll ? (
                  <>
                    <Minimize2 className="mr-2 h-4 w-4" />
                    Tout replier
                  </>
                ) : (
                  <>
                    <Maximize2 className="mr-2 h-4 w-4" />
                    Tout déplier
                  </>
                )}
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, référence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="operational">Opérationnel</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="outofservice">Hors service</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hierarchical Tree */}
          <div className="space-y-2">
            {mockAssetsHierarchy.map((asset) => (
              <AssetTreeNode
                key={asset.id}
                asset={asset}
                level={0}
                expandedNodes={expandedNodes}
                onToggle={toggleNode}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Tree Node Component
function AssetTreeNode({
  asset,
  level,
  expandedNodes,
  onToggle,
}: {
  asset: any;
  level: number;
  expandedNodes: Set<string>;
  onToggle: (nodeId: string) => void;
}) {
  const hasChildren = asset.children && asset.children.length > 0;
  const isExpanded = expandedNodes.has(asset.id);

  const statusConfig = {
    operational: {
      label: "Opérationnel",
      color: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
      icon: CheckCircle2,
    },
    maintenance: {
      label: "Maintenance",
      color: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
      icon: Clock,
    },
    outofservice: {
      label: "Hors service",
      color: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
      icon: AlertCircle,
    },
  };

  const healthConfig = {
    excellent: { label: "Excellent", color: "text-green-600 dark:text-green-400", value: 95 },
    good: { label: "Bon", color: "text-blue-600 dark:text-blue-400", value: 75 },
    fair: { label: "Moyen", color: "text-orange-600 dark:text-orange-400", value: 50 },
    poor: { label: "Mauvais", color: "text-red-600 dark:text-red-400", value: 25 },
  };

  const criticalityConfig = {
    high: {
      label: "Critique",
      color: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
    },
    medium: {
      label: "Moyen",
      color: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
    },
    low: {
      label: "Faible",
      color: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    },
  };

  const status = statusConfig[asset.status as keyof typeof statusConfig];
  const health = asset.healthStatus
    ? healthConfig[asset.healthStatus as keyof typeof healthConfig]
    : null;
  const criticality = asset.criticalityLevel
    ? criticalityConfig[asset.criticalityLevel as keyof typeof criticalityConfig]
    : null;
  const StatusIcon = status.icon;

  // Calculer l'indentation
  const indentSize = level * 24; // 24px par niveau

  return (
    <div>
      {/* Node principal */}
      <div
        className={cn(
          "group relative rounded-lg border transition-all duration-200",
          level === 0 && "bg-gradient-to-br from-card to-card/50 shadow-sm",
          level > 0 && "bg-card/50 hover:bg-card"
        )}
        style={{ marginLeft: `${indentSize}px` }}
      >
        {/* Ligne de connexion verticale */}
        {level > 0 && (
          <div
            className="absolute left-0 top-0 bottom-1/2 w-px bg-border"
            style={{ left: `-${indentSize / 2}px` }}
          />
        )}
        {/* Ligne de connexion horizontale */}
        {level > 0 && (
          <div
            className="absolute top-1/2 left-0 h-px bg-border"
            style={{ left: `-${indentSize / 2}px`, width: `${indentSize / 2}px` }}
          />
        )}

        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Expand/Collapse Button */}
            <div className="shrink-0 pt-1">
              {hasChildren ? (
                <button
                  onClick={() => onToggle(asset.id)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              ) : (
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                </div>
              )}
            </div>

            {/* Icon */}
            <div
              className={cn(
                "p-2 rounded-lg shrink-0",
                level === 0 ? "bg-primary/10" : "bg-muted"
              )}
            >
              <Wrench className={cn("h-4 w-4", level === 0 && "text-primary")} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className={cn("font-semibold truncate", level === 0 && "text-lg")}>
                      {asset.name}
                    </h4>
                    <Badge variant="outline" className={status.color}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {status.label}
                    </Badge>
                    {criticality && (
                      <Badge variant="outline" className={criticality.color}>
                        {criticality.label}
                      </Badge>
                    )}
                    {asset.isCommonAsset && (
                      <Badge variant="secondary">Commun</Badge>
                    )}
                    {hasChildren && (
                      <Badge variant="outline">
                        {asset.children.length} enfant{asset.children.length > 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                    <span className="font-mono">{asset.reference}</span>
                    <span>•</span>
                    <span>{asset.category}</span>
                    {asset.location && (
                      <>
                        <span>•</span>
                        <span>{asset.location}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Voir détails</DropdownMenuItem>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      {level === 0 && hasChildren && (
                        <DropdownMenuItem>Ajouter sous-équipement</DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Health & Maintenance Info */}
              {(health || asset.lastMaintenance) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {health && (
                    <div className="p-2 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">État</span>
                        <span className={cn("text-xs font-semibold", health.color)}>
                          {health.label}
                        </span>
                      </div>
                      <Progress value={health.value} className="h-1.5" />
                    </div>
                  )}
                  {asset.lastMaintenance && (
                    <div className="p-2 rounded-lg bg-muted/30 text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Dernière:</span>
                        <span className="font-medium">
                          {new Date(asset.lastMaintenance).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      {asset.nextMaintenance && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Prochaine:</span>
                          <span className="font-medium">
                            {new Date(asset.nextMaintenance).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mt-2 space-y-2">
          {asset.children.map((child: any) => (
            <AssetTreeNode
              key={child.id}
              asset={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Helper Component (même que précédemment)
function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    green: "from-green-500/10 to-emerald-500/10 border-green-500/20",
    orange: "from-orange-500/10 to-yellow-500/10 border-orange-500/20",
    red: "from-red-500/10 to-rose-500/10 border-red-500/20",
  };

  return (
    <Card className={`p-4 bg-gradient-to-br ${colorMap[color]}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-background/50">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </Card>
  );
}