document.addEventListener('DOMContentLoaded', () => {
    const emailTypeSelect = document.getElementById('email-type');
    const candidateNameInput = document.getElementById('candidate-name');
    const jobTitleInput = document.getElementById('job-title');
    const interviewDetailsGroup = document.getElementById('interview-details-group');
    const interviewDateInput = document.getElementById('interview-date');
    const interviewLocationInput = document.getElementById('interview-location');
    const offerDetailsGroup = document.getElementById('offer-details-group');
    const salaryInput = document.getElementById('salary');
    const startDateInput = document.getElementById('start-date');
    const generateBtn = document.getElementById('generate-btn');
    const generatedEmail = document.getElementById('generated-email');
    const copyBtn = document.getElementById('copy-btn');

    function updateVisibility() {
        const selectedType = emailTypeSelect.value;
        interviewDetailsGroup.style.display = 'none';
        offerDetailsGroup.style.display = 'none';

        if (selectedType === 'interview-invite') {
            interviewDetailsGroup.style.display = 'block';
        } else if (selectedType === 'job-offer') {
            offerDetailsGroup.style.display = 'block';
        }
    }

    emailTypeSelect.addEventListener('change', updateVisibility);
    updateVisibility(); // Set initial visibility

    generateBtn.addEventListener('click', () => {
        const emailType = emailTypeSelect.value;
        const candidateName = candidateNameInput.value.trim();
        const jobTitle = jobTitleInput.value.trim();
        let emailSubject = '';
        let emailBody = '';

        if (!candidateName || !jobTitle) {
            alert('Please fill in Candidate Name and Job Title.');
            return;
        }

        switch (emailType) {
            case 'application-received':
                emailSubject = `Application Received - ${jobTitle}`;
                emailBody = `Dear ${candidateName},

Thank you for your application for the ${jobTitle} position at [Company Name]. We have received your application and our hiring team is currently reviewing it.

We appreciate your interest in joining our team and will be in touch if your qualifications meet the requirements for the role.

Sincerely,
[Hiring Team/Company Name]`;
                break;

            case 'interview-invite':
                const interviewDate = interviewDateInput.value.trim();
                const interviewLocation = interviewLocationInput.value.trim();
                if (!interviewDate || !interviewLocation) {
                    alert('Please fill in Interview Date & Time and Interview Location/Link.');
                    return;
                }
                emailSubject = `Interview Invitation - ${jobTitle}`;
                emailBody = `Dear ${candidateName},

Thank you for your interest in the ${jobTitle} position at [Company Name]. We were very impressed with your application and would like to invite you for an interview.

Your interview has been scheduled for ${interviewDate} at ${interviewLocation}.

Please confirm your availability by replying to this email. We look forward to speaking with you.

Sincerely,
[Hiring Team/Company Name]`;
                break;

            case 'rejection-post-interview':
                emailSubject = `Update on Your Application - ${jobTitle}`;
                emailBody = `Dear ${candidateName},

Thank you for taking the time to interview for the ${jobTitle} position at [Company Name]. We appreciate you sharing your experience and qualifications with us.

While your background is impressive, we have decided to move forward with other candidates whose qualifications were a closer match for the specific requirements of this role at this time.

We wish you the best of luck in your job search and future endeavors.

Sincerely,
[Hiring Team/Company Name]`;
                break;

            case 'job-offer':
                const salary = salaryInput.value.trim();
                const startDate = startDateInput.value.trim();
                if (!salary || !startDate) {
                    alert('Please fill in Salary and Start Date.');
                    return;
                }
                emailSubject = `Job Offer - ${jobTitle}`;
                emailBody = `Dear ${candidateName},

We are delighted to offer you the position of ${jobTitle} at [Company Name]! We were very impressed with your skills and experience during the interview process.

Your starting salary will be ${salary} per annum, with a proposed start date of ${startDate}. Full details of your compensation and benefits package will be provided in a formal offer letter.

We are excited about the possibility of you joining our team. Please let us know if you have any questions.

Sincerely,
[Hiring Manager/Company Name]`;
                break;
        }

        generatedEmail.value = `Subject: ${emailSubject}\n\n${emailBody}`;
    });

    copyBtn.addEventListener('click', () => {
        if (generatedEmail.value) {
            navigator.clipboard.writeText(generatedEmail.value)
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
