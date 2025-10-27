document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const generatedLetter = document.getElementById('generated-letter');

    generateBtn.addEventListener('click', () => {
        const newHireName = document.getElementById('new-hire-name').value.trim();
        const jobTitle = document.getElementById('job-title').value.trim();
        const startDate = document.getElementById('start-date').value;
        const managerName = document.getElementById('manager-name').value.trim();
        const companyName = document.getElementById('company-name').value.trim();

        if (!newHireName || !jobTitle || !startDate || !managerName || !companyName) {
            alert('Please fill in all fields to generate the welcome letter.');
            return;
        }

        const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        const letter = `Dear ${newHireName},

Welcome to ${companyName}! We are thrilled to have you join our team as a ${jobTitle}.

Your official start date will be ${formattedStartDate}. You will be reporting directly to ${managerName}, who is very much looking forward to working with you.

At ${companyName}, we believe in [mention a core company value, e.g., innovation, collaboration, customer success]. We are confident that your skills and experience will be a valuable asset to our team.

On your first day, please report to [Location/Department] at [Time]. We will have your workstation set up and ready for you. You will also receive an orientation to help you get acquainted with our company culture, policies, and your new colleagues.

We are excited about the contributions you will make and look forward to a successful journey together.

Sincerely,

${managerName}
[Your Title/HR Department]
${companyName}`;

        generatedLetter.value = letter;
    });

    copyBtn.addEventListener('click', () => {
        if (generatedLetter.value) {
            navigator.clipboard.writeText(generatedLetter.value)
                .then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                })
                .catch(err => {
                    alert('Failed to copy text.');
                });
        }
    });
});
