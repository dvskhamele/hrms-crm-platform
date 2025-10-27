document.getElementById('generate-btn').addEventListener('click', () => {
    const policyType = document.getElementById('policy-type').value;
    const policyContentDiv = document.getElementById('policy-content');
    let policyText = '';

    switch (policyType) {
        case 'remote-work':
            policyText = `
                <h2>Remote Work Policy</h2>
                <p><strong>Purpose:</strong> This policy outlines the guidelines and expectations for employees working remotely.</p>
                <p><strong>Scope:</strong> This policy applies to all eligible employees who wish to work remotely.</p>
                <p><strong>Guidelines:</strong></p>
                <ul>
                    <li>Employees must maintain productivity and meet performance expectations.</li>
                    <li>Communication with managers and team members is essential.</li>
                    <li>A suitable home workspace should be maintained.</li>
                    <li>Company equipment must be used securely.</li>
                </ul>
                <p><strong>Approval:</strong> Remote work arrangements require manager approval and may be subject to review.</p>
            `;
            break;
        case 'anti-harassment':
            policyText = `
                <h2>Anti-Harassment Policy</h2>
                <p><strong>Commitment:</strong> [Company Name] is committed to providing a workplace free from harassment and discrimination.</p>
                <p><strong>Prohibited Conduct:</strong> Harassment includes any unwelcome conduct based on race, color, religion, sex, national origin, age, disability, or any other protected characteristic.</p>
                <p><strong>Reporting Procedures:</strong> Employees who experience or witness harassment should report it immediately to their manager or HR.</p>
                <p><strong>Investigation:</strong> All reports will be promptly and thoroughly investigated, and appropriate corrective action will be taken.</p>
                <p><strong>Non-Retaliation:</strong> Retaliation against anyone who reports harassment or participates in an investigation is strictly prohibited.</p>
            `;
            break;
        case 'code-of-conduct':
            policyText = `
                <h2>Code of Conduct</h2>
                <p><strong>Introduction:</strong> This Code of Conduct outlines the ethical principles and behavioral expectations for all employees of [Company Name].</p>
                <p><strong>Respect and Professionalism:</strong> Treat all colleagues, customers, and partners with respect, dignity, and professionalism.</p>
                <p><strong>Integrity:</strong> Act with honesty and integrity in all business dealings.</p>
                <p><strong>Compliance:</strong> Adhere to all company policies, laws, and regulations.</p>
                <p><strong>Confidentiality:</strong> Protect confidential company and customer information.</p>
                <p><strong>Reporting Violations:</strong> Report any suspected violations of this Code of Conduct to management or HR.</p>
            `;
            break;
        default:
            policyText = '<p style="color: red;">Please select a policy type.</p>';
    }

    policyContentDiv.innerHTML = policyText;
});