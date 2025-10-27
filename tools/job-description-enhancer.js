document.addEventListener('DOMContentLoaded', () => {
    const enhanceBtn = document.getElementById('enhance-description');
    const jobDescriptionInput = document.getElementById('job-description');
    const resultDiv = document.getElementById('result');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    const enhancementSuggestions = {
        inclusiveLanguage: [
            { original: 'he/she', suggestion: 'they' },
            { original: 'guys', suggestion: 'team' },
            { original: 'workforce', suggestion: 'team' },
            { original: 'manpower', suggestion: 'workforce' },
        ],
        actionVerbs: ['lead', 'drive', 'create', 'build', 'develop', 'implement', 'optimize'],
        requiredSkills: ['communication', 'teamwork', 'problem-solving', 'leadership'],
    };

    const enhanceDescription = () => {
        let description = jobDescriptionInput.value;
        if (!description) {
            alert('Please paste a job description.');
            return;
        }

        let enhancedDescription = description;
        let suggestionsHtml = '<h3>Enhancement Suggestions</h3><ul>';

        // Inclusive language suggestions
        enhancementSuggestions.inclusiveLanguage.forEach(term => {
            const regex = new RegExp(`\b${term.original}\b`, 'gi');
            if (regex.test(enhancedDescription)) {
                suggestionsHtml += `<li>Consider replacing "${term.original}" with "${term.suggestion}" for more inclusive language.</li>`;
                enhancedDescription = enhancedDescription.replace(regex, `<strong>${term.suggestion}</strong>`);
            }
        });

        // Check for action verbs
        const foundActionVerbs = enhancementSuggestions.actionVerbs.filter(verb => 
            new RegExp(`\b${verb}\b`, 'i').test(description)
        );
        if (foundActionVerbs.length < 3) {
            suggestionsHtml += '<li>Consider adding more action-oriented verbs to describe responsibilities (e.g., lead, drive, create).</li>';
        }

        // Check for required skills
        const missingSkills = enhancementSuggestions.requiredSkills.filter(skill => 
            !new RegExp(`\b${skill}\b`, 'i').test(description)
        );
        if (missingSkills.length > 0) {
            suggestionsHtml += `<li>Consider explicitly listing key skills like: ${missingSkills.join(', ')}.</li>`;
        }

        suggestionsHtml += '</ul>';

        resultDiv.innerHTML = `
            <h2>Enhanced Description</h2>
            <p>${enhancedDescription}</p>
            ${suggestionsHtml}
        `;

        resultDiv.style.display = 'block';
        emailCaptureDiv.style.display = 'block';

        logAnalytics('description_enhanced');
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^["\w-\\.]+@([\w-]+\\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Job Description Enhancer',
                timestamp: new Date().toISOString()
            };
            saveLead(leadData);
            emailMessage.textContent = 'Thank you! Your enhanced description has been sent to your email.';
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

    enhanceBtn.addEventListener('click', enhanceDescription);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);
});
