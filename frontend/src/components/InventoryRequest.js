import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryRequest.css';

function FatigueReport() {
    const [reports, setReports] = useState([]);
    const [newReport, setNewReport] = useState({ pitcher: '', fatigueLevel: '', injuryRisk: '', comments: '', dateTime: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Sample pitchers for dropdown
    const pitchers = [
        { value: 'John Doe', label: 'John Doe' },
        { value: 'Mike Smith', label: 'Mike Smith' },
        { value: 'Alex Johnson', label: 'Alex Johnson' },
        { value: 'Chris Lee', label: 'Chris Lee' },
    ];

    // Fetch existing reports on mount
    useEffect(() => {
        axios.get('http://localhost:3000/api/reports')
            .then(response => setReports(response.data))
            .catch(error => console.error('Error fetching reports:', error));
    }, []);

    // Handle new report form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add current date and time
        const currentDateTime = new Date().toLocaleString();
        const reportToSubmit = { ...newReport, dateTime: currentDateTime };

        try {
            const response = await axios.post('http://localhost:3000/api/reports', reportToSubmit);
            setReports([...reports, response.data]);
            setNewReport({ pitcher: '', fatigueLevel: '', injuryRisk: '', comments: '', dateTime: '' });
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error creating report:', error);
        }
    };

    // Delete report
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/reports/${id}`);
            setReports(reports.filter(report => report.id !== id));
        } catch (error) {
            console.error('Error deleting report:', error);
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
