
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-form-btn');
    const formOutput = document.getElementById('form-output');
    const formContent = document.getElementById('form-content');
    const copyBtn = document.getElementById('copy-form-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const managerName = document.getElementById('manager-name').value || '[Manager Name]';
        const actionDate = document.getElementById('action-date').value || new Date().toLocaleDateString();
        const incidentDetails = document.getElementById('incident-details').value || '[Describe the specific incident or performance issue, including dates, times, and any relevant witnesses or evidence.]';
        const policyViolation = document.getElementById('policy-violation').value;
        const correctiveAction = document.getElementById('corrective-action').value || '[Specify the disciplinary action taken, e.g., verbal warning, written warning, suspension, final warning.]';
        const expectations = document.getElementById('expectations').value || '[Clearly state the expected improvements in performance or conduct, including specific, measurable goals and a timeline for review.]';

        let policyViolationSection = '';
        if (policyViolation) {
            policyViolationSection = `
            <h3>3. Company Policy Violated (if applicable)</h3>
            <p>${policyViolation}</p>
            `;
        }

        formContent.innerHTML = `
            <h2>Disciplinary Action Form - ${companyName}</h2>
            <p><strong>Date of Action:</strong> ${actionDate}</p>

            <h3>1. Employee Information</h3>
            <p><strong>Employee Name:</strong> ${employeeName}</p>
            <p><strong>Manager Name:</strong> ${managerName}</p>

            <h3>2. Details of Incident/Performance Issue</h3>
            <p>${incidentDetails}</p>

            ${policyViolationSection}

            <h3>4. Corrective Action Taken</h3>
            <p>${correctiveAction}</p>

            <h3>5. Expectations for Improvement</h3>
            <p>${expectations}</p>

            <h3>6. Consequences of Failure to Improve</h3>
            <p>Failure to meet the expectations outlined in this form within the specified timeframe may result in further disciplinary action, up to and including termination of employment.</p>

            <h3>7. Employee Acknowledgment</h3>
            <p>I acknowledge that I have read and understand the contents of this Disciplinary Action Form. I understand the performance/conduct issues, the corrective action being taken, and the expectations for improvement.</p>
            <p>_________________________<br>Employee Signature & Date</p>

            <h3>8. Manager Acknowledgment</h3>
            <p>_________________________<br>Manager Signature & Date</p>
        `;

        formOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(formContent);
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand('copy');
        window.getSelection().removeAllRanges();// to deselect

        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Document';
        }, 2000);
    });
});
