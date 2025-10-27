
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-policy-btn');
    const policyOutput = document.getElementById('policy-output');
    const policyContent = document.getElementById('policy-content');
    const copyBtn = document.getElementById('copy-policy-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const policyDate = document.getElementById('policy-date').value || new Date().toLocaleDateString();
        const accrualRate = document.getElementById('accrual-rate').value || '10 days per year';
        const carryOver = document.getElementById('carry-over').value || '5 days';
        const requestProcedure = document.getElementById('request-procedure').value || 'Employees must submit leave requests through the HR portal at least two weeks in advance. All requests are subject to management approval based on business needs.';

        policyContent.innerHTML = `
            <h2>Annual Leave Policy for ${companyName}</h2>
            <p><strong>Effective Date:</strong> ${policyDate}</p>

            <h3>1. Policy Statement</h3>
            <p>${companyName} recognizes the importance of rest and rejuvenation for employee well-being and productivity. This policy outlines the guidelines for annual leave (vacation) to ensure a fair and consistent approach for all eligible employees.</p>

            <h3>2. Eligibility</h3>
            <p>All full-time employees are eligible for annual leave. Part-time employees may be eligible for pro-rated annual leave based on their hours worked.</p>

            <h3>3. Annual Leave Accrual</h3>
            <p>Eligible employees will accrue annual leave at a rate of <strong>${accrualRate}</strong>. Leave accrual begins on the employee's start date.</p>

            <h3>4. Annual Leave Usage</h3>
            <ul>
                <li>Annual leave is intended for rest, relaxation, and personal time off.</li>
                <li>Employees are encouraged to utilize their annual leave throughout the year.</li>
                <li>Annual leave must be approved by the employee's direct manager.</li>
            </ul>

            <h3>5. Leave Request Procedure</h3>
            <p>${requestProcedure}</p>

            <h3>6. Carry-Over of Annual Leave</h3>
            <p>Employees may carry over a maximum of <strong>${carryOver}</strong> of unused annual leave into the next calendar year. Any unused leave exceeding this limit will be forfeited at the end of the year.</p>

            <h3>7. Annual Leave Payout Upon Termination</h3>
            <p>Upon termination of employment, eligible employees will be paid out for any accrued, unused annual leave in accordance with applicable state and federal laws.</p>

            <h3>8. Policy Review</h3>
            <p>This policy will be reviewed periodically and may be updated as needed to reflect changes in business needs or best practices.</p>

            <h3>Acknowledgement</h3>
            <p>I have read, understood, and agree to abide by the terms and conditions outlined in this Annual Leave Policy.</p>
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
