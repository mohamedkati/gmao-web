// src/shared/components/maps/map-view.tsx

"use client";

import { LeafletMapContainer } from "./leaflet-map-container";

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

interface MapViewProps {
  center: GeoCoordinates;
  marker?: GeoCoordinates;
  onMapClick: (lat: number, lng: number) => void;
  disabled?: boolean;
}

export function MapView({ center, marker, onMapClick, disabled }: MapViewProps) {
  return (
    <LeafletMapContainer
      center={[center.latitude, center.longitude]}
      zoom={13}
      marker={marker ? [marker.latitude, marker.longitude] : undefined}
      onMapClick={disabled ? undefined : onMapClick}
    />
  );
}