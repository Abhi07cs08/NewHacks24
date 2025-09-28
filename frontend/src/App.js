// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import MapPage from './components/MapPage';
import InjuryAlertsPage from './components/InjuryAlertsPage';
import PitcherProfilesPage from './components/PitcherProfilesPage';
import FatigueReport from './components/FatigueReport';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/map">Map</Link></li>
                        <li><Link to="/injury-alerts">Injury Alerts</Link></li>
                        <li><Link to="/pitchers">Pitcher Profiles</Link></li>
                        <li><Link to="/fatigue-report">Submit Fatigue Report</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/injury-alerts" element={<InjuryAlertsPage />} />
                    <Route path="/pitchers" element={<PitcherProfilesPage />} />
                    <Route path="/fatigue-report" element={<FatigueReport />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
