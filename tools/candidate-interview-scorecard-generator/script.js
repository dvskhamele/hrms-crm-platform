

// Analytics Logging
function logAnalyticsEvent(eventName, data = {}) {
    console.log(`Analytics Event: ${eventName}`, data);
    // In a real scenario, this would send data to an analytics service
}

logAnalyticsEvent('ToolOpened', { tool: 'CandidateInterviewScorecardGenerator' });

function generateScorecard(jobTitle, keySkills, evaluationCriteria) {
    let scorecardContent = `
        <h2 class="text-xl font-bold text-gray-800 mb-4">Interview Scorecard for ${jobTitle}</h2>
        <p class="mb-4"><strong>Candidate Name:</strong> _________________________</p>
        <p class="mb-4"><strong>Interviewer Name:</strong> _________________________</p>
        <p class="mb-4"><strong>Date:</strong> _________________________</p>
        
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Key Skills Assessment (Scale of 1-5, 5 being excellent)</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
    `;

    const skillsArray = keySkills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    if (skillsArray.length > 0) {
        skillsArray.forEach(skill => {
            scorecardContent += `<li>${skill}: _____ / 5</li>`;
        });
    } else {
        scorecardContent += `<li>No specific key skills provided.</li>`;
    }
    scorecardContent += `</ul>`;

    const criteriaArray = evaluationCriteria.split('\n').map(c => c.trim()).filter(c => c.length > 0);
    if (criteriaArray.length > 0) {
        scorecardContent += `
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Additional Evaluation Criteria (Scale of 1-5, 5 being excellent)</h3>
            <ul class="list-disc list-inside space-y-2 mb-4">
        `;
        criteriaArray.forEach(criterion => {
            scorecardContent += `<li>${criterion}: _____ / 5</li>`;
        });
        scorecardContent += `</ul>`;
    }

    scorecardContent += `
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Overall Assessment</h3>
        <p class="mb-2"><strong>Strengths:</strong></p>
        <textarea class="w-full p-2 border rounded-md mb-4" rows="4"></textarea>
        <p class="mb-2"><strong>Areas for Development:</strong></p>
        <textarea class="w-full p-2 border rounded-md mb-4" rows="4"></textarea>
        <p class="mb-2"><strong>Recommendation:</strong> (Hire / Second Interview / Do Not Hire)</p>
        <p class="mb-4">_________________________</p>
    `;

    return scorecardContent;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scorecardGeneratorForm');
    const leadCaptureForm = document.getElementById('leadCaptureForm');
    const leadEmailInput = document.getElementById('leadEmail');
    const leadCaptureMessage = document.getElementById('leadCaptureMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        logAnalyticsEvent('ToolSubmitted', { tool: 'CandidateInterviewScorecardGenerator' });

        const jobTitle = document.getElementById('jobTitle').value;
        const keySkills = document.getElementById('keySkills').value;
        const evaluationCriteria = document.getElementById('evaluationCriteria').value;

        if (!jobTitle) {
            alert('Please fill in the Job Title.');
            return;
        }

        const generatedScorecard = generateScorecard(jobTitle, keySkills, evaluationCriteria);

        const resultData = {
            inputs: {
                jobTitle,
                keySkills,
                evaluationCriteria,
            },
            results: {
                generatedScorecard,
            },
        };

        const encodedData = btoa(JSON.stringify(resultData));
        window.location.href = `/tools/results/candidate-interview-scorecard-generator-results.html?data=${encodedData}`;
    });

    leadCaptureForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = leadEmailInput.value.trim();
        if (email) {
            logAnalyticsEvent('LeadCaptured', { tool: 'CandidateInterviewScorecardGenerator', email: email });
            leadCaptureMessage.textContent = 'Thank you! Your advanced interview & assessment resources will be sent to ' + email;
            leadCaptureMessage.classList.remove('hidden');
            leadEmailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
});
