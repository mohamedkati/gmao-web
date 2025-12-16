// shared/components/stripe/StripeAvatar.tsx
import React from "react";
import { cn } from "@/shared/lib/utils/cn";

interface StripeAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-lg",
  lg: "w-16 h-16 text-2xl",
};

export const StripeAvatar: React.FC<StripeAvatarProps> = ({ 
  name, 
  size = "md",
  className 
}) => {
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className={cn(
      sizeClasses[size],
      "bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold",
      className
    )}>
      {getInitials(name)}
    </div>
  );
};