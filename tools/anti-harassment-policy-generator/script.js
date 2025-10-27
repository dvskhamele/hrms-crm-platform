
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-policy-btn');
    const policyOutput = document.getElementById('policy-output');
    const policyContent = document.getElementById('policy-content');
    const copyBtn = document.getElementById('copy-policy-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const policyDate = document.getElementById('policy-date').value || new Date().toLocaleDateString();
        const reportingProcedure = document.getElementById('reporting-procedure').value || 'Report to your manager, Human Resources, or any member of leadership. You may also use our anonymous reporting hotline at [Phone Number] or email at [Email Address].';
        const investigationProcess = document.getElementById('investigation-process').value || 'All complaints will be investigated promptly, impartially, and confidentially to the extent possible. Appropriate corrective action will be taken based on the findings of the investigation.';

        policyContent.innerHTML = `
            <h2>Anti-Harassment and Bullying Policy for ${companyName}</h2>
            <p><strong>Effective Date:</strong> ${policyDate}</p>

            <h3>1. Policy Statement</h3>
            <p>${companyName} is committed to providing a work environment free from harassment and bullying, where all individuals are treated with respect and dignity. Harassment and bullying are unacceptable and will not be tolerated.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all employees, contractors, interns, and any third parties interacting with ${companyName} in the workplace, including during work-related events, business trips, and social gatherings.</p>

            <h3>3. Definitions</h3>
            <ul>
                <li><strong>Harassment:</strong> Unwelcome conduct based on race, color, religion, sex (including pregnancy, sexual orientation, or gender identity), national origin, age (40 or older), disability, or genetic information.</li>
                <li><strong>Bullying:</strong> Repeated, unreasonable behavior directed towards an employee or group of employees that creates a risk to health and safety.</li>
            </ul>

            <h3>4. Prohibited Conduct</h3>
            <p>Examples of prohibited harassment and bullying include, but are not limited to:</p>
            <ul>
                <li>Verbal abuse, threats, or derogatory comments.</li>
                <li>Offensive jokes, slurs, or stereotypes.</li>
                <li>Displaying offensive materials.</li>
                <li>Intimidation, ridicule, or insults.</li>
                <li>Unwanted physical contact or gestures.</li>
                <li>Excluding or isolating individuals.</li>
            </ul>

            <h3>5. Reporting Procedure</h3>
            <p>If you experience or witness harassment or bullying, you are encouraged to report it immediately. The reporting procedure is as follows:</p>
            <p>${reportingProcedure}</p>

            <h3>6. Investigation Process</h3>
            <p>${investigationProcess}</p>

            <h3>7. No Retaliation</h3>
            <p>${companyName} prohibits retaliation against any individual who reports harassment or bullying in good faith, participates in an investigation, or opposes discriminatory practices.</p>

            <h3>8. Consequences of Violations</h3>
            <p>Any employee found to have violated this policy will be subject to disciplinary action, up to and including termination of employment.</p>

            <h3>Acknowledgement</h3>
            <p>I have read, understood, and agree to abide by the terms and conditions outlined in this Anti-Harassment and Bullying Policy.</p>
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
