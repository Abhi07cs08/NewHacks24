import React, { useState } from 'react';
import './AlertsPage.css'; 

function AlertsPage() {
    const [email, setEmail] = useState('');

    const alerts = [
        { id: 1, message: "Severe storm warning in your area.", date: "2024-10-26" },
        { id: 2, message: "Evacuation orders issued for downtown.", date: "2024-10-25" }
    ];

    const affectedAreas = [
        "Downtown",
        "East Side",
        "Riverside",
        "North Valley",
        "South Hill"
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert(`Subscribed: ${email}`);
        setEmail(''); // Clear input after subscription
    };

    return (
        <div className="container">
            <h2>Current Disaster Alerts</h2>
            <form onSubmit={handleSubscribe} className="subscription-form">
                <input 
                    type="email" 
                    placeholder="Subscribe for alerts..." 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Subscribe</button>
            </form>
            <h3>Recent Alerts</h3>
            <div className="marquee">
                <div className="marquee-content">
                    {alerts.map(alert => (
                        <div key={alert.id} className="alert-item">
                            <strong>{alert.message}</strong> <small>{alert.date}</small>
                        </div>
                    ))}
                </div>
            </div>
            <div className="affected-area">
                <h4>Affected Areas</h4>
                <ul>
                    {affectedAreas.map((area, index) => (
                        <li key={index}>{area}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AlertsPage;
