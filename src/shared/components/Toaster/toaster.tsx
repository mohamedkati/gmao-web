import {useToast} from "@/hooks/use-toast";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Wrench,
  Clock,
  User,
  FileText,
  Calendar,
  Zap,
  X
} from "lucide-react";
import React from "react";

// ==================================================
// 📦 TYPES DE TOAST PERSONNALISÉS POUR GMAO
// ==================================================

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'intervention' | 'maintenance';

interface GMAOToastProps {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ==================================================
// 🎨 STYLES PAR TYPE DE TOAST
// ==================================================

const toastStyles = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    bgGradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    borderColor: "border-l-emerald-500",
    glowColor: "shadow-emerald-500/20"
  },
  error: {
    icon: XCircle,
    iconColor: "text-red-500",
    bgGradient: "from-red-500/10 via-red-500/5 to-transparent",
    borderColor: "border-l-red-500",
    glowColor: "shadow-red-500/20"
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    bgGradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    borderColor: "border-l-amber-500",
    glowColor: "shadow-amber-500/20"
  },
  info: {
    icon: Info,
    iconColor: "text-blue-500",
    bgGradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    borderColor: "border-l-blue-500",
    glowColor: "shadow-blue-500/20"
  },
  intervention: {
    icon: Wrench,
    iconColor: "text-violet-500",
    bgGradient: "from-violet-500/10 via-violet-500/5 to-transparent",
    borderColor: "border-l-violet-500",
    glowColor: "shadow-violet-500/20"
  },
  maintenance: {
    icon: Calendar,
    iconColor: "text-cyan-500",
    bgGradient: "from-cyan-500/10 via-cyan-500/5 to-transparent",
    borderColor: "border-l-cyan-500",
    glowColor: "shadow-cyan-500/20"
  }
};

// ==================================================
// 🪝 HOOK PERSONNALISÉ POUR TOAST GMAO
// ==================================================

export const useGMAOToast = () => {
  const { toast } = useToast();

  const showToast = ({
    title:titre,
    description,
    type = 'info',
    duration = 5000,
    action
  }: GMAOToastProps) => {
    const style = toastStyles[type];
    const Icon = style.icon;

    toast({
      duration,
      className: `
        group
        border-l-4 ${style.borderColor}
        bg-gradient-to-r ${style.bgGradient}
        backdrop-blur-xl
        shadow-xl ${style.glowColor}
        border border-slate-200/50 dark:border-slate-800/50
        rounded-xl
        overflow-hidden
        transition-all duration-300
        hover:scale-[1.02]
        hover:shadow-2xl
      `,
      title: (
        <React.Fragment>
          <div className="flex items-center gap-3">
            <div className={`
            p-2 rounded-lg 
            bg-white/80 dark:bg-slate-900/80 
            ${style.iconColor}
            group-hover:scale-110 transition-transform
          `}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">
              {titre}
            </span>
          </div>
        </React.Fragment>

      ),
      description: description && (
        <div className="ml-14 text-slate-600 dark:text-slate-400 text-sm mt-1">
          {description}
        </div>
      ),
      action: action && (
        <button
          onClick={action.onClick}
          className={`
            ml-14 mt-2 px-4 py-2 rounded-lg
            text-sm font-medium
            ${style.iconColor}
            bg-white/80 dark:bg-slate-900/80
            hover:bg-white dark:hover:bg-slate-800
            transition-colors
            border border-slate-200/50 dark:border-slate-700/50
          `}
        >
          {action.label}
        </button>
      ),
    });
  };

  // Méthodes raccourcies
  return {
    success: (title: string, description?: string, action?: GMAOToastProps['action']) =>
      showToast({ title, description, type: 'success', action }),

    error: (title: string, description?: string, action?: GMAOToastProps['action']) =>
      showToast({ title, description, type: 'error', action }),

    warning: (title: string, description?: string, action?: GMAOToastProps['action']) =>
      showToast({ title, description, type: 'warning', action }),

    info: (title: string, description?: string, action?: GMAOToastProps['action']) =>
      showToast({ title, description, type: 'info', action }),

    intervention: (title: string, description?: string, action?: GMAOToastProps['action']) =>
      showToast({ title, description, type: 'intervention', action }),

    maintenance: (title: string, description?: string, action?: GMAOToastProps['action']) =>
      showToast({ title, description, type: 'maintenance', action }),

    // Toast personnalisé
    custom: showToast
  };
};

// ==================================================
// 🎭 COMPOSANT TOASTER PERSONNALISÉ (Optionnel)
// ==================================================

export const GMAOToaster = () => {
  return (
    <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {/* Les toasts apparaîtront ici via le provider shadcn */}
    </div>
  );
};

// ==================================================
// 📝 EXEMPLES D'UTILISATION
// ==================================================

