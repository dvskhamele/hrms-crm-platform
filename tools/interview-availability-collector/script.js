document.addEventListener('DOMContentLoaded', () => {
    const generateMessageBtn = document.getElementById('generate-message-btn');
    const messageOutput = document.getElementById('message-output');
    const generatedMessage = document.getElementById('generated-message');
    const copyMessageBtn = document.getElementById('copy-message-btn');

    const parseReplyBtn = document.getElementById('parse-reply-btn');
    const parsedOutput = document.getElementById('parsed-output');
    const parsedList = document.getElementById('parsed-list');

    generateMessageBtn.addEventListener('click', () => {
        const jobTitle = document.getElementById('job-title').value || '[Job Title]';
        const interviewerName = document.getElementById('interviewer-name').value || 'the hiring team';
        const interviewDuration = document.getElementById('interview-duration').value;

        const message = `Subject: Interview Availability for the ${jobTitle} Position

Hi [Candidate Name],

Thank you for your interest in the ${jobTitle} position at [Your Company]. We were impressed with your background and would like to schedule a ${interviewDuration}-minute interview with you and ${interviewerName}.

Please reply to this email with a few dates and time slots that work for you over the next week. 

We look forward to speaking with you soon.

Best regards,

[Your Name]`;

        generatedMessage.value = message;
        messageOutput.classList.remove('hidden');
    });

    copyMessageBtn.addEventListener('click', () => {
        generatedMessage.select();
        document.execCommand('copy');
        copyMessageBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyMessageBtn.textContent = 'Copy Message';
        }, 2000);
    });

    parseReplyBtn.addEventListener('click', () => {
        const candidateReply = document.getElementById('candidate-reply').value;
        
        // Simple parsing logic: assumes candidate provides times on new lines.
        const lines = candidateReply.split(/\r?\n/);
        let availabilityHTML = '';

        lines.forEach(line => {
            if (line.trim() !== '') {
                availabilityHTML += `<p>${line.trim()}</p>`;
            }
        });

        if (availabilityHTML) {
            parsedList.innerHTML = availabilityHTML;
            parsedOutput.classList.remove('hidden');
        } else {
            parsedList.innerHTML = '<p>No availability found. Please check the input.</p>';
            parsedOutput.classList.remove('hidden');
        }
    });
});
