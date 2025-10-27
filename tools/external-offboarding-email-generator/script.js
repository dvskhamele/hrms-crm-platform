
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-email-btn');
    const emailOutput = document.getElementById('email-output');
    const emailContent = document.getElementById('email-content');
    const copyBtn = document.getElementById('copy-email-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const employeeName = document.getElementById('employee-name').value || '[Departing Employee Name]';
        const employeeRole = document.getElementById('employee-role').value || '[Employee Role]';
        const lastDay = document.getElementById('last-day').value || '[Last Day of Employment]';
        const replacementInfo = document.getElementById('replacement-info').value;

        let replacementSection = '';
        if (replacementInfo) {
            replacementSection = `
            <p>During this transition, please note the following:</p>
            <p>${replacementInfo}</p>
            `;
        }

        emailContent.innerHTML = `
            <p><strong>Subject:</strong> Important Update: Change in Your [Employee Role] Contact at ${companyName}</p>
            <br>
            <p>Dear [Client/Partner Name],</p>
            <br>
            <p>We are writing to inform you that <strong>${employeeName}</strong>, our <strong>${employeeRole}</strong>, will be leaving ${companyName} on <strong>${lastDay}</strong>.</p>
            <br>
            <p>We want to express our sincere gratitude to ${employeeName} for their contributions and dedication during their time with us. We wish them all the best in their future endeavors.</p>
            <br>
            ${replacementSection}
            <br>
            <p>We are committed to ensuring a seamless transition and maintaining the high level of service you expect from ${companyName}.</p>
            <br>
            <p>If you have any questions, please do not hesitate to contact [Your Name/New Contact Name] at [Your Email/New Contact Email].</p>
            <br>
            <p>Sincerely,</p>
            <p>[Your Name/Company Leadership]</p>
            <p>[Your Title]</p>
        `;

        emailOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(emailContent);
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand('copy');
        window.getSelection().removeAllRanges();// to deselect

        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Email';
        }, 2000);
    });
});
