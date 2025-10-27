document.addEventListener('DOMContentLoaded', () => {
    const gradeDescriptionBtn = document.getElementById('grade-description');
    const jobDescriptionInput = document.getElementById('job-description');
    const gradeOutputDiv = document.getElementById('grade-output');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    const gradingCriteria = {
        keywords: {
            'inclusive_language': ['diverse', 'inclusive', 'everyone', 'all applicants'],
            'action_verbs': ['lead', 'manage', 'develop', 'create', 'drive', 'implement'],
            'skill_specific': ['javascript', 'python', 'cloud', 'leadership', 'communication'],
        },
        readability: [ // Flesch-Kincaid considerations, simplified
            { threshold: 15, grade: 'Excellent (Easy to Read)' },
            { threshold: 20, grade: 'Good (Clear)' },
            { threshold: 25, grade: 'Average (Readable)' },
            { threshold: 30, grade: 'Fair (Slightly Difficult)' },
            { threshold: Infinity, grade: 'Poor (Difficult to Read)' },
        ],
    };

    const gradeDescription = () => {
        const description = jobDescriptionInput.value;
        if (!description) {
            alert('Please paste a job description.');
            return;
        }

        let score = 0;
        let feedback = [];

        // --- Inclusivity Check ---
        let inclusiveScore = 0;
        gradingCriteria.keywords.inclusive_language.forEach(keyword => {
            if (new RegExp(`\b${keyword}\b`, 'gi').test(description)) {
                inclusiveScore += 1;
            }
        });
        if (inclusiveScore >= 2) {
            feedback.push('Your job description uses inclusive language. (+2 points)');
            score += 2;
        } else {
            feedback.push('Consider adding more inclusive language to attract diverse candidates. (+0 points)');
        }

        // --- Action Verbs Check ---
        let actionVerbCount = 0;
        gradingCriteria.keywords.action_verbs.forEach(keyword => {
            if (new RegExp(`\b${keyword}\b`, 'gi').test(description)) {
                actionVerbCount += 1;
            }
        });
        if (actionVerbCount >= 3) {
            feedback.push(`Excellent use of action verbs (${actionVerbCount}). (+3 points)`);
            score += 3;
        } else if (actionVerbCount >= 1) {
            feedback.push(`Good use of action verbs (${actionVerbCount}), consider adding more. (+1 point)`);
            score += 1;
        } else {
            feedback.push('Incorporate more action verbs to clearly define responsibilities. (+0 points)');
        }

        // --- Readability Check (Simplified based on word count per sentence) ---
        const sentences = description.split(/[.!?]\s*/).filter(s => s.trim().length > 0);
        const words = description.split(/\s+/).filter(w => w.length > 0);
        const avgWordsPerSentence = words.length / sentences.length;

        let readabilityGrade = 'N/A';
        let readabilityScore = 0;
        for (const criterion of gradingCriteria.readability) {
            if (avgWordsPerSentence <= criterion.threshold) {
                readabilityGrade = criterion.grade;
                if (criterion.grade.includes('Excellent')) readabilityScore = 3;
                else if (criterion.grade.includes('Good')) readabilityScore = 2;
                else if (criterion.grade.includes('Average')) readabilityScore = 1;
                break;
            }
        }
        feedback.push(`Readability: ${readabilityGrade}. (+${readabilityScore} points)`);
        score += readabilityScore;

        // --- Overall Grade ---
        let overallGrade = '';
        if (score >= 7) { overallGrade = 'A+ (Outstanding)'; } 
        else if (score >= 5) { overallGrade = 'B (Very Good)'; }
        else if (score >= 3) { overallGrade = 'C (Good)'; }
        else { overallGrade = 'D (Needs Improvement)'; }


        gradeOutputDiv.innerHTML = `
            <h2>Job Description Grade: ${overallGrade}</h2>
            <h3>Detailed Feedback:</h3>
            <ul>
                ${feedback.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p class="mt-4"><strong>Overall Score: ${score}/10</strong></p>
        `;
        gradeOutputDiv.style.display = 'block';
        emailCaptureDiv.style.display = 'block';

        logAnalytics('job_description_graded');
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^["\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Job Description Grader',
                timestamp: new Date().toISOString()
            };
            saveLead(leadData);
            emailMessage.textContent = 'Thank you! Your grade report has been sent to your email.';
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

    gradeDescriptionBtn.addEventListener('click', gradeDescription);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);
});
