import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function Map() {
    useEffect(() => {
        // Initialize the map
        const map = L.map('map').setView([40.7128, -74.0060], 10);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Fetch disaster data and plot on map
        axios.get('http://127.0.0.1:5000/get_disaster_data')
            .then(response => {
                response.data.features.forEach(feature => {
                    const [lng, lat] = feature.geometry.coordinates;
                    L.marker([lat, lng]).addTo(map)
                        .bindPopup(`Earthquake: Magnitude ${feature.properties.mag}`);
                });
            })
            .catch(error => console.error("Error fetching disaster data:", error));
    }, []);

    return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
}

export default Map;
