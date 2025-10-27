document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const onboardingDate = document.getElementById('onboarding-date').value;
    const feedbackFormDiv = document.getElementById('feedback-form');

    if (!employeeName || !onboardingDate) {
        feedbackFormDiv.innerHTML = '<p style="color: red;">Please enter employee name and onboarding start date.</p>';
        return;
    }

    const formContent = `
        <h1>Employee Onboarding Feedback Form</h1>
        <p><strong>Employee Name:</strong> ${employeeName}</p>
        <p><strong>Onboarding Start Date:</strong> ${onboardingDate}</p>
        <p>Thank you for taking the time to provide feedback on your onboarding experience. Your input is valuable as we continuously strive to improve our processes.</p>
        
        <h2>1. Pre-Boarding Experience (Before Day 1)</h2>
        <p>How would you rate the clarity and helpfulness of information received before your start date?</p>
        <p>1 (Poor) &nbsp; 2 &nbsp; 3 (Average) &nbsp; 4 &nbsp; 5 (Excellent)</p>
        <textarea rows="2" style="width: 100%;" placeholder="Comments..."></textarea>
        
        <h2>2. First Week Experience</h2>
        <p>Did you feel welcomed and supported during your first week? Was your workspace ready?</p>
        <p>1 (Poor) &nbsp; 2 &nbsp; 3 (Average) &nbsp; 4 &nbsp; 5 (Excellent)</p>
        <textarea rows="2" style="width: 100%;" placeholder="Comments..."></textarea>
        
        <h2>3. Training & Resources</h2>
        <p>Did you receive adequate training and access to necessary resources to perform your job?</p>
        <p>1 (Poor) &nbsp; 2 &nbsp; 3 (Average) &nbsp; 4 &nbsp; 5 (Excellent)</p>
        <textarea rows="2" style="width: 100%;" placeholder="Comments..."></textarea>
        
        <h2>4. Manager & Team Support</h2>
        <p>How would you rate the support from your manager and team during onboarding?</p>
        <p>1 (Poor) &nbsp; 2 &nbsp; 3 (Average) &nbsp; 4 &nbsp; 5 (Excellent)</p>
        <textarea rows="2" style="width: 100%;" placeholder="Comments..."></textarea>
        
        <h2>5. Overall Onboarding Experience</h2>
        <p>What was the most positive aspect of your onboarding experience?</p>
        <textarea rows="2" style="width: 100%;"></textarea>
        <p>What is one thing we could improve about our onboarding process?</p>
        <textarea rows="2" style="width: 100%;"></textarea>
        
        <h2>Signature:</h2>
        <p>Employee Signature: _________________________ Date: _______________</p>
    `;

    feedbackFormDiv.innerHTML = formContent;
});
