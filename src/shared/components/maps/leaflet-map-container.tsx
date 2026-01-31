
"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
// import "leaflet/dist/leaflet.css";

interface LeafletMapContainerProps {
  center: [number, number];
  zoom: number;
  onMapClick?: (lat: number, lng: number) => void;
  marker?: [number, number];
  children?: React.ReactNode;
}

export function LeafletMapContainer({
  center,
  zoom,
  onMapClick,
  marker,
}: LeafletMapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerInstanceRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Vérifier si la carte existe déjà (double montage Strict Mode)
    if (mapInstanceRef.current) {
      return;
    }

    // Créer la carte
    const map = L.map(mapRef.current).setView(center, zoom);

    // Ajouter les tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Gérer les clics
    if (onMapClick) {
      map.on("click", (e: L.LeafletMouseEvent) => {
        onMapClick(e.latlng.lat, e.latlng.lng);
      });
    }

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty deps - ne s'exécute qu'au montage/démontage

  // Mettre à jour le centre
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, mapInstanceRef.current.getZoom());
    }
  }, [center]);

  // Gérer le marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Retirer l'ancien marker
    if (markerInstanceRef.current) {
      markerInstanceRef.current.remove();
      markerInstanceRef.current = null;
    }

    // Ajouter le nouveau marker
    if (marker) {
      const defaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const newMarker = L.marker(marker, { icon: defaultIcon }).addTo(
        mapInstanceRef.current
      );
      newMarker.bindPopup(
        `<div class="text-sm">
          <p class="font-semibold mb-1">Position sélectionnée</p>
          <p class="text-xs">Lat: ${marker[0].toFixed(6)}<br/>Lng: ${marker[1].toFixed(
          6
        )}</p>
        </div>`
      );
      markerInstanceRef.current = newMarker;
    }
  }, [marker]);

  return (
    <div
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg"
    />
  );
}