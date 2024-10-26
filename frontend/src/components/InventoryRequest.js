import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryRequest.css';

function InventoryRequest() {
    const [requests, setRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({ item: '', quantity: '' });
    
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
            setNewRequest({ item: '', quantity: '' });
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
                <input
                    type="text"
                    placeholder="Item"
                    value={newRequest.item}
                    onChange={(e) => setNewRequest({ ...newRequest, item: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })}
                />
                <button type="submit">Request Item</button>
            </form>
            <h3>Current Requests</h3>
            <ul>
                {requests.map(request => (
                    <li key={request.id}>
                        {request.item} - {request.quantity} 
                        <button onClick={() => handleDelete(request.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InventoryRequest;
