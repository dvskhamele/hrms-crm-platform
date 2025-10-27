
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-policy-btn');
    const policyOutput = document.getElementById('policy-output');
    const policyContent = document.getElementById('policy-content');
    const copyBtn = document.getElementById('copy-policy-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const policyDate = document.getElementById('policy-date').value || new Date().toLocaleDateString();
        const eligibility = document.getElementById('eligibility').value || 'All employees whose roles can be performed remotely, subject to manager approval.';
        const communicationTools = document.getElementById('communication-tools').value || 'Slack, Google Meet, Email, Project Management Software';
        const expectations = document.getElementById('expectations').value || 'Remote employees are expected to maintain the same level of productivity and availability during core business hours as in-office employees. Regular check-ins and communication are essential.';
        const equipment = document.getElementById('equipment').value || 'The company will provide essential equipment such as a laptop. Employees are responsible for maintaining a suitable home workspace, reliable internet connection, and necessary utilities.';

        policyContent.innerHTML = `
            <h2>Remote Work Policy for ${companyName}</h2>
            <p><strong>Effective Date:</strong> ${policyDate}</p>

            <h3>1. Purpose</h3>
            <p>This policy outlines the guidelines and expectations for employees who work remotely for ${companyName}. It aims to ensure productivity, maintain communication, and support a healthy work-life balance for our remote workforce.</p>

            <h3>2. Eligibility</h3>
            <p>${eligibility}</p>

            <h3>3. Remote Work Arrangement</h3>
            <ul>
                <li>Remote work arrangements are subject to management approval and may be reviewed periodically.</li>
                <li>Employees are expected to adhere to all company policies and procedures, regardless of their work location.</li>
            </ul>

            <h3>4. Performance and Availability Expectations</h3>
            <p>${expectations}</p>

            <h3>5. Communication</h3>
            <p>Remote employees are expected to maintain regular communication with their managers and teams using designated tools such as ${communicationTools}.</p>

            <h3>6. Equipment and Workspace</h3>
            <p>${equipment}</p>

            <h3>7. Data Security and Confidentiality</h3>
            <p>Remote employees must ensure the security and confidentiality of company data and information, adhering to all data protection policies.</p>

            <h3>8. Policy Review</h3>
            <p>This policy will be reviewed periodically and may be updated as needed to reflect changes in business needs or best practices.</p>

            <h3>Acknowledgement</h3>
            <p>I have read, understood, and agree to abide by the terms and conditions outlined in this Remote Work Policy.</p>
            <p>_________________________<br>Employee Signature & Date</p>
            <p>_________________________<br>Manager Signature & Date</p>
        `;

        policyOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(policyContent);
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
