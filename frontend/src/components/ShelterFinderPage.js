import React from 'react';
import './ShelterFinderPage.css'; 

function ShelterFinderPage() {
    return (
        <div className="container">
            <h2>Find Nearby Shelters</h2>
            <div className="shelter-details">
                <h3>Shelter 1</h3>
                <p>Address: 123 Main St</p>
                <p>Services: Food, Medical Assistance</p>
                <p>Operating Hours: 24/7</p>
            </div>
            <div className="shelter-details">
                <h3>Shelter 2</h3>
                <p>Address: 456 Elm St</p>
                <p>Services: Temporary Housing</p>
                <p>Operating Hours: 8 AM - 8 PM</p>
            </div>
            <h3>Frequently Asked Questions</h3>
            <ul className="faqs">
                <li>Q: Can I bring my pet to the shelter?</li>
                <li>A: It depends on the shelter's policy. Please check with them directly.</li>
                <li>Q: Are there any age restrictions?</li>
                <li>A: Shelters typically accept people of all ages.</li>
            </ul>
        </div>
    );
}

export default ShelterFinderPage;
