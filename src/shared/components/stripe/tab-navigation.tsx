// shared/components/stripe/TabNavigation.tsx
import React from "react";
import { cn } from "@/shared/lib/utils/cn";

export interface Tab {
  id: string;
  label: string;
  count?: number;
  countColor?: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-8 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative pb-4 px-2 transition-colors text-sm font-medium",
            activeTab === tab.id
              ? "text-[#635bff] font-semibold"
              : "text-gray-500 hover:text-gray-600"
          )}
        >
          <div className="flex items-center gap-2">
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-bold",
                tab.countColor || "bg-gray-100 text-gray-600"
              )}>
                {tab.count}
              </span>
            )}
          </div>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635bff] rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};