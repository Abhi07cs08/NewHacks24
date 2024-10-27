import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';

function MapPage() {
    const gtaCenter = [43.6532, -79.3832];
    const zoomLevel = 10;
    const [userLocation, setUserLocation] = useState(null);

    // Shelter data with emojis
    const shelters = [
        { position: [43.65107, -79.347015], name: "Shelter 1 🏠", info: "Emergency shelter with food services." },
        { position: [43.6580, -79.4400], name: "Shelter 2 ⛺️", info: "Temporary housing available." }
    ];

    // Locate Me function
    const locateUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                () => alert('Could not retrieve your location.')
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    // Custom icon for emojis (Shelter and User)
    const createEmojiIcon = (emoji) => {
        return L.divIcon({
            className: '',
            html: `<div style="font-size: 24px">${emoji}</div>`
        });
    };

    return (
        <div className="container">
            <h1>Disaster Relief Map</h1>
            <button onClick={locateUser} className="locate-button">Locate Me</button>
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

                {/* User Location Emoji Marker */}
                {userLocation && (
                    <Marker position={userLocation} icon={createEmojiIcon('📍')}>
                        <Popup>You are here</Popup>
                    </Marker>
                )}

                {/* Shelter Markers with Emojis */}
                {shelters.map(shelter => (
                    <Marker
                        key={shelter.name}
                        position={shelter.position}
                        icon={createEmojiIcon(shelter.name.split(' ')[1])} // extract emoji from shelter name
                    >
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
