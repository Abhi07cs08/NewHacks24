import React, { useState } from 'react';
import './AlertsPage.css'; // Make sure to create this CSS file

function AlertsPage() {
    const [email, setEmail] = useState('');

    const alerts = [
        { id: 1, message: "Severe storm warning in your area.", date: "2024-10-26" },
        { id: 2, message: "Evacuation orders issued for downtown.", date: "2024-10-25" }
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Handle subscription logic (e.g., send email to server)
        alert(`Subscribed: ${email}`);
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
            <div className="alerts-timeline">
                {alerts.map(alert => (
                    <div key={alert.id} className="alert-item">
                        <p>{alert.message}</p>
                        <small>{alert.date}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlertsPage;
