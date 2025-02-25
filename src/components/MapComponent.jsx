import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";

const MapComponent = () => {
  const location = useLocation();
  const bus = location.state?.bus || { lat: 23.2599, lng: 77.4126, busNumber: "Unknown", eta: "N/A" };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-900 text-white">
      <h2 className="text-2xl font-bold text-yellow-400 my-4">Bus {bus.busNumber} Location</h2>
      <MapContainer center={[bus.lat, bus.lng]} zoom={14} className="w-full h-[500px]">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[bus.lat, bus.lng]}>
          <Popup>
            <strong>Bus {bus.busNumber}</strong>
            <p>ETA: {bus.eta}</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
