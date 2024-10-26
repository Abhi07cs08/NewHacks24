import React from 'react';
import Alerts from './Alerts'; // This should match the relative path to your Alerts.js file

function AlertsPage() {
    return (
        <div>
            <h2>Current Disaster Alerts</h2>
            <Alerts />
        </div>
    );
}

export default AlertsPage;
