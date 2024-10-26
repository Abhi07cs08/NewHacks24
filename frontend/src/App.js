// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import MapPage from './components/MapPage';
import AlertsPage from './components/AlertsPage';
import ShelterFinderPage from './components/ShelterFinderPage';
import InventoryRequest from './components/InventoryRequest'; // Updated import

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/map">Map</Link></li>
                        <li><Link to="/alerts">Alerts</Link></li>
                        <li><Link to="/shelter">Shelter Finder</Link></li>
                        <li><Link to="/inventory-request">Request Inventory Delivery</Link></li> {/* Updated link */}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/alerts" element={<AlertsPage />} />
                    <Route path="/shelter" element={<ShelterFinderPage />} />
                    <Route path="/inventory-request" element={<InventoryRequest />} /> {/* Updated route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
