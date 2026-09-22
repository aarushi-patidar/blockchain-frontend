"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dynamically load React-Leaflet components (no SSR)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const vellorePosition: [number, number] = [12.9165, 79.1325];

const SwapOrder: React.FC = () => {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Fix default icon paths for Leaflet when using bundlers/Next.js
    try {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    } catch (e) {
      // ignore if L not available yet
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={vellorePosition}
        zoom={14}
        scrollWheelZoom
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={vellorePosition}>
          <Popup>Battery Hub - Vellore</Popup>
        </Marker>
      </MapContainer>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 backdrop-blur-md bg-black/40 border border-cyan-400/30 shadow-xl rounded-2xl px-6 py-4 w-[90%] max-w-md">
        <label className="block text-sm text-gray-300 mb-2 font-semibold">
          Enter Order ID
        </label>
        <input
          type="text"
          placeholder="ORD-XXXX-XXXX"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full bg-black/50 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
        />
      </div>
    </div>
  );
};

export default SwapOrder;
