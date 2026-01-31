// src/features/sites/components/details/site-team-tab.tsx

"use client";

import { Site } from "../../../types/site.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Button } from "@/shared/components/shadcnui/button";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import { Separator } from "@/shared/components/shadcnui/separator";
import {
  Users,
  Plus,
  Mail,
  Phone,
  Edit,
  UserPlus,
  Shield,
  Briefcase,
  Wrench,
  UserCheck,
} from "lucide-react";
import { useGetSiteTeamMembers } from "@/features/sites/hooks/sites/use-site-query";
import { LoadingSpinner } from "@/shared/components";
import { GlassCard } from "@/shared/components/cards";

interface SiteTeamTabProps {
  site: Site;
}

export function SiteTeamTab({ site }: SiteTeamTabProps) {

  const { data: teamMembers, isLoading, isFetching } = useGetSiteTeamMembers(site.id); // Custom hook to fetch team members
  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center h-48">
        <LoadingSpinner size="md" className="mr-2" />
        <p className="text-cs text-muted-foreground">Chargement des membres de l'équipe...</p>
      </div>
    );
  }

  if (!teamMembers) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground mb-4">Aucune équipe assignée</p>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Assigner une équipe
          </Button>
        </CardContent>
      </Card>
    );
  }

  let length = 0;
  length = teamMembers.commercial ? length + 1 : length;
  length = teamMembers.operationsManager ? length + 1 : length;
  length = teamMembers.technician1 ? length + 1 : length;
  length = teamMembers.technician2 ? length + 1 : length;
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Équipe du site</CardTitle>
              <CardDescription>
                {length} membre{length > 1 ? "s" : ""} assigné{length > 1 ? "s" : ""}
              </CardDescription>
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un membre
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.commercial && (
          <TeamMemberCard
            member={teamMembers.commercial}
            role="Commercial"
            icon={Briefcase}
            responsibilities={["Gestion des ventes", "Relation client"]}
          />
        )}
        {teamMembers.operationsManager && (
          <TeamMemberCard
            member={teamMembers.operationsManager}
            role="Responsable des opérations"
            icon={Shield}
            responsibilities={["Supervision des opérations", "Coordination des équipes"]}
          />
        )}
        {teamMembers.technician1 && (
          <TeamMemberCard
            member={teamMembers.technician1}
            role="Technicien"
            icon={Wrench}
            responsibilities={["Maintenance", "Dépannage"]}
          />
        )}
        {teamMembers.technician2 && (
          <TeamMemberCard
            member={teamMembers.technician2}
            role="Technicien"
            icon={Wrench}
            responsibilities={["Maintenance", "Dépannage"]}
          />
        )}

      </div>
    </div>
  );
}

// Helper Component
function TeamMemberCard({
  member,
  role,
  icon: Icon,
  responsibilities,
}: {
  member: any;
  role: string;
  icon: any;
  responsibilities: string[];
}) {


  return (
    <GlassCard hoverable >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl" />
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 rounded-xl border-2 border-background">
            <AvatarFallback className="rounded-xl text-lg">
              {member.firstName[0]}
              {member.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate">
              {member.firstName} {member.lastName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{member.email}</span>
            </a>
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{member.phone}</span>
              </a>
            )}
          </div>

          <Separator />

          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Responsabilités
            </p>
            <div className="flex flex-wrap gap-2">
              {responsibilities.map((resp, i) => (
                <Badge key={i} variant="secondary">
                  {resp}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </GlassCard>

  );
}