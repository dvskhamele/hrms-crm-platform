
document.addEventListener('DOMContentLoaded', () => {
    const addCriterionBtn = document.getElementById('add-criterion');
    const criteriaContainer = document.getElementById('criteria-container');
    const generateScorecardBtn = document.getElementById('generate-scorecard');
    const resultDiv = document.getElementById('result');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    let criteriaCount = 0;

    const addCriterion = () => {
        criteriaCount++;
        const criterionDiv = document.createElement('div');
        criterionDiv.classList.add('form-group');
        criterionDiv.innerHTML = `
            <label for="criterion-${criteriaCount}">Criterion ${criteriaCount}</label>
            <input type="text" id="criterion-${criteriaCount}" placeholder="e.g., Technical Skills">
            <label for="weight-${criteriaCount}">Weight (1-5)</label>
            <input type="number" id="weight-${criteriaCount}" min="1" max="5" value="3">
        `;
        criteriaContainer.appendChild(criterionDiv);
    };

    const generateScorecard = () => {
        const jobTitle = document.getElementById('job-title').value;
        const candidateName = document.getElementById('candidate-name').value;

        if (!jobTitle || !candidateName) {
            alert('Please fill in both Job Title and Candidate Name.');
            return;
        }

        let tableHtml = `
            <h2>${jobTitle} - Scorecard for ${candidateName}</h2>
            <table border="1" cellpadding="5" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th>Criterion</th>
                        <th>Weight</th>
                        <th>Score (1-5)</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (let i = 1; i <= criteriaCount; i++) {
            const criterion = document.getElementById(`criterion-${i}`).value;
            const weight = document.getElementById(`weight-${i}`).value;
            if (criterion) {
                tableHtml += `
                    <tr>
                        <td>${criterion}</td>
                        <td>${weight}</td>
                        <td></td>
                        <td></td>
                    </tr>
                `;
            }
        }

        tableHtml += `
                </tbody>
            </table>
        `;

        resultDiv.innerHTML = tableHtml;
        resultDiv.style.display = 'block';
        emailCaptureDiv.style.display = 'block';

        // Log analytics event
        logAnalytics('scorecard_generated');
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Candidate Interview Scorecard Generator',
                timestamp: new Date().toISOString()
            };

            // In a real scenario, this would be sent to a server.
            // For this demo, we'll save it to a new local file.
            saveLead(leadData);

            emailMessage.textContent = 'Thank you! Your scorecard has been sent to your email.';
            emailMessage.style.color = 'green';
        } else {
            emailMessage.textContent = 'Please enter a valid email address.';
            emailMessage.style.color = 'red';
        }
    };

    const saveLead = (leadData) => {
        // This is a simplified 'save' function for the browser environment.
        // It will log to the console. A separate script would be needed to write to a file.
        console.log('Lead Captured:', JSON.stringify(leadData));
        // In a real implementation, you'd use an API call to the backend to save the data.
    };

    const logAnalytics = (eventName) => {
        console.log(`Analytics Event: ${eventName}`);
        // In a real implementation, this would send data to an analytics service.
    };

    addCriterionBtn.addEventListener('click', addCriterion);
    generateScorecardBtn.addEventListener('click', generateScorecard);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);

    // Add a few default criteria
    addCriterion();
    addCriterion();
    addCriterion();
});
