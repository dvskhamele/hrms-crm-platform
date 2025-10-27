document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const enrollmentDate = document.getElementById('enrollment-date').value;
    const enrollmentChecklistDiv = document.getElementById('enrollment-checklist');

    if (!employeeName || !enrollmentDate) {
        enrollmentChecklistDiv.innerHTML = '<p style="color: red;">Please enter employee name and enrollment date.</p>';
        return;
    }

    const checklistItems = [
        "Review available health insurance plans (Medical, Dental, Vision).",
        "Select preferred health insurance plan and complete enrollment forms.",
        "Review and enroll in retirement savings plans (e.g., 401k, 403b).",
        "Understand and elect life insurance and disability coverage options.",
        "Review and enroll in any flexible spending accounts (FSA) or health savings accounts (HSA).",
        "Familiarize yourself with paid time off (PTO) policies and accrual rates.",
        "Review any additional voluntary benefits (e.g., pet insurance, legal services).",
        "Confirm beneficiaries for all applicable plans.",
        "Submit all completed enrollment forms by the deadline.",
        "Keep copies of all enrollment confirmations for your records."
    ];

    let html = `
        <h1>Employee Benefits Enrollment Checklist for ${employeeName}</h1>
        <p><strong>Enrollment Date:</strong> ${enrollmentDate}</p>
        <p>This checklist will guide you through the process of enrolling in your employee benefits.</p>
        
        <h2>Checklist Items:</h2>
        <ul>
    `;
    checklistItems.forEach(item => {
        html += `<li class="checklist-item">[ ] ${item}</li>`;
    });
    html += `
        </ul>
        <h3>Notes/Questions:</h3>
        <textarea rows="4" style="width: 100%;"></textarea>
        <br><br>
        <p>Employee Signature: _________________________ Date: _______________</p>
        <p>HR Representative: _________________________ Date: _______________</p>
    `;

    enrollmentChecklistDiv.innerHTML = html;
});