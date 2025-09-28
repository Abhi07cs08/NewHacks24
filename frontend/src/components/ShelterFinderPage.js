import React, { useState } from 'react';
import './ShelterFinderPage.css';

function PitcherProfilesPage() {
    // State for toggling FAQ answers
    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    // Example pitcher data
    const pitchers = [
        { name: "John Doe", team: "Eagles", fatigue: "High", injuryRisk: "Elevated", stats: "7 IP, 110 pitches" },
        { name: "Mike Smith", team: "Falcons", fatigue: "Moderate", injuryRisk: "Low", stats: "5 IP, 80 pitches" },
        { name: "Alex Johnson", team: "Bears", fatigue: "Low", injuryRisk: "Minimal", stats: "6 IP, 70 pitches" },
        { name: "Chris Lee", team: "Wolves", fatigue: "High", injuryRisk: "High", stats: "8 IP, 120 pitches" },
    ];

    return (
        <div className="container">
            <h2>Pitcher Profiles</h2>
            <div className="pitcher-cards">
                {pitchers.map((pitcher, index) => (
                    <div className="pitcher-details" key={index}>
                        <h3>{pitcher.name} ({pitcher.team})</h3>
                        <p><strong>Fatigue:</strong> {pitcher.fatigue}</p>
                        <p><strong>Injury Risk:</strong> {pitcher.injuryRisk}</p>
                        <p><strong>Recent Stats:</strong> {pitcher.stats}</p>
                    </div>
                ))}
            </div>

            <h3>Pitcher Fatigue & Injury FAQs</h3>
            <ul className="faqs">
                {[
                    { question: "How do I know if a pitcher is fatigued?", answer: "Look for decreased velocity, loss of control, and changes in mechanics." },
                    { question: "What increases injury risk?", answer: "High pitch counts, short rest, and poor mechanics are major factors." },
                    { question: "How can I reduce injury risk?", answer: "Monitor pitch counts, ensure proper rest, and use good warm-up routines." },
                    { question: "Should I pull a pitcher with high fatigue?", answer: "Yes, to prevent injury, consider removing pitchers showing high fatigue." },
                    { question: "Are there warning signs for arm injuries?", answer: "Yes, pain, swelling, or loss of velocity/control are warning signs." },
                    { question: "How often should pitchers rest?", answer: "Rest needs vary, but generally 3-4 days between starts is recommended." },
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

export default PitcherProfilesPage;
