
// 5 thèmes élégants et professionnels pour votre GMAO
// Changez facilement entre les thèmes

export const themes = {
  // 🟢 THÈME 1 : VERT ÉMERAUDE (Actuel)
  emerald: {
    name: "Vert Émeraude",
    description: "Élégant et professionnel",
    colors: {
      // Couleurs principales
      primary: "#10b981", // emerald-500
      primaryDark: "#059669", // emerald-600
      primaryLight: "#34d399", // emerald-400
      
      // Sidebar
      sidebarBg: "#064e3b", // emerald-900
      sidebarHover: "#065f46", // emerald-800
      sidebarActive: "#10b981", // emerald-500
      sidebarText: "#d1fae5", // emerald-100
      
      // Accents
      accent: "#34d399", // emerald-400
      accentHover: "#6ee7b7", // emerald-300
      
      // Status
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    gradient: "from-emerald-600 via-emerald-500 to-teal-500",
    sidebar: "bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900",
  },

  // 🔵 THÈME 2 : BLEU PROFESSIONNEL
  professional: {
    name: "Bleu Professionnel",
    description: "Classique et corporate",
    colors: {
      primary: "#3b82f6", // blue-500
      primaryDark: "#2563eb", // blue-600
      primaryLight: "#60a5fa", // blue-400
      
      sidebarBg: "#1e3a8a", // blue-900
      sidebarHover: "#1e40af", // blue-800
      sidebarActive: "#3b82f6", // blue-500
      sidebarText: "#dbeafe", // blue-100
      
      accent: "#60a5fa", // blue-400
      accentHover: "#93c5fd", // blue-300
      
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    gradient: "from-blue-600 via-blue-500 to-indigo-500",
    sidebar: "bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900",
  },

  // 🟣 THÈME 3 : VIOLET MODERNE
  modern: {
    name: "Violet Moderne",
    description: "Créatif et dynamique",
    colors: {
      primary: "#8b5cf6", // violet-500
      primaryDark: "#7c3aed", // violet-600
      primaryLight: "#a78bfa", // violet-400
      
      sidebarBg: "#4c1d95", // violet-900
      sidebarHover: "#5b21b6", // violet-800
      sidebarActive: "#8b5cf6", // violet-500
      sidebarText: "#ede9fe", // violet-100
      
      accent: "#a78bfa", // violet-400
      accentHover: "#c4b5fd", // violet-300
      
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#8b5cf6",
    },
    gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
    sidebar: "bg-gradient-to-b from-violet-900 via-violet-800 to-purple-900",
  },

  // ⚫ THÈME 4 : ARDOISE ÉLÉGANT
  slate: {
    name: "Ardoise Élégant",
    description: "Sobre et raffiné",
    colors: {
      primary: "#475569", // slate-600
      primaryDark: "#334155", // slate-700
      primaryLight: "#64748b", // slate-500
      
      sidebarBg: "#0f172a", // slate-900
      sidebarHover: "#1e293b", // slate-800
      sidebarActive: "#475569", // slate-600
      sidebarText: "#e2e8f0", // slate-200
      
      accent: "#64748b", // slate-500
      accentHover: "#94a3b8", // slate-400
      
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    gradient: "from-slate-700 via-slate-600 to-gray-600",
    sidebar: "bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900",
  },

  // 🟠 THÈME 5 : ORANGE ÉNERGIQUE
  energetic: {
    name: "Orange Énergique",
    description: "Dynamique et chaleureux",
    colors: {
      primary: "#f97316", // orange-500
      primaryDark: "#ea580c", // orange-600
      primaryLight: "#fb923c", // orange-400
      
      sidebarBg: "#7c2d12", // orange-900
      sidebarHover: "#9a3412", // orange-800
      sidebarActive: "#f97316", // orange-500
      sidebarText: "#ffedd5", // orange-100
      
      accent: "#fb923c", // orange-400
      accentHover: "#fdba74", // orange-300
      
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    gradient: "from-orange-600 via-orange-500 to-amber-500",
    sidebar: "bg-gradient-to-b from-orange-900 via-orange-800 to-red-900",
  },

  // 🔴 THÈME 6 : ROUGE CORPORATE
  corporate: {
    name: "Rouge Corporate",
    description: "Puissant et décisif",
    colors: {
      primary: "#dc2626", // red-600
      primaryDark: "#b91c1c", // red-700
      primaryLight: "#ef4444", // red-500
      
      sidebarBg: "#7f1d1d", // red-900
      sidebarHover: "#991b1b", // red-800
      sidebarActive: "#dc2626", // red-600
      sidebarText: "#fee2e2", // red-100
      
      accent: "#ef4444", // red-500
      accentHover: "#f87171", // red-400
      
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    gradient: "from-red-700 via-red-600 to-rose-600",
    sidebar: "bg-gradient-to-b from-red-900 via-red-800 to-rose-900",
  },

  // 🌊 THÈME 7 : CYAN TECH
  tech: {
    name: "Cyan Tech",
    description: "Technologique et futuriste",
    colors: {
      primary: "#06b6d4", // cyan-500
      primaryDark: "#0891b2", // cyan-600
      primaryLight: "#22d3ee", // cyan-400
      
      sidebarBg: "#164e63", // cyan-900
      sidebarHover: "#155e75", // cyan-800
      sidebarActive: "#06b6d4", // cyan-500
      sidebarText: "#cffafe", // cyan-100
      
      accent: "#22d3ee", // cyan-400
      accentHover: "#67e8f9", // cyan-300
      
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#06b6d4",
    },
    gradient: "from-cyan-600 via-cyan-500 to-teal-500",
    sidebar: "bg-gradient-to-b from-cyan-900 via-cyan-800 to-teal-900",
  },
} as const;

export type ThemeKey = keyof typeof themes;

// ==================================================
// 🎯 HELPER FUNCTIONS
// ==================================================

export const getTheme = (themeKey: ThemeKey) => themes[themeKey];

export const getAllThemes = () => Object.entries(themes);

export const getThemeColors = (themeKey: ThemeKey) => themes[themeKey].colors;
