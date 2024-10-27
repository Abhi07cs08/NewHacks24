import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryRequest.css';

function InventoryRequest() {
    const [requests, setRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({ item: '', quantity: '', shelter: '', comments: '' });
    const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
    
    // Sample items for dropdown
    const items = [
        { value: 'Food', label: 'Food' },
        { value: 'Water', label: 'Water' },
        { value: 'Clothing', label: 'Clothing' },
        { value: 'Medical Supplies', label: 'Medical Supplies' },
    ];
    
    // Fetch existing requests on mount
    useEffect(() => {
        axios.get('http://localhost:3000/api/requests')
            .then(response => setRequests(response.data))
            .catch(error => console.error('Error fetching requests:', error));
    }, []);
    
    // Handle new request form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/requests', newRequest);
            setRequests([...requests, response.data]);
            setNewRequest({ item: '', quantity: '', shelter: '', comments: '' });
            setIsSubmitted(true); // Set submission status to true
        } catch (error) {
            console.error('Error creating request:', error);
        }
    };

    // Delete request
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/requests/${id}`);
            setRequests(requests.filter(request => request.id !== id));
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    return (
        <div className="inventory-request-container">
            <h2>Request Supplies</h2>
            <form onSubmit={handleSubmit}>
                <select
                    value={newRequest.item}
                    onChange={(e) => setNewRequest({ ...newRequest, item: e.target.value })}
                    required
                >
                    <option value="">Select Item</option>
                    {items.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })}
                    required
                />
                <select
                    value={newRequest.shelter}
                    onChange={(e) => setNewRequest({ ...newRequest, shelter: e.target.value })}
                    required
                >
                    <option value="">Select Shelter</option>
                    <option value="Shelter 1">Shelter 1</option>
                    <option value="Shelter 2">Shelter 2</option>
                    <option value="Shelter 3">Shelter 3</option>
                    <option value="Shelter 4">Shelter 4</option>
                </select>
                <textarea
                    placeholder="Comments"
                    value={newRequest.comments}
                    onChange={(e) => setNewRequest({ ...newRequest, comments: e.target.value })}
                />
                <button type="submit">Request Item</button>
            </form>
            {isSubmitted && (
                <p>Your request has been submitted successfully!</p>
            )}
        </div>
    );
}

export default InventoryRequest;
