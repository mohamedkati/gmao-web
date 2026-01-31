// src/shared/components/maps/location-picker.tsx

"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { Loader2, MapPin, Navigation } from "lucide-react";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { Label } from "@/shared/components/shadcnui/label";
import { MapErrorBoundary } from "./map-error-boundary";


interface GeoCoordinates {
    latitude: number;
    longitude: number;
}

interface LocationPickerProps {
    value?: GeoCoordinates;
    onChange: (coords: GeoCoordinates) => void;
    address?: string;
    height?: string;
    disabled?: boolean;
}

// Composant MapView avec imports dynamiques
const MapView = dynamic(
    () => import("./map-view").then((mod) => mod.MapView),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center w-full h-full bg-muted">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }
);

export function LocationPicker({
    value,
    onChange,
    address,
    height = "400px",
    disabled = false,
}: LocationPickerProps) {
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Coordonnées par défaut (Paris)
    const defaultCenter: GeoCoordinates = useMemo(() => ({
        latitude: 48.8566,
        longitude: 2.3522,
    }), []);

    const center = value || defaultCenter;

    // Fix pour Leaflet SSR
    useEffect(() => {
        setIsClient(true);
    }, []);


    // Géocoder une adresse
    const geocodeAddress = useCallback(async () => {
        if (!address) return;

        setIsLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    address
                )}&limit=1`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const coords: GeoCoordinates = {
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon),
                };
                onChange(coords);
            }
        } catch (error) {
            console.error("Geocoding error:", error);
        } finally {
            setIsLoading(false);
        }
    }, [address, onChange]);

    // Obtenir position actuelle
    const getCurrentPosition = useCallback(() => {
        if (!navigator.geolocation) {
            alert("La géolocalisation n'est pas supportée par votre navigateur");
            return;
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords: GeoCoordinates = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                onChange(coords);
                setIsLoading(false);
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("Impossible d'obtenir votre position");
                setIsLoading(false);
            }
        );
    }, [onChange]);

    // Handler pour clic sur la carte
    const handleMapClick = useCallback(
        (lat: number, lng: number) => {
            if (disabled) return;
            onChange({ latitude: lat, longitude: lng });
        },
        [disabled, onChange]
    );

    const handleLatitudeChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const lat = parseFloat(e.target.value);
            if (!isNaN(lat) && lat >= -90 && lat <= 90) {
                onChange({
                    latitude: lat,
                    longitude: value?.longitude || 0,
                });
            }
        },
        [onChange, value]
    );

    const handleLongitudeChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const lng = parseFloat(e.target.value);
            if (!isNaN(lng) && lng >= -180 && lng <= 180) {
                onChange({
                    latitude: value?.latitude || 0,
                    longitude: lng,
                });
            }
        },
        [onChange, value]
    );

    if (!isClient) {
        return (
            <div
                className="flex items-center justify-center border rounded-lg bg-muted"
                style={{ height }}
            >
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Contrôles */}
            <div className="flex gap-2">
                {address && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={geocodeAddress}
                        disabled={isLoading || disabled}
                        className="flex-1"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <MapPin className="mr-2 h-4 w-4" />
                        )}
                        Localiser l'adresse
                    </Button>
                )}
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={getCurrentPosition}
                    disabled={isLoading || disabled}
                >
                    <Navigation className="mr-2 h-4 w-4" />
                    Ma position
                </Button>
            </div>

            {/* Inputs manuels */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Latitude</Label>
                    <Input
                        type="number"
                        step="0.000001"
                        value={value?.latitude || ""}
                        onChange={handleLatitudeChange}
                        placeholder="Ex: 48.8566"
                        disabled={disabled}
                        className="font-mono"
                    />
                </div>
                <div>
                    <Label>Longitude</Label>
                    <Input
                        type="number"
                        step="0.000001"
                        value={value?.longitude || ""}
                        onChange={handleLongitudeChange}
                        placeholder="Ex: 2.3522"
                        disabled={disabled}
                        className="font-mono"
                    />
                </div>
            </div>

            {/* Carte */}
            <div
                className="relative rounded-lg overflow-hidden border shadow-sm"
                style={{ height }}
            >
                <MapErrorBoundary>
                    <MapView
                        center={center}
                        marker={value}
                        onMapClick={handleMapClick}
                        disabled={disabled}
                    />
                </MapErrorBoundary>


                {!disabled && (
                    <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border rounded-lg px-3 py-2 text-xs text-muted-foreground shadow-lg z-[1000]">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        Cliquez sur la carte pour définir la position
                    </div>
                )}
            </div>
        </div>
    );
}