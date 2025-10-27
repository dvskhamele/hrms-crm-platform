
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-policy-btn');
    const policyOutput = document.getElementById('policy-output');
    const policyContent = document.getElementById('policy-content');
    const copyBtn = document.getElementById('copy-policy-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const policyDate = document.getElementById('policy-date').value || new Date().toLocaleDateString();
        const standardWorkweek = document.getElementById('standard-workweek').value || '40';
        const overtimeThreshold = document.getElementById('overtime-threshold').value || '40';
        const overtimeRate = document.getElementById('overtime-rate').value || '1.5 times the regular rate of pay';
        const mealBreakPolicy = document.getElementById('meal-break-policy').value || 'Employees working shifts longer than 5 hours are entitled to an unpaid 30-minute meal break. Employees working shifts longer than 10 hours are entitled to a second unpaid 30-minute meal break.';
        const recordKeeping = document.getElementById('record-keeping').value || 'All employees are required to accurately record all hours worked, including start and end times, and any meal or rest breaks, using the company's designated timekeeping system.';

        policyContent.innerHTML = `
            <h2>Work Hours and Overtime Policy for ${companyName}</h2>
            <p><strong>Effective Date:</strong> ${policyDate}</p>

            <h3>1. Policy Statement</h3>
            <p>This policy outlines ${companyName}'s guidelines regarding work hours, breaks, and overtime compensation. It is designed to ensure fair and consistent practices, promote employee well-being, and comply with all applicable federal, state, and local wage and hour laws.</p>

            <h3>2. Standard Workweek</h3>
            <p>The standard workweek at ${companyName} is <strong>${standardWorkweek} hours</strong>, typically Monday through Friday. Specific work schedules may vary by department or role and will be communicated by your manager.</p>

            <h3>3. Time Record Keeping</h3>
            <p>${recordKeeping}</p>

            <h3>4. Meal and Rest Breaks</h3>
            <p>${mealBreakPolicy}</p>

            <h3>5. Overtime</h3>
            <ul>
                <li><strong>Authorization:</strong> All overtime work must be pre-approved by your manager. Unauthorized overtime will not be compensated.</li>
                <li><strong>Eligibility:</strong> Non-exempt employees are eligible for overtime pay. Exempt employees are not eligible for overtime pay.</li>
                <li><strong>Overtime Rate:</strong> Non-exempt employees will be compensated at a rate of <strong>${overtimeRate}</strong> for all hours worked in excess of <strong>${overtimeThreshold} hours</strong> in a workweek.</li>
            </ul>

            <h3>6. Flexible Work Arrangements</h3>
            <p>Any flexible work arrangements (e.g., compressed workweeks, flextime) must be approved in advance by management and HR, and will be subject to review.</p>

            <h3>7. Questions</h3>
            <p>Employees with questions regarding this policy should contact their manager or Human Resources.</p>

            <h3>Acknowledgement</h3>
            <p>I have read, understood, and agree to abide by the terms and conditions outlined in this Work Hours and Overtime Policy.</p>
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
