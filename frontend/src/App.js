import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MapPage from './components/MapPage';
import ShelterFinderPage from './components/ShelterFinderPage';
import AlertsPage from './components/AlertsPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/shelter-finder" element={<ShelterFinderPage />} />
                    <Route path="/alerts" element={<AlertsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
