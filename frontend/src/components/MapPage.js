import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css'; // Make sure to create this CSS file

function MapPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const gtaCenter = [43.6532, -79.3832];
    const zoomLevel = 10;

    const shelters = [
        { position: [43.65107, -79.347015], name: "Shelter 1", info: "Emergency shelter with food services." },
        { position: [43.6580, -79.4400], name: "Shelter 2", info: "Temporary housing available." }
    ];

    return (
        <div className="container">
            <h1>Disaster Relief Map</h1>
            <input 
                type="text" 
                placeholder="Search for a shelter..." 
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
                {shelters.map(shelter => (
                    <Marker key={shelter.name} position={shelter.position}>
                        <Popup>
                            <strong>{shelter.name}</strong><br />
                            {shelter.info}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapPage;
