document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const lastDay = document.getElementById('last-day').value;
    const exitChecklistDiv = document.getElementById('exit-checklist');

    if (!employeeName || !lastDay) {
        exitChecklistDiv.innerHTML = '<p style="color: red;">Please enter employee name and last day of employment.</p>';
        return;
    }

    const checklistItems = [
        "Conduct Exit Interview",
        "Collect Company Property (laptop, phone, keys, badges)",
        "Revoke System Access (email, internal software, network drives)",
        "Finalize Payroll and Benefits (final paycheck, unused PTO payout)",
        "Provide Information on COBRA, 401k Rollover, and other post-employment benefits.",
        "Remove from Company Directories and Distribution Lists.",
        "Send Farewell Email to Team/Company (if applicable).",
        "Update Employee Records and Files.",
        "Ensure all outstanding tasks are handed over or completed.",
        "Collect Employee Feedback on Departure Process."
    ];

    let html = `
        <h1>Employee Exit Checklist for ${employeeName}</h1>
        <p><strong>Last Day of Employment:</strong> ${lastDay}</p>
        <p>This checklist outlines the necessary steps for a smooth and compliant employee offboarding process.</p>
        
        <h2>Checklist Items:</h2>
        <ul>
    `;
    checklistItems.forEach(item => {
        html += `<li class="checklist-item">[ ] ${item}</li>`;
    });
    html += `
        </ul>
        <h3>Notes/Additional Actions:</h3>
        <textarea rows="4" style="width: 100%;"></textarea>
        <br><br>
        <p>HR Representative Signature: _________________________ Date: _______________</p>
        <p>Manager Signature: _________________________ Date: _______________</p>
    `;

    exitChecklistDiv.innerHTML = html;
});
