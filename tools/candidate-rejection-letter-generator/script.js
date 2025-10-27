document.getElementById('generate-btn').addEventListener('click', () => {
    const candidateName = document.getElementById('candidate-name').value;
    const jobTitle = document.getElementById('job-title').value;
    const companyName = document.getElementById('company-name').value;
    const reason = document.getElementById('reason').value;
    const rejectionLetterDiv = document.getElementById('rejection-letter');

    if (!candidateName || !jobTitle || !companyName) {
        rejectionLetterDiv.innerHTML = '<p style="color: red;">Please fill out candidate name, job title, and company name.</p>';
        return;
    }

    let letterContent = `
        <p>Dear ${candidateName},</p>
        <p>Thank you for your interest in the ${jobTitle} position at ${companyName}. We appreciate you taking the time to interview with our team.</p>
        <p>While your qualifications are impressive, we have decided to move forward with other candidates whose qualifications and experience were a closer match for the requirements of this particular role. ${reason ? `Specifically, ${reason}.` : ''}</p>
        <p>We wish you the best of luck in your job search and future endeavors.</p>
        <p>Sincerely,</p>
        <p>The Hiring Team</p>
        <p>${companyName}</p>
    `;

    rejectionLetterDiv.innerHTML = letterContent;
});
