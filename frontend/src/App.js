import React from 'react';
import Map from './components/Map';
import ShelterFinder from './components/ShelterFinder';
import Alerts from './components/Alerts';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Disaster Relief Platform</h1>
            <ShelterFinder />
            <Alerts />
            <Map />
        </div>
    );
}

export default App;
