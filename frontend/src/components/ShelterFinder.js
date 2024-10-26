import React from 'react';
import axios from 'axios';

function ShelterFinder() {
    const findShelters = () => {
        const userLocation = { lat: 40.7128, lng: -74.0060 };

        axios.post('http://127.0.0.1:5000/shelter_finder', { location: userLocation })
            .then(response => {
                response.data.forEach(shelter => {
                    console.log(`Shelter found: ${shelter.name} at ${shelter.lat}, ${shelter.lng}`);
                });
            })
            .catch(error => console.error("Error finding shelters:", error));
    };

    return (
        <button onClick={findShelters}>Find Nearby Shelters</button>
    );
}

export default ShelterFinder;
