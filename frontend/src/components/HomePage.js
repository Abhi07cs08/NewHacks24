import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="container">
            <div className="hero">
                <h1>Welcome to the Disaster Relief Platform</h1>
                <p>Connecting people in disaster zones with resources and volunteers who can help.</p>
                <div className="button-spacing"></div>
                <Link to="/shelter" className="cta-button">Get Help Now</Link>
            </div>
            
            <h2>Featured Resources</h2>
            <div className="resources">
                <div className="resource-card">
                    <h3>Emergency Contacts</h3>
                    <p>Find important emergency contact numbers for your area:</p>
                    <ul className="contact-list">
                        <li><strong>911</strong> - Police, Fire, Ambulance (Emergency Only)</li>
                        <li><strong>+1-866-517-0571</strong> - Public Safety Canada (National Emergency Contact)</li>
                        <li><strong>+1-800-668-6868</strong> - Kids Help Phone (Mental Health Support for Youth)</li>
                    </ul>
                </div>
                
                <div className="resource-card">
                    <h3>Hotlines</h3>
                    <p>Access hotlines for mental health support and crisis management:</p>
                    <ul className="contact-list">
                        <li><strong>+1-833-456-4566</strong> - Canada Suicide Prevention Service (24/7 Support)</li>
                        <li><strong>+1-866-585-0445</strong> - Hope for Wellness Help Line (Indigenous Support)</li>
                        <li><strong>211</strong> - Community & Social Services Helpline</li>
                    </ul>
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
