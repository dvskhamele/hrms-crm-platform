
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-email-btn');
    const emailOutput = document.getElementById('email-output');
    const generatedEmail = document.getElementById('generated-email');
    const copyBtn = document.getElementById('copy-email-btn');

    generateBtn.addEventListener('click', () => {
        const newHireName = document.getElementById('new-hire-name').value || '[New Hire Name]';
        const companyName = document.getElementById('company-name').value || '[Company Name]';
        const startDate = document.getElementById('start-date').value || '[Start Date]';
        const arrivalTime = document.getElementById('first-day-arrival-time').value || '[Arrival Time]';
        const managerName = document.getElementById('reporting-manager').value || '[Manager Name]';
        const buddyName = document.getElementById('onboarding-buddy').value;

        let buddySection = '';
        if (buddyName) {
            buddySection = `We've also assigned an onboarding buddy, ${buddyName}, who will help you get settled in and answer any questions you may have.`;
        }

        const email = `Subject: Welcome to the Team at ${companyName}!

Hi ${newHireName},

On behalf of the entire team, I am thrilled to welcome you to ${companyName}! We are so excited to have you join us and can't wait for you to get started.

As a reminder, your first day is ${startDate}. Please plan to arrive at our office around ${arrivalTime}. Your manager, ${managerName}, will be there to greet you and get you started.

We have a full day planned to help you get acquainted with the team and your new role. The first week will be focused on getting you set up, introducing you to key team members, and familiarizing you with our projects and culture.

${buddySection}

We are all looking forward to working with you. If you have any questions before your first day, please don’t hesitate to reach out.

Welcome aboard!

Best regards,

[Your Name]`;

        generatedEmail.value = email;
        emailOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        generatedEmail.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Email';
        }, 2000);
    });
});
