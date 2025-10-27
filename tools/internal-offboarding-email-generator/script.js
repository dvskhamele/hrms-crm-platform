
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-email-btn');
    const emailOutput = document.getElementById('email-output');
    const emailContent = document.getElementById('email-content');
    const copyBtn = document.getElementById('copy-email-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const employeeRole = document.getElementById('employee-role').value || '[Employee Role]';
        const lastDay = document.getElementById('last-day').value || '[Last Day of Employment]';
        const reason = document.getElementById('reason').value;
        const transitionPlan = document.getElementById('transition-plan').value;

        let reasonSentence = '';
        if (reason) {
            reasonSentence = `${employeeName} is leaving ${companyName} ${reason.toLowerCase()}.`;
        } else {
            reasonSentence = `${employeeName} is leaving ${companyName}.`;
        }

        let transitionSection = '';
        if (transitionPlan) {
            transitionSection = `
            <p>During this transition, please note the following:</p>
            <p>${transitionPlan}</p>
            `;
        }

        emailContent.innerHTML = `
            <p><strong>Subject:</strong> Important Announcement: Departure of ${employeeName}</p>
            <br>
            <p>Dear Team,</p>
            <br>
            <p>This email is to inform you that <strong>${employeeName}</strong>, our <strong>${employeeRole}</strong>, will be leaving ${companyName} on <strong>${lastDay}</strong>.</p>
            <br>
            <p>${reasonSentence}</p>
            <br>
            <p>We want to thank ${employeeName} for their contributions to ${companyName} during their time with us, particularly for [mention a specific positive contribution if appropriate, e.g., their work on Project X]. We wish them all the best in their future endeavors.</p>
            <br>
            ${transitionSection}
            <br>
            <p>Please join us in wishing ${employeeName} well.</p>
            <br>
            <p>Sincerely,</p>
            <p>[Your Name/HR Department]</p>
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
