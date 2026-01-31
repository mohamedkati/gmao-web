// src/shared/components/maps/map-error-boundary.tsx

"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/shadcnui/button";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class MapErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Map error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 border rounded-lg bg-muted/50">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <p className="text-sm text-muted-foreground mb-4">
            Erreur lors du chargement de la carte
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => this.setState({ hasError: false })}
          >
            Réessayer
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}