/*

// 1️⃣ DANS UN COMPOSANT

import { useGMAOToast } from '@/components/toaster/gmao-toaster';

const MyComponent = () => {
  const toast = useGMAOToast();

  const handleSuccess = () => {
    toast.success(
      "Intervention créée",
      "INT-2024-0156 a été créée avec succès",
      {
        label: "Voir l'intervention",
        onClick: () => router.push('/interventions/156')
      }
    );
  };

  const handleError = () => {
    toast.error(
      "Erreur de connexion",
      "Impossible de se connecter au serveur. Réessayez.",
      {
        label: "Réessayer",
        onClick: () => refetch()
      }
    );
  };

  const handleWarning = () => {
    toast.warning(
      "Maintenance programmée",
      "Le système sera en maintenance dans 10 minutes"
    );
  };

  const handleIntervention = () => {
    toast.intervention(
      "Nouvelle intervention",
      "Une intervention urgente a été assignée"
    );
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success Toast</button>
      <button onClick={handleError}>Error Toast</button>
      <button onClick={handleWarning}>Warning Toast</button>
      <button onClick={handleIntervention}>Intervention Toast</button>
    </div>
  );
};

// 2️⃣ DANS UN API CALL

const createIntervention = async () => {
  try {
    const response = await fetch('/api/interventions', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      toast.success(
        "Intervention créée",
        `Intervention ${data.reference} créée avec succès`
      );
    }
  } catch (error) {
    toast.error(
      "Erreur",
      "Impossible de créer l'intervention"
    );
  }
};

// 3️⃣ TOAST AVEC ACTION

toast.warning(
  "Équipement en panne",
  "Le chauffage CHAUF-001 nécessite une intervention",
  {
    label: "Créer intervention",
    onClick: () => createInterventionFromEquipment('CHAUF-001')
  }
);

// 4️⃣ TOAST MAINTENANCE

toast.maintenance(
  "Maintenance programmée",
  "Maintenance préventive prévue demain à 9h00",
  {
    label: "Voir le planning",
    onClick: () => router.push('/planning')
  }
);

// 5️⃣ TOAST PERSONNALISÉ

toast.custom({
  title: "Message personnalisé",
  description: "Description du message",
  type: 'info',
  duration: 8000,
  action: {
    label: "Action",
    onClick: () => console.log('Action clicked')
  }
});

*/

// ==================================================
// 🎨 VARIANTES DE TOAST POUR CAS D'USAGE GMAO
// ==================================================

export const gmaoToastPresets = {
  // Interventions
  interventionCreated: (ref: string) => ({
    title: "Intervention créée",
    description: `${ref} a été créée et assignée`,
    type: 'success' as ToastType
  }),

  interventionCompleted: (ref: string) => ({
    title: "Intervention terminée",
    description: `${ref} a été marquée comme terminée`,
    type: 'success' as ToastType
  }),

  interventionUrgent: (ref: string) => ({
    title: "⚡ Intervention urgente",
    description: `${ref} nécessite une attention immédiate`,
    type: 'warning' as ToastType
  }),

  // Équipements
  equipmentDown: (name: string) => ({
    title: "Équipement en panne",
    description: `${name} est hors service`,
    type: 'error' as ToastType
  }),

  equipmentMaintenance: (name: string, date: string) => ({
    title: "Maintenance programmée",
    description: `${name} - Maintenance le ${date}`,
    type: 'maintenance' as ToastType
  }),

  // Techniciens
  technicianAssigned: (name: string, interventionRef: string) => ({
    title: "Technicien assigné",
    description: `${name} assigné à ${interventionRef}`,
    type: 'info' as ToastType
  }),

  // Général
  saveSuccess: () => ({
    title: "Enregistré",
    description: "Les modifications ont été enregistrées",
    type: 'success' as ToastType
  }),

  saveError: () => ({
    title: "Erreur d'enregistrement",
    description: "Impossible d'enregistrer les modifications",
    type: 'error' as ToastType
  }),

  networkError: () => ({
    title: "Erreur réseau",
    description: "Vérifiez votre connexion internet",
    type: 'error' as ToastType
  })
};

// ==================================================
// 🎯 EXEMPLE D'UTILISATION DES PRESETS
// ==================================================

/*

import { useGMAOToast, gmaoToastPresets } from '@/components/toaster/gmao-toaster';

const MyComponent = () => {
  const toast = useGMAOToast();

  const handleCreateIntervention = async () => {
    try {
      const result = await createIntervention(data);
      
      const preset = gmaoToastPresets.interventionCreated(result.reference);
      toast.success(preset.title, preset.description);
      
    } catch (error) {
      const preset = gmaoToastPresets.saveError();
      toast.error(preset.title, preset.description);
    }
  };
};

*/
