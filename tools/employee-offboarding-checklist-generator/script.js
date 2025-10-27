document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const lastDay = document.getElementById('last-day').value;
    const checklistDiv = document.getElementById('checklist');

    if (!employeeName || !lastDay) {
        checklistDiv.innerHTML = '<p style="color: red;">Please enter employee name and last day of employment.</p>';
        return;
    }

    const checklistItems = [
        "Conduct Exit Interview",
        "Collect Company Property (laptop, phone, badges)",
        "Revoke System Access (email, internal tools)",
        "Finalize Payroll and Benefits",
        "Provide Information on COBRA and 401k Rollover",
        "Remove from Company Directories and Distribution Lists",
        "Send Farewell Email to Team"
    ];

    let html = `<h2>Offboarding Checklist for ${employeeName} (Last Day: ${lastDay})</h2>`;
    html += '<ul>';
    checklistItems.forEach(item => {
        html += `<li class="checklist-item">${item}</li>`;
    });
    html += '</ul>';

    checklistDiv.innerHTML = html;
});
