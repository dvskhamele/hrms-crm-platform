document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-letter-btn');
    const letterOutput = document.getElementById('letter-output');
    const letterContent = document.getElementById('letter-content');
    const copyBtn = document.getElementById('copy-letter-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const jobTitle = document.getElementById('job-title').value || '[Job Title]';
        const startDate = document.getElementById('start-date').value || '[Start Date]';
        const probationPeriod = document.getElementById('probation-period').value || '90';
        const managerName = document.getElementById('manager-name').value || '[Manager Name]';
        const expectations = document.getElementById('expectations').value.split('\n').filter(line => line.trim() !== '');

        const probationEndDate = new Date(startDate);
        probationEndDate.setDate(probationEndDate.getDate() + parseInt(probationPeriod));
        const formattedProbationEndDate = probationEndDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        let expectationsHtml = expectations.length > 0 ? `<ul>${expectations.map(e => `<li>${e.trim()}</li>`).join('')}</ul>` : '<p>[List key performance indicators, goals, and behavioral expectations.]</p>';

        letterContent.innerHTML = "            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>${employeeName}</strong></p>
            <p>[Employee Address]</p>
            <br>
            <p>Dear ${employeeName},</p>
            <br>
            <p>This letter is to confirm the terms of your employment with <strong>${companyName}</strong> as a <strong>${jobTitle}</strong>, commencing on <strong>${startDate}</strong>.</p>
            <br>
            <h3>Probationary Period:</h3>
            <p>Your employment will be subject to a probationary period of <strong>${probationPeriod} days</strong>, ending on <strong>${formattedProbationEndDate}</strong>. During this time, your performance and suitability for the role will be assessed.</p>
            <br>
            <h3>Expectations and Goals:</h3>
            <p>During your probationary period, you are expected to meet the following key performance indicators and behavioral expectations:</p>
            ${expectationsHtml}
            <br>
            <p>Your manager, ${managerName}, will provide regular feedback and support to help you succeed during this period. We encourage you to actively seek feedback and ask questions.</p>
            <br>
            <h3>Review and Outcome:</h3>
            <p>Towards the end of your probationary period, your manager will conduct a formal review of your performance. Based on this review, a decision will be made regarding your continued employment with ${companyName}.</p>
            <br>
            <p>We are confident in your abilities and look forward to your successful integration into our team.</p>
            <br>
            <p>Sincerely,</p>
            <p>[Your Name/HR Department]</p>
            <p>[Your Title]</p>
            <br>
            <p>_________________________<br>Employee Signature & Date</p>
            <p>_________________________<br>Manager Signature & Date</p>
        ";

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
