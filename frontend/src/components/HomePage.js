// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Make sure to create this CSS file

function HomePage() {
    return (
        <div className="container">
            <div className="hero">
                <h1>Welcome to the Disaster Relief Platform</h1>
                <p>Connecting people in disaster zones with resources and volunteers who can help.</p>
                <div className="button-spacing"></div> {/* Space added here */}
                <Link to="/shelter" className="cta-button">Get Help Now</Link>
            </div>
            <h2>Featured Resources</h2>
            <div className="resources">
                <div className="resource-card">
                    <h3>Emergency Contacts</h3>
                    <p>Find important emergency contact numbers for your area.</p>
                </div>
                <div className="resource-card">
                    <h3>Hotlines</h3>
                    <p>Access hotlines for mental health support and crisis management.</p>
                </div>
            </div>
            <h2>Emergency Tips</h2>
            <ul className="tips-list">
                <li>Stay calm and assess the situation.</li>
                <li>Follow evacuation routes and alerts.</li>
                <li>Keep an emergency kit ready.</li>
            </ul>
        </div>
    );
}

export default HomePage;
