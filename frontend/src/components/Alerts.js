import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Alerts() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/get_disaster_data')
            .then(response => setAlerts(response.data.features))
            .catch(error => console.error("Error fetching alerts:", error));
    }, []);

    return (
        <div>
            <h2>Current Disaster Alerts</h2>
            <ul>
                {alerts.map((alert, index) => (
                    <li key={index}>
                        Earthquake of magnitude {alert.properties.mag} at coordinates [{alert.geometry.coordinates[1]}, {alert.geometry.coordinates[0]}]
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Alerts;
