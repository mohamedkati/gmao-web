// src/shared/components/maps/cluster-map.tsx

"use client";

import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet.markercluster/dist/MarkerCluster.css";
// import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

// Fix icons Leaflet
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom icons par type de site
const createSiteIcon = (type: string, color: string) => {
  const svgIcon = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.5 12.5 28.5S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z" fill="${color}"/>
      <circle cx="12.5" cy="12.5" r="7" fill="white"/>
      <text x="12.5" y="16" font-size="12" text-anchor="middle" fill="${color}">${type[0]}</text>
    </svg>
  `;
  
  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

export interface MapMarker {
  id: string;
  position: [number, number];
  title: string;
  type: string;
  typeLabel: string;
  reference: string;
  city: string;
  address: string;
  unitsCount?: number;
  totalArea?: number;
  customerName: string;
  commercialName?: string;
  popupContent?: string;
  onMarkerClick?: (id: string) => void;
}

interface ClusterMapProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  onMarkerClick?: (markerId: string) => void;
}

// Couleurs par type de site
const siteTypeColors: Record<string, string> = {
  "1": "#3b82f6",  // Résidentiel - Blue
  "2": "#f97316",  // Commercial - Orange
  "3": "#a855f7",  // Mixte - Purple
  "4": "#6b7280",  // Industriel - Gray
  "5": "#10b981",  // Bureau - Green
  "6": "#ef4444",  // Entrepôt - Red
  "7": "#f59e0b",  // Magasin - Amber
  "8": "#ec4899",  // Hôtel - Pink
  "9": "#06b6d4",  // Hôpital - Cyan
  "10": "#8b5cf6", // École - Violet
  "11": "#14b8a6", // Gouvernement - Teal
};

export function ClusterMap({
  markers,
  center = [48.8566, 2.3522], // Paris par défaut
  zoom = 6,
  height = "600px",
  onMarkerClick,
}: ClusterMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerClusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

  // Calculer le centre automatiquement si des markers existent
  const calculatedCenter = useMemo(() => {
    if (markers.length === 0) return center;
    
    const bounds = L.latLngBounds(markers.map((m) => m.position));
    return bounds.getCenter();
  }, [markers, center]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Vérifier si la carte existe déjà
    if (mapInstanceRef.current) {
      return;
    }

    // Créer la carte
    const map = L.map(mapRef.current).setView(calculatedCenter, zoom);

    // Ajouter les tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [calculatedCenter, zoom]);

  // Gérer les markers avec clustering
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Supprimer l'ancien cluster group
    if (markerClusterGroupRef.current) {
      mapInstanceRef.current.removeLayer(markerClusterGroupRef.current);
    }

    // Créer un nouveau cluster group
    const markerClusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 80,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        let size = 'small';
        let c = 'marker-cluster-';
        
        if (count < 10) {
          size = 'small';
        } else if (count < 100) {
          size = 'medium';
        } else {
          size = 'large';
        }
        
        return L.divIcon({
          html: `<div><span>${count}</span></div>`,
          className: `marker-cluster ${c}${size}`,
          iconSize: L.point(40, 40),
        });
      },
    });

    // Ajouter les markers
    markers.forEach((marker) => {
      const icon = createSiteIcon(
        marker.typeLabel,
        siteTypeColors[marker.type] || "#3b82f6"
      );

      const leafletMarker = L.marker(marker.position, { icon });

      // Popup personnalisé
      const popupContent = `
        <div class="site-popup" style="min-width: 280px;">
          <div style="border-bottom: 2px solid ${siteTypeColors[marker.type] || "#3b82f6"}; padding-bottom: 8px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-size: 20px;">🏢</span>
              <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${marker.title}</h3>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span style="background: ${siteTypeColors[marker.type] || "#3b82f6"}20; color: ${siteTypeColors[marker.type] || "#3b82f6"}; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 500;">
                ${marker.typeLabel}
              </span>
              <span style="color: #6b7280; font-size: 12px; font-family: monospace;">${marker.reference}</span>
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #4b5563;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span>📍</span>
              <span>${marker.address}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span>🏙️</span>
              <span>${marker.city}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span>🏢</span>
              <span>${marker.customerName}</span>
            </div>
            ${marker.commercialName ? `
              <div style="display: flex; align-items: center; gap: 6px;">
                <span>👤</span>
                <span>${marker.commercialName}</span>
              </div>
            ` : ''}
          </div>
          
          ${marker.unitsCount || marker.totalArea ? `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
              ${marker.unitsCount ? `
                <div style="text-align: center;">
                  <div style="font-size: 18px; font-weight: 600; color: ${siteTypeColors[marker.type] || "#3b82f6"};">
                    ${marker.unitsCount}
                  </div>
                  <div style="font-size: 11px; color: #9ca3af;">Units</div>
                </div>
              ` : ''}
              ${marker.totalArea ? `
                <div style="text-align: center;">
                  <div style="font-size: 18px; font-weight: 600; color: ${siteTypeColors[marker.type] || "#3b82f6"};">
                    ${marker.totalArea.toLocaleString()}
                  </div>
                  <div style="font-size: 11px; color: #9ca3af;">m²</div>
                </div>
              ` : ''}
            </div>
          ` : ''}
          
          <button 
            onclick="window.dispatchEvent(new CustomEvent('site-marker-click', { detail: '${marker.id}' }))"
            style="
              width: 100%;
              margin-top: 12px;
              padding: 8px 16px;
              background: ${siteTypeColors[marker.type] || "#3b82f6"};
              color: white;
              border: none;
              border-radius: 6px;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s;
            "
            onmouseover="this.style.opacity='0.9'"
            onmouseout="this.style.opacity='1'"
          >
            👁️ Voir les détails
          </button>
        </div>
      `;

      leafletMarker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup',
      });

      markerClusterGroup.addLayer(leafletMarker);
    });

    // Ajouter le cluster group à la carte
    mapInstanceRef.current.addLayer(markerClusterGroup);
    markerClusterGroupRef.current = markerClusterGroup;

    // Ajuster la vue pour voir tous les markers
    if (markers.length > 0) {
      const group = L.featureGroup(
        markers.map((m) => L.marker(m.position))
      );
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1), {
        maxZoom: 15,
      });
    }
  }, [markers]);

  // Écouter les clics sur les markers
  useEffect(() => {
    const handleMarkerClick = (event: any) => {
      const siteId = event.detail;
      if (onMarkerClick) {
        onMarkerClick(siteId);
      }
    };

    window.addEventListener('site-marker-click', handleMarkerClick);

    return () => {
      window.removeEventListener('site-marker-click', handleMarkerClick);
    };
  }, [onMarkerClick]);

  return (
    <div
      ref={mapRef}
      style={{ height, width: "100%" }}
      className="rounded-lg border shadow-sm"
    />
  );
}