import React, { useState } from 'react';
import './ShelterFinderPage.css';

function ShelterFinderPage() {
    // State for toggling FAQ answers
    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    return (
        <div className="container">
            <h2>Find Nearby Shelters</h2>
            <div className="shelter-cards">
                {["A", "B", "C", "D"].map((shelter, index) => (
                    <div className="shelter-details" key={index}>
                        <h3>Shelter {shelter}</h3>
                        <p><strong>Address:</strong> {index * 100 + 123} Main St</p>
                        <p><strong>Services:</strong> {shelter === "A" ? "Food, Medical Assistance" : "Temporary Housing"}</p>
                        <p><strong>Operating Hours:</strong> {shelter === "A" || shelter === "C" ? "24/7" : "8 AM - 8 PM"}</p>
                    </div>
                ))}
            </div>

            <h3>Frequently Asked Questions</h3>
            <ul className="faqs">
                {[
                    { question: "Can I bring my pet to the shelter?", answer: "It depends on the shelter's policy. Please check with them directly." },
                    { question: "Are there any age restrictions?", answer: "Shelters typically accept people of all ages." },
                    { question: "What should I bring with me to the shelter?", answer: "It's recommended to bring essential items like ID, medications, and personal hygiene items." },
                    { question: "Do shelters provide medical assistance?", answer: "Some shelters offer basic medical assistance; check with the shelter for specific services." },
                    { question: "How long can I stay at the shelter?", answer: "Stay duration varies by shelter policy and is generally based on immediate needs and space availability." },
                    { question: "Is there a curfew at the shelter?", answer: "Some shelters may have curfews; please confirm with the shelter staff." },
                ].map((faq, index) => (
                    <li key={index} onClick={() => toggleFAQ(index)} className="faq-item">
                        <strong>Q:</strong> {faq.question}
                        {activeFAQ === index && (
                            <p className="answer"><strong>A:</strong> {faq.answer}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShelterFinderPage;
