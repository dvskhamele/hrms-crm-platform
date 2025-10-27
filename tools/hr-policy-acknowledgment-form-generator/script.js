document.getElementById('generate-btn').addEventListener('click', () => {
    const policyName = document.getElementById('policy-name').value;
    const employeeName = document.getElementById('employee-name').value;
    const date = document.getElementById('date').value;
    const acknowledgmentFormDiv = document.getElementById('acknowledgment-form');

    if (!policyName || !employeeName || !date) {
        acknowledgmentFormDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const formContent = `
        <h1>Policy Acknowledgment Form</h1>
        <p><strong>Policy Name:</strong> ${policyName}</p>
        <p>I, <strong>${employeeName}</strong>, acknowledge that I have received, read, and understood the ${policyName} of [Company Name]. I agree to abide by the policies and procedures outlined within this document.</p>
        <p>I understand that if I have any questions regarding this policy, I should contact my manager or the Human Resources department.</p>
        <br><br>
        <p>Employee Signature: _________________________</p>
        <p>Date: ${date}</p>
    `;

    acknowledgmentFormDiv.innerHTML = formContent;
});
