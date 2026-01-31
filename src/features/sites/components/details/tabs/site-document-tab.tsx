// src/features/sites/components/details/site-documents-tab.tsx

"use client";

import { useState } from "react";
import { Site } from "../../../types/site.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { Badge } from "@/shared/components/shadcnui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import {
  FileText,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Upload,
  File,
  FileImage,
  FileSpreadsheet,
  MoreVertical,
  Calendar,
  User,
  Folder,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils/cn";

interface SiteDocumentsTabProps {
  site: Site;
}

// Mock data pour les documents
const mockDocuments = [
  {
    id: "1",
    name: "Plan d'architecture.pdf",
    type: "pdf",
    category: "Plans",
    size: "2.4 MB",
    uploadedBy: "Jean Dupont",
    uploadedAt: "2024-12-15",
    expirationDate: null,
  },
  {
    id: "2",
    name: "Contrat de maintenance.pdf",
    type: "pdf",
    category: "Contrats",
    size: "850 KB",
    uploadedBy: "Marie Martin",
    uploadedAt: "2024-12-10",
    expirationDate: "2025-12-10",
  },
  {
    id: "3",
    name: "Photos façade.zip",
    type: "archive",
    category: "Photos",
    size: "15.2 MB",
    uploadedBy: "Pierre Bernard",
    uploadedAt: "2024-11-28",
    expirationDate: null,
  },
  {
    id: "4",
    name: "Certificat énergétique.pdf",
    type: "pdf",
    category: "Certificats",
    size: "1.1 MB",
    uploadedBy: "Sophie Lefebvre",
    uploadedAt: "2024-11-20",
    expirationDate: "2025-11-20",
  },
];

export function SiteDocumentsTab({ site }: SiteDocumentsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      searchQuery === "" ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || doc.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["Plans", "Contrats", "Photos", "Certificats"];

  const stats = {
    total: mockDocuments.length,
    totalSize: "19.5 MB",
    expiringSoon: mockDocuments.filter(
      (doc) =>
        doc.expirationDate &&
        new Date(doc.expirationDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header avec stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-background/50">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Documents</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-background/50">
              <Folder className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalSize}</p>
              <p className="text-xs text-muted-foreground">Espace utilisé</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-background/50">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.expiringSoon}</p>
              <p className="text-xs text-muted-foreground">Expire bientôt</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters & Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                {filteredDocuments.length} document{filteredDocuments.length > 1 ? "s" : ""}
              </CardDescription>
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Uploader
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un document..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
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

          {/* Documents List */}
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <DocumentItem key={doc.id} document={doc} />
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Aucun document trouvé</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Components
function DocumentItem({ document }: { document: any }) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return File;
      case "image":
        return FileImage;
      case "spreadsheet":
        return FileSpreadsheet;
      default:
        return FileText;
    }
  };

  const FileIcon = getFileIcon(document.type);

  const isExpiringSoon =
    document.expirationDate &&
    new Date(document.expirationDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <div className="group flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="p-3 rounded-lg bg-primary/10">
          <FileIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold truncate">{document.name}</p>
            <Badge variant="outline">{document.category}</Badge>
            {isExpiringSoon && (
              <Badge variant="outline" className="bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20">
                Expire bientôt
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{document.size}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{document.uploadedBy}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(document.uploadedAt).toLocaleDateString("fr-FR")}</span>
            </div>
            {document.expirationDate && (
              <>
                <span>•</span>
                <span>Expire: {new Date(document.expirationDate).toLocaleDateString("fr-FR")}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Download className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Aperçu
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Renommer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}