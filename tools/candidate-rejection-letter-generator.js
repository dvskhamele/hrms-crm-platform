
document.addEventListener('DOMContentLoaded', () => {
    const generateLetterBtn = document.getElementById('generate-letter');
    const candidateNameInput = document.getElementById('candidate-name');
    const jobTitleInput = document.getElementById('job-title');
    const companyNameInput = document.getElementById('company-name');
    const hiringManagerInput = document.getElementById('hiring-manager');
    const letterOutputDiv = document.getElementById('letter-output');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    const generateLetter = () => {
        const candidateName = candidateNameInput.value;
        const jobTitle = jobTitleInput.value;
        const companyName = companyNameInput.value;
        const hiringManager = hiringManagerInput.value;

        if (!candidateName || !jobTitle || !companyName || !hiringManager) {
            alert('Please fill in all fields.');
            return;
        }

        const today = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', dateOptions);

        const letterContent = `
${formattedDate}

${candidateName}
[Candidate Address]

Dear ${candidateName},

Thank you for your interest in the ${jobTitle} position at ${companyName}. We appreciate you taking the time to interview with our team.

While your qualifications are impressive, we have decided to move forward with other candidates whose qualifications and experience were a closer match for the specific requirements of this role at this time.

This was a highly competitive search, and we received a large number of applications from talented individuals. We wish you the best of luck in your job search and future endeavors.

We encourage you to visit our careers page at [Your Company Careers Page URL] for future opportunities that may align with your skills and experience.

Sincerely,

${hiringManager}
[Your Title]
${companyName}
        `;

        letterOutputDiv.innerHTML = letterContent;
        letterOutputDiv.style.display = 'block';
        emailCaptureDiv.style.display = 'block';

        logAnalytics('rejection_letter_generated');
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Candidate Rejection Letter Generator',
                timestamp: new Date().toISOString()
            };
            saveLead(leadData);
            emailMessage.textContent = 'Thank you! Your letter has been sent to your email.';
            emailMessage.style.color = 'green';
        } else {
            emailMessage.textContent = 'Please enter a valid email address.';
            emailMessage.style.color = 'red';
        }
    };

    const saveLead = (leadData) => {
        console.log('Lead Captured:', JSON.stringify(leadData));
    };

    const logAnalytics = (eventName) => {
        console.log(`Analytics Event: ${eventName}`);
    };

    generateLetterBtn.addEventListener('click', generateLetter);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);
});
