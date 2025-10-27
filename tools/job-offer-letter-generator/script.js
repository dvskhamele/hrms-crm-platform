document.getElementById('generate-btn').addEventListener('click', () => {
    const candidateName = document.getElementById('candidate-name').value;
    const jobTitle = document.getElementById('job-title').value;
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const startDate = document.getElementById('start-date').value;
    const benefitsSummary = document.getElementById('benefits-summary').value;
    const offerLetterDiv = document.getElementById('offer-letter');

    if (!candidateName || !jobTitle || !salary || !startDate || !benefitsSummary) {
        offerLetterDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const offerLetterContent = `
        <h2>Job Offer Letter</h2>
        <p>Dear ${candidateName},</p>
        <p>We are pleased to offer you the position of <strong>${jobTitle}</strong> at [Company Name]. We believe your skills and experience will be a valuable asset to our team.</p>
        <p>Your annual starting salary will be <strong>$${salary.toLocaleString()}</strong>, paid bi-weekly, subject to standard deductions. Your anticipated start date is <strong>${startDate}</strong>.</p>
        <p>In addition to your salary, you will be eligible for our comprehensive benefits package, which includes: ${benefitsSummary}. More detailed information about our benefits will be provided during your onboarding.</p>
        <p>This offer is contingent upon successful completion of a background check and verification of your eligibility to work in [Country].</p>
        <p>Please indicate your acceptance of this offer by signing and returning this letter by [Date - e.g., one week from today].</p>
        <p>We are excited about the prospect of you joining our team and look forward to your positive contributions.</p>
        <p>Sincerely,</p>
        <p>[Hiring Manager Name/HR Department]</p>
        <p>[Company Name]</p>
    `;

    offerLetterDiv.innerHTML = offerLetterContent;
});
