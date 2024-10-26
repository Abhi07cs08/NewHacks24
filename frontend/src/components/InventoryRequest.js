// src/components/InventoryRequest.js
import React, { useState } from 'react';
import './InventoryRequest.css'; 


function InventoryRequest() {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the request submission logic here
        setMessage(`Request for ${quantity} ${item}(s) to be delivered to ${location} has been submitted!`);
        setItem('');
        setQuantity('');
        setLocation('');
    };

    return (
        <div className="inventory-request">
            <h2>Request Inventory Delivery</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Item:
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit Request</button>
            </form>
            {message && <p className="success-message">{message}</p>}
        </div>
    );
}

export default InventoryRequest;
