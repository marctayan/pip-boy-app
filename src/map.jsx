import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function PipBoyMap() {
  return (
    <div style={{ 
      height: "100%", 
      width: "100%",
      border: '2px solid #1eff7e',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: '#0a0a0a',
    }}>
      <MapContainer 
        center={[38.39914649811561, -121.39578264636745]}
        zoom={15}
        scrollWheelZoom={false} 
        style={{ 
          height: '100%', 
          width: '100%',
        }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[38.39914649811561, -121.39578264636745]}>
          <Popup>
            Location
          </Popup>
        </Marker>
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}

export default PipBoyMap;
