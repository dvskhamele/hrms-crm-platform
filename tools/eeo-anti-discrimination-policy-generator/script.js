
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
            <h2>Equal Employment Opportunity (EEO) and Anti-Discrimination Policy for ${companyName}</h2>
            <p><strong>Effective Date:</strong> ${policyDate}</p>

            <h3>1. Policy Statement</h3>
            <p>${companyName} is an Equal Employment Opportunity (EEO) employer and is committed to providing a workplace free from discrimination and harassment. We believe in treating all individuals with respect and dignity, and we are dedicated to fostering an inclusive environment where everyone has an equal opportunity to succeed.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all aspects of employment, including recruitment, hiring, training, promotion, compensation, benefits, and termination. It covers all employees, job applicants, contractors, and vendors of ${companyName}.</p>

            <h3>3. Prohibited Discrimination and Harassment</h3>
            <p>${companyName} strictly prohibits discrimination or harassment based on any protected characteristic, including but not limited to:</p>
            <ul>
                <li>Race, color, religion, sex (including pregnancy, sexual orientation, and gender identity)</li>
                <li>National origin, age (40 or older), disability, genetic information</li>
                <li>Any other characteristic protected by applicable federal, state, or local laws.</li>
            </ul>
            <p>This includes unwelcome conduct, whether verbal, physical, or visual, that is based on a protected characteristic and creates a hostile work environment or interferes with an individual's work performance.</p>

            <h3>4. Reporting Procedure</h3>
            <p>If you believe you have been subjected to or have witnessed discrimination or harassment, you are encouraged to report it immediately. The reporting procedure is as follows:</p>
            <p>${reportingProcedure}</p>

            <h3>5. Investigation Process</h3>
            <p>${investigationProcess}</p>

            <h3>6. No Retaliation</h3>
            <p>${companyName} strictly prohibits retaliation against any individual who reports discrimination or harassment in good faith, participates in an investigation, or opposes discriminatory practices. Any employee found to have engaged in retaliation will be subject to disciplinary action, up to and including termination of employment.</p>

            <h3>7. Consequences of Violations</h3>
            <p>Any employee found to have violated this policy will be subject to disciplinary action, up to and including termination of employment, and may also lead to legal action.</p>

            <h3>Acknowledgement</h3>
            <p>I have read, understood, and agree to abide by the terms and conditions outlined in this Equal Employment Opportunity and Anti-Discrimination Policy.</p>
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
