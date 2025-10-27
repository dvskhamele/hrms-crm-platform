document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const employeeId = document.getElementById('employee-id').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const startDate = document.getElementById('start-date').value;
    const contactNumber = document.getElementById('contact-number').value;
    const email = document.getElementById('email').value;
    const employeeFormDiv = document.getElementById('employee-form');

    if (!employeeName || !employeeId || !position || !department || !startDate || !contactNumber || !email) {
        employeeFormDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const formContent = `
        <h2>Employee Information Form</h2>
        <p><strong>Full Name:</strong> ${employeeName}</p>
        <p><strong>Employee ID:</strong> ${employeeId}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Start Date:</strong> ${startDate}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        
        <h3>Emergency Contact Information:</h3>
        <p>Name: _________________________ Relationship: _________________________ Phone: _________________________</p>
        
        <h3>Bank Details for Payroll:</h3>
        <p>Bank Name: _________________________ Account Number: _________________________ Routing Number: _________________________</p>
        
        <h3>Signature:</h3>
        <p>Employee Signature: _________________________ Date: _______________</p>
    `;

    employeeFormDiv.innerHTML = formContent;
});