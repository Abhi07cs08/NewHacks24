import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
    const gtaCenter = [43.6532, -79.3832];
    const zoomLevel = 10;

    return (
        <div className="map-container">
            <MapContainer 
                center={gtaCenter} 
                zoom={zoomLevel} 
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={gtaCenter}>
                    <Popup>
                        Greater Toronto Area (GTA)
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default Map;
