import React, { useState } from 'react';
import './AlertsPage.css'; 

function InjuryAlertsPage() {
    const [email, setEmail] = useState('');

    const alerts = [
        { id: 1, message: "Pitcher John Doe showing signs of fatigue. Monitor closely.", date: "2025-09-28" },
        { id: 2, message: "High injury risk detected for Pitcher Mike Smith after last game.", date: "2025-09-27" }
    ];

    const affectedPitchers = [
        "John Doe",
        "Mike Smith",
        "Alex Johnson",
        "Chris Lee",
        "Sam Brown"
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert(`Subscribed: ${email}`);
        setEmail(''); // Clear input after subscription
    };

    return (
        <div className="container">
            <h2>Current Injury & Fatigue Alerts</h2>
            <form onSubmit={handleSubscribe} className="subscription-form">
                <input 
                    type="email" 
                    placeholder="Subscribe for pitcher alerts..." 
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
                <h4>Affected Pitchers</h4>
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
