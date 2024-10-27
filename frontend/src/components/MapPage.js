import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css'; 
import L from 'leaflet'; // For custom marker icons

// Custom icons for Shelters and Inventories
const shelterIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854866.png',
    iconSize: [32, 32], // Adjust the size as needed
});

const inventoryIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3103/3103446.png',
    iconSize: [32, 32], // Adjust the size as needed
});

function MapPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const gtaCenter = [43.6532, -79.3832]; // Centered on Toronto
    const zoomLevel = 10;

    const locations = [
        // Shelters
        { position: [43.65107, -79.347015], name: "Shelter 1", type: "Shelter", info: "Emergency shelter with food services." },
        { position: [43.6580, -79.4400], name: "Shelter 2", type: "Shelter", info: "Temporary housing available." },
        { position: [43.7096, -79.3998], name: "Shelter 3", type: "Shelter", info: "Open 24/7 with healthcare services." },
        { position: [43.6346, -79.5441], name: "Shelter 4", type: "Shelter", info: "Shelter for families with children." },

        // Inventories
        { position: [43.6456, -79.3804], name: "Inventory 1", type: "Inventory", info: "Food and water stockpile." },
        { position: [43.6942, -79.2594], name: "Inventory 2", type: "Inventory", info: "Medical supplies inventory." },
        { position: [43.7560, -79.5083], name: "Inventory 3", type: "Inventory", info: "Emergency equipment storage." },
        { position: [43.7050, -79.3168], name: "Inventory 4", type: "Inventory", info: "Blankets and winter clothing." }
    ];

    return (
        <div className="container">
            <h1>Disaster Relief Map</h1>
            <input 
                type="text" 
                placeholder="Search for a location..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <MapContainer 
                center={gtaCenter} 
                zoom={zoomLevel} 
                scrollWheelZoom={true} 
                style={{ height: '80vh', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map(location => (
                    <Marker 
                        key={location.name} 
                        position={location.position} 
                        icon={location.type === "Shelter" ? shelterIcon : inventoryIcon}
                    >
                        <Popup>
                            <strong>{location.name}</strong><br />
                            {location.info}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapPage;
