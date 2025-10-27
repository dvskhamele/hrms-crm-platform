const addAcknowledgmentButton = document.getElementById('add-acknowledgment-btn');
const acknowledgmentListDiv = document.getElementById('acknowledgment-list');

let acknowledgments = [];

function renderAcknowledgmentList() {
    if (acknowledgments.length === 0) {
        acknowledgmentListDiv.innerHTML = '<p>No policy acknowledgments added yet.</p>';
        return;
    }

    let html = '<h2>Policy Acknowledgments</h2>';
    acknowledgments.forEach(ack => {
        html += `
            <div class="acknowledgment-item">
                <h3>${ack.policyName} by ${ack.employeeName}</h3>
                <p><strong>Acknowledgment Date:</strong> ${ack.acknowledgmentDate}</p>
            </div>
        `;
    });
    acknowledgmentListDiv.innerHTML = html;
}

addAcknowledgmentButton.addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const policyName = document.getElementById('policy-name').value;
    const acknowledgmentDate = document.getElementById('acknowledgment-date').value;

    if (!employeeName || !policyName || !acknowledgmentDate) {
        alert('Please fill out all fields.');
        return;
    }

    acknowledgments.push({ employeeName, policyName, acknowledgmentDate });
    renderAcknowledgmentList();

    // Clear form fields
    document.getElementById('employee-name').value = '';
    document.getElementById('policy-name').value = '';
    document.getElementById('acknowledgment-date').value = '';
});

renderAcknowledgmentList();
