import React, { useState } from 'react';
import axios from 'axios';
import './InventoryRequest.css';

function InventoryRequest() {
    const [newRequest, setNewRequest] = useState({ item: '', quantity: '', comment: '', address: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const essentialItems = ['Water', 'Food', 'Medical Supplies', 'Blankets', 'Clothing', 'Shelter Kits', 'Sanitation Kits', 'Power Sources'];
    
    // Handle new request form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/requests', newRequest);
            setIsSubmitted(true); // Show success message
            setNewRequest({ item: '', quantity: '', comment: '', address: '' }); // Reset form
        } catch (error) {
            console.error('Error creating request:', error);
        }
    };

    return (
        <div className="inventory-request-container">
            <h2>Request Supplies</h2>
            {isSubmitted ? (
                <p className="success-message">Your request has been submitted successfully!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <select
                        value={newRequest.item}
                        onChange={(e) => setNewRequest({ ...newRequest, item: e.target.value })}
                        required
                    >
                        <option value="">Select Item</option>
                        {essentialItems.map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newRequest.quantity}
                        onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Delivery Address"
                        value={newRequest.address}
                        onChange={(e) => setNewRequest({ ...newRequest, address: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Comments"
                        value={newRequest.comment}
                        onChange={(e) => setNewRequest({ ...newRequest, comment: e.target.value })}
                    />
                    <button type="submit">Request Item</button>
                </form>
            )}
        </div>
    );
}

export default InventoryRequest;
