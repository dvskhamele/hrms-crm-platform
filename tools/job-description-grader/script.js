document.getElementById('grade-btn').addEventListener('click', () => {
    const jobDescriptionText = document.getElementById('job-description-text').value;
    const resultsDiv = document.getElementById('results');

    if (!jobDescriptionText) {
        resultsDiv.innerHTML = '<p style="color: red;">Please paste the job description text.</p>';
        return;
    }

    let score = 0;
    let feedback = [];

    // Criteria 1: Length (ideal: 300-700 words)
    const wordCount = jobDescriptionText.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount >= 300 && wordCount <= 700) {
        score += 2;
        feedback.push("Good length: The job description is a good length (300-700 words).");
    } else if (wordCount < 300) {
        score += 1;
        feedback.push("Consider expanding: The job description might be too short. Aim for more detail.");
    } else {
        feedback.push("Consider shortening: The job description might be too long. Focus on key information.");
    }

    // Criteria 2: Clarity (presence of keywords like 'responsibilities', 'qualifications', 'benefits')
    const hasResponsibilities = /responsibilities/i.test(jobDescriptionText);
    const hasQualifications = /qualifications/i.test(jobDescriptionText);
    const hasBenefits = /benefits/i.test(jobDescriptionText);

    if (hasResponsibilities) {
        score += 1;
        feedback.push("Clear responsibilities: The job description clearly outlines responsibilities.");
    } else {
        feedback.push("Missing responsibilities: Ensure key responsibilities are clearly stated.");
    }
    if (hasQualifications) {
        score += 1;
        feedback.push("Clear qualifications: The job description clearly outlines qualifications.");
    } else {
        feedback.push("Missing qualifications: Ensure required qualifications are clearly stated.");
    }
    if (hasBenefits) {
        score += 1;
        feedback.push("Benefits mentioned: The job description mentions benefits.");
    } else {
        feedback.push("Consider adding benefits: Mentioning benefits can attract more candidates.");
    }

    // Criteria 3: Inclusive Language (simple check for common non-inclusive terms - very basic)
    const nonInclusiveTerms = ["ninja", "rockstar", "guru", "he/she"];
    let inclusiveLanguageScore = 1;
    nonInclusiveTerms.forEach(term => {
        if (new RegExp(term, "i").test(jobDescriptionText)) {
            inclusiveLanguageScore = 0;
            feedback.push(`Non-inclusive language detected: Avoid terms like '${term}'.`);
        }
    });
    score += inclusiveLanguageScore;
    if (inclusiveLanguageScore === 1) {
        feedback.push("Inclusive language: No obvious non-inclusive terms detected.");
    }

    let grade = "";
    let gradeClass = "";
    if (score >= 5) {
        grade = "Excellent";
        gradeClass = "grade-good";
    } else if (score >= 3) {
        grade = "Good";
        gradeClass = "grade-average";
    } else {
        grade = "Needs Improvement";
        gradeClass = "grade-poor";
    }

    resultsDiv.innerHTML = `
        <h2>Job Description Grade: <span class="${gradeClass}">${grade}</span> (Score: ${score}/6)</h2>
        <h3>Feedback:</h3>
        <ul>
            ${feedback.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
});