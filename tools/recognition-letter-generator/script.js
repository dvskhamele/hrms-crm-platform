
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-letter-btn');
    const letterOutput = document.getElementById('letter-output');
    const letterContent = document.getElementById('letter-content');
    const copyBtn = document.getElementById('copy-letter-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const recognitionDate = document.getElementById('recognition-date').value || new Date().toLocaleDateString();
        const reason = document.getElementById('reason').value || '[Describe the specific achievement or contribution being recognized.]';

        letterContent.innerHTML = `
            <p><strong>Date:</strong> ${recognitionDate}</p>
            <p><strong>${employeeName}</strong></p>
            <p>[Employee Address]</p>
            <br>
            <p>Dear ${employeeName},</p>
            <br>
            <p>On behalf of the entire leadership team at <strong>${companyName}</strong>, we would like to express our sincere appreciation and recognize your outstanding contributions.</p>
            <br>
            <p>${reason}</p>
            <br>
            <p>Your dedication, hard work, and commitment to excellence are truly valued and serve as an inspiration to your colleagues. We are incredibly proud to have you as a part of our team.</p>
            <br>
            <p>Thank you once again for your exceptional efforts and for consistently going above and beyond.</p>
            <br>
            <p>Sincerely,</p>
            <p>[Your Name/Leadership Team]</p>
            <p>[Your Title]</p>
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
