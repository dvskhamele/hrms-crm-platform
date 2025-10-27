document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeType = document.getElementById('employee-type').value;
    const department = document.getElementById('department').value;
    const checklistDiv = document.getElementById('checklist');

    let checklistItems = [];

    if (employeeType === 'new-hire') {
        checklistItems.push(
            "Complete New Hire Paperwork",
            "Set up IT Accounts and Equipment",
            "Conduct Welcome Meeting with Manager",
            "Provide Company Handbook",
            "Introduce to Team Members",
            "Assign Onboarding Buddy",
            "Schedule Initial Training Sessions"
        );
    } else if (employeeType === 'transfer') {
        checklistItems.push(
            "Update HR Records for Department Change",
            "Set up New IT Access (if required)",
            "Conduct Welcome Meeting with New Manager",
            "Introduce to New Team Members",
            "Provide Department-Specific Information",
            "Schedule Cross-Training (if required)"
        );
    }

    if (department) {
        checklistItems.push(`Department-Specific Orientation for ${department}`);
    }

    if (checklistItems.length === 0) {
        checklistDiv.innerHTML = '<p style="color: red;">Please select an employee type.</p>';
        return;
    }

    let html = `<h2>Onboarding Checklist for ${employeeType === 'new-hire' ? 'New Hire' : 'Internal Transfer'}</h2>`;
    html += '<ul>';
    checklistItems.forEach(item => {
        html += `<li class="checklist-item">${item}</li>`;
    });
    html += '</ul>';

    checklistDiv.innerHTML = html;
});
