const submitRequestButton = document.getElementById('submit-request-btn');
const leaveRequestsDiv = document.getElementById('leave-requests');

let leaveRequests = [];

function renderLeaveRequests() {
    if (leaveRequests.length === 0) {
        leaveRequestsDiv.innerHTML = '<p>No leave requests submitted yet.</p>';
        return;
    }

    let html = '<h2>Submitted Leave Requests</h2>';
    leaveRequests.forEach(request => {
        html += `
            <div class="request-item">
                <h3>${request.employeeName} - ${request.leaveType}</h3>
                <p><strong>Dates:</strong> ${request.startDate} to ${request.endDate}</p>
                <p><strong>Status:</strong> Pending</p>
            </div>
        `;
    });
    leaveRequestsDiv.innerHTML = html;
}

submitRequestButton.addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const leaveType = document.getElementById('leave-type').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!employeeName || !leaveType || !startDate || !endDate) {
        alert('Please fill out all fields.');
        return;
    }

    leaveRequests.push({ employeeName, leaveType, startDate, endDate });
    renderLeaveRequests();

    // Clear form fields
    document.getElementById('employee-name').value = '';
    document.getElementById('leave-type').value = 'sick';
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
});

renderLeaveRequests();
