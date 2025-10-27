
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-letter-btn');
    const letterOutput = document.getElementById('letter-output');
    const letterContent = document.getElementById('letter-content');
    const copyBtn = document.getElementById('copy-letter-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const oldJobTitle = document.getElementById('old-job-title').value || '[Current Job Title]';
        const newJobTitle = document.getElementById('new-job-title').value || '[New Job Title]';
        const newSalary = document.getElementById('new-salary').value;
        const effectiveDate = document.getElementById('effective-date').value || '[Effective Date]';
        const reason = document.getElementById('reason').value;

        const formattedSalary = newSalary ? `$${parseFloat(newSalary).toLocaleString()}` : '[New Annual Salary]';

        let reasonSection = '';
        if (reason) {
            reasonSection = `<p>${reason}</p>`;
        }

        letterContent.innerHTML = `
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>${employeeName}</strong></p>
            <p>[Employee Address]</p>
            <br>
            <p>Dear ${employeeName},</p>
            <br>
            <p>We are pleased to inform you of your promotion to the position of <strong>${newJobTitle}</strong>, effective <strong>${effectiveDate}</strong>.</p>
            <br>
            <p>This promotion is in recognition of your outstanding contributions and dedication to ${companyName} as a ${oldJobTitle}.</p>
            ${reasonSection}
            <br>
            <h3>New Terms of Employment:</h3>
            <ul>
                <li><strong>New Job Title:</strong> ${newJobTitle}</li>
                <li><strong>New Annual Salary:</strong> ${formattedSalary}</li>
                <li><strong>Effective Date:</strong> ${effectiveDate}</li>
                <li>[Any other changes, e.g., reporting structure, new responsibilities]</li>
            </ul>
            <br>
            <p>We are confident that you will continue to excel in your new role and contribute significantly to the success of ${companyName}. We look forward to your continued growth and leadership.</p>
            <br>
            <p>Please sign and return a copy of this letter to Human Resources to acknowledge your acceptance of this promotion.</p>
            <br>
            <p>Sincerely,</p>
            <p>[Your Name/HR Department]</p>
            <p>[Your Title]</p>
            <br>
            <p>_________________________<br>Employee Signature & Date</p>
            <p>_________________________<br>Company Representative Signature & Date</p>
        `;

        letterOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(letterContent);
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
