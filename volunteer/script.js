const apiUrl = 'http://localhost:5000/api/requests'; // Update with your backend API URL

// Fetch all requests from the backend
async function fetchRequests() {
    try {
        const response = await fetch(apiUrl);
        const requests = await response.json();
        populateTable(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

// Populate the table with request data
function populateTable(requests) {
    const tableBody = document.getElementById('requestTable');
    tableBody.innerHTML = ''; // Clear existing table rows

    requests.forEach((request) => {
        const row = document.createElement('tr');
        row.className = request.completed ? 'completed' : '';

        // Create the table row with request data
        row.innerHTML = `
            <td>${new Date(request.date || Date.now()).toLocaleDateString()}</td>
            <td>${new Date(request.date || Date.now()).toLocaleTimeString()}</td>
            <td>${request.item}</td>
            <td>${request.quantity}</td>
            <td>${request.comments || 'N/A'}</td>
            <td>${request.shelter || 'N/A'}</td>
            <td>${request.completed ? 'Completed' : 'Pending'}</td>
            <td>${request.recommendedInventory || 'N/A'}</td>
            <td>
                <button onclick="markAsCompleted('${request._id}')" class="status-button">
                    ${request.completed ? 'Completed' : 'Mark as Completed'}
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Mark a request as completed
async function markAsCompleted(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: true })
        });

        if (response.ok) {
            console.log(`Request ${id} marked as completed`);
            fetchRequests(); // Refresh the table
        } else {
            console.error('Failed to mark request as completed');
        }
    } catch (error) {
        console.error('Error updating request status:', error);
    }
}

// Delete all completed requests
async function deleteCompletedRequests() {
    try {
        const response = await fetch(`${apiUrl}/completed`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Completed requests deleted');
            fetchRequests(); // Refresh the table
        } else {
            console.error('Failed to delete completed requests');
        }
    } catch (error) {
        console.error('Error deleting completed requests:', error);
    }
}

// Fetch requests on page load
fetchRequests();
