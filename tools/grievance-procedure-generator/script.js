
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-procedure-btn');
    const procedureOutput = document.getElementById('procedure-output');
    const procedureContent = document.getElementById('procedure-content');
    const copyBtn = document.getElementById('copy-procedure-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const policyDate = document.getElementById('policy-date').value || new Date().toLocaleDateString();
        const step1 = document.getElementById('step1').value || 'The employee should first attempt to resolve the issue informally by discussing it directly with their immediate manager. This step is encouraged for minor concerns and can often lead to a quick resolution.';
        const step2 = document.getElementById('step2').value || 'If informal resolution is not possible, or if the employee is uncomfortable discussing the matter with their manager, a formal written complaint may be submitted to Human Resources. The complaint should detail the nature of the grievance, relevant dates, individuals involved, and desired outcome.';
        const step3 = document.getElementById('step3').value || 'Upon receipt of a formal complaint, Human Resources will conduct a thorough and impartial investigation. This may involve interviewing relevant parties and reviewing documentation. HR will provide a written decision or resolution within [e.g., 10-15] business days of receiving the formal complaint.';

        procedureContent.innerHTML = `
            <h2>Employee Grievance Procedure for ${companyName}</h2>
            <p><strong>Effective Date:</strong> ${policyDate}</p>

            <h3>1. Policy Statement</h3>
            <p>${companyName} is committed to fostering a fair and respectful work environment. We recognize that workplace concerns or grievances may arise, and we are dedicated to providing a clear and effective process for employees to raise and resolve these issues promptly and fairly.</p>

            <h3>2. Scope</h3>
            <p>This procedure applies to all employees of ${companyName} and covers grievances related to working conditions, terms of employment, interpersonal conflicts, or perceived unfair treatment. This procedure does not supersede policies related to harassment or discrimination, which have separate reporting mechanisms.</p>

            <h3>3. Principles</h3>
            <ul>
                <li>All grievances will be treated seriously and with respect.</li>
                <li>Confidentiality will be maintained to the extent possible, consistent with a thorough investigation.</li>
                <li>No employee will be retaliated against for raising a grievance in good faith.</li>
            </ul>

            <h3>4. Grievance Procedure Steps</h3>

            <h4>Step 1: Informal Resolution</h4>
            <p>${step1}</p>

            <h4>Step 2: Formal Complaint</h4>
            <p>${step2}</p>

            <h4>Step 3: Investigation and Resolution</h4>
            <p>${step3}</p>

            <h3>5. No Retaliation</h3>
            <p>${companyName} strictly prohibits any form of retaliation against an employee for utilizing this grievance procedure in good faith. Any employee found to have engaged in retaliation will be subject to disciplinary action, up to and including termination of employment.</p>

            <h3>6. Policy Review</h3>
            <p>This policy will be reviewed periodically and may be updated as needed.</p>

            <h3>Acknowledgement</h3>
            <p>I have read, understood, and agree to abide by the terms and conditions outlined in this Grievance Procedure.</p>
            <p>_________________________<br>Employee Signature & Date</p>
            <p>_________________________<br>Manager/HR Representative Signature & Date</p>
        `;

        procedureOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(procedureContent);
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
