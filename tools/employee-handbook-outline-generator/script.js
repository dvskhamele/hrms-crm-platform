document.getElementById('generate-btn').addEventListener('click', () => {
    const companyName = document.getElementById('company-name').value;
    const industry = document.getElementById('industry').value;
    const handbookOutlineDiv = document.getElementById('handbook-outline');

    if (!companyName) {
        handbookOutlineDiv.innerHTML = '<p style="color: red;">Please enter the company name.</p>';
        return;
    }

    let outlineContent = `
        <h1>${companyName} Employee Handbook Outline</h1>
        <p>This is a suggested outline for your employee handbook. Please customize it to reflect your company's specific policies, culture, and legal requirements.</p>
        
        <h2>Table of Contents:</h2>
        <ol>
            <li>Welcome Message from Leadership</li>
            <li>Our Company: Mission, Vision, Values, History</li>
            <li>Employment Basics
                <ul>
                    <li>Equal Employment Opportunity</li>
                    <li>Employment At-Will</li>
                    <li>Background Checks</li>
                    <li>Confidentiality & Non-Disclosure</li>
                </ul>
            </li>
            <li>Workplace Conduct & Expectations
                <ul>
                    <li>Code of Conduct & Ethics</li>
                    <li>Anti-Harassment & Discrimination Policy</li>
                    <li>Workplace Safety</li>
                    <li>Drug-Free Workplace</li>
                    <li>Social Media Policy</li>
                    <li>Use of Company Property & Resources</li>
                </ul>
            </li>
            <li>Compensation & Benefits
                <ul>
                    <li>Pay Periods & Payroll</li>
                    <li>Overtime</li>
                    <li>Health & Welfare Benefits (Medical, Dental, Vision)</li>
                    <li>Retirement Plans (e.g., 401k)</li>
                    <li>Paid Time Off (PTO), Vacation, Sick Leave</li>
                    <li>Holidays</li>
                </ul>
            </li>
            <li>Performance Management & Development
                <ul>
                    <li>Performance Reviews</li>
                    <li>Goal Setting</li>
                    <li>Training & Development Opportunities</li>
                    <li>Disciplinary Action</li>
                </ul>
            </li>
            <li>Leave of Absence Policies
                <ul>
                    <li>Family & Medical Leave Act (FMLA)</li>
                    <li>Personal Leave</li>
                    <li>Jury Duty & Military Leave</li>
                </ul>
            </li>
            <li>Employee Separation
                <ul>
                    <li>Resignation Procedures</li>
                    <li>Termination</li>
                    <li>Exit Interviews</li>
                </ul>
            </li>
            <li>Acknowledgment of Receipt</li>
        </ol>
        
        <p><em>Note: This is a general outline. It is crucial to consult with legal counsel and HR experts to ensure your employee handbook complies with all federal, state, and local laws relevant to your specific location and industry.</em></p>
    `;

    handbookOutlineDiv.innerHTML = outlineContent;
});