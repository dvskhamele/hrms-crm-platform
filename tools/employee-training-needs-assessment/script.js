// Analytics Logging
function logAnalyticsEvent(eventName, data = {}) {
    console.log(`Analytics Event: ${eventName}`, data);
    // In a real scenario, this would send data to an analytics service
}

logAnalyticsEvent('ToolOpened', { tool: 'EmployeeTrainingNeedsAssessment' });

function generateAssessmentQuestions(department, jobRole, skillArea, numQuestions) {
    const questionsBank = {
        technical: [
            "How proficient are you with [Core Technology/Software relevant to department/role]?",
            "Describe a complex technical problem you solved and your approach.",
            "What new technical skills do you believe would most benefit your role and the team?",
            "How do you stay updated with technical advancements in your field?",
            "On a scale of 1-5, how confident are you in your ability to [specific technical task]?"
        ],
        soft: [
            "Describe a situation where your communication skills were critical to a project's success.",
            "How do you handle constructive criticism or feedback?",
            "What is your approach to resolving conflicts within a team?",
            "How do you prioritize tasks when faced with multiple demands?",
            "Describe your experience leading a team or project."
        ],
        compliance: [
            "Are you familiar with [relevant industry regulations/company policies]?",
            "How do you ensure your work adheres to company compliance standards?",
            "What steps do you take to protect sensitive information?",
            "Have you completed all mandatory compliance training?",
            "Describe a situation where you had to address a potential compliance issue."
        ],
        software: [
            "How would you rate your proficiency in [Specific Software, e.g., Salesforce, Adobe Creative Suite]?",
            "Describe a task you completed using [Specific Software] that you found challenging.",
            "What features of [Specific Software] do you use most frequently?",
            "What training would help you use [Specific Software] more effectively?",
            "On a scale of 1-5, how confident are you in teaching others to use [Specific Software]?"
        ]
    };

    let selectedQuestions = questionsBank[skillArea] || [];

    // Add some role/department specific questions (placeholder logic)
    if (department.toLowerCase().includes('sales') && skillArea === 'soft') {
        selectedQuestions = ["How do you build rapport with clients?", ...selectedQuestions];
    }
    if (jobRole.toLowerCase().includes('developer') && skillArea === 'technical') {
        selectedQuestions = ["What's your preferred coding language and why?", ...selectedQuestions];
    }

    const shuffled = selectedQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('trainingNeedsForm');
    const leadCaptureForm = document.getElementById('leadCaptureForm');
    const leadEmailInput = document.getElementById('leadEmail');
    const leadCaptureMessage = document.getElementById('leadCaptureMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        logAnalyticsEvent('ToolSubmitted', { tool: 'EmployeeTrainingNeedsAssessment' });

        const department = document.getElementById('department').value;
        const jobRole = document.getElementById('jobRole').value;
        const skillArea = document.getElementById('skillArea').value;
        const numQuestions = parseInt(document.getElementById('numQuestions').value, 10);

        if (!department || !skillArea || isNaN(numQuestions) || numQuestions < 1 || numQuestions > 10) {
            alert('Please fill in all required fields and enter a valid number of questions (1-10).');
            return;
        }

        const generatedQuestions = generateAssessmentQuestions(department, jobRole, skillArea, numQuestions);

        const resultData = {
            inputs: {
                department,
                jobRole,
                skillArea,
                numQuestions,
            },
            results: {
                generatedQuestions,
            },
        };

        const encodedData = btoa(JSON.stringify(resultData));
        window.location.href = `/tools/results/employee-training-needs-assessment-results.html?data=${encodedData}`;
    });

    leadCaptureForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = leadEmailInput.value.trim();
        if (email) {
            logAnalyticsEvent('LeadCaptured', { tool: 'EmployeeTrainingNeedsAssessment', email: email });
            leadCaptureMessage.textContent = 'Thank you! Your comprehensive training & development resources will be sent to ' + email;
            leadCaptureMessage.classList.remove('hidden');
            leadEmailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
});