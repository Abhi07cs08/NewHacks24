async function fetchRequests() {
    try {
        const response = await fetch('http://localhost:5000/api/requests');
        const requests = await response.json();
        populateTable(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

function populateTable(requests) {
    const tableBody = document.getElementById('requestTable');
    tableBody.innerHTML = '';

    requests.forEach((request) => {
        const row = document.createElement('tr');
        row.className = request.completed ? 'completed' : '';

        row.innerHTML = `
            <td>${request.item}</td>
            <td>${request.quantity}</td>
            <td>${request.comments}</td>
            <td>${new Date(request.date).toLocaleDateString()}</td>
            <td>${new Date(request.date).toLocaleTimeString()}</td>
            <td>${request.shelterNo}</td>
            <td>${request.recommendedInventory}</td>
            <td>
                <button onclick="markAsCompleted('${request._id}')" class="status-button">
                    ${request.completed ? 'Completed' : 'Mark as Completed'}
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function markAsCompleted(id) {
    try {
        await fetch(`http://localhost:5000/api/requests/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: true })
        });
        fetchRequests(); // Refresh the table
    } catch (error) {
        console.error('Error updating request status:', error);
    }
}

// Fetch requests on page load
fetchRequests();
