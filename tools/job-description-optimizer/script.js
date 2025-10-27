document.getElementById('optimize-btn').addEventListener('click', () => {
    const jobDescriptionInput = document.getElementById('job-description-input').value;
    const optimizedOutputDiv = document.getElementById('optimized-output');

    if (!jobDescriptionInput) {
        optimizedOutputDiv.innerHTML = '<p style="color: red;">Please paste the job description text.</p>';
        return;
    }

    let optimizedText = jobDescriptionInput;
    let feedback = [];

    // Optimization 1: Remove jargon (example)
    const jargonMap = {
        "synergy": "collaboration",
        "leverage": "use",
        "paradigm": "model",
        "bandwidth": "capacity"
    };
    for (const jargon in jargonMap) {
        const regex = new RegExp(`\b${jargon}\b`, 'gi');
        if (regex.test(optimizedText)) {
            optimizedText = optimizedText.replace(regex, jargonMap[jargon]);
            feedback.push(`Replaced jargon '${jargon}' with '${jargonMap[jargon]}'.`);
        }
    }

    // Optimization 2: Check for gender-neutral language (simple example)
    const genderedTerms = ["he/she", "him/her", "manpower"];
    const neutralReplacements = ["they", "them", "workforce"];
    genderedTerms.forEach((term, index) => {
        const regex = new RegExp(`\b${term}\b`, 'gi');
        if (regex.test(optimizedText)) {
            optimizedText = optimizedText.replace(regex, neutralReplacements[index]);
            feedback.push(`Replaced gendered term '${term}' with '${neutralReplacements[index]}'.`);
        }
    });

    // Optimization 3: Suggest adding benefits if not present (simple check)
    if (!/benefits|perks|compensation/i.test(optimizedText)) {
        feedback.push("Suggestion: Consider adding a section about company benefits or perks to attract more candidates.");
    }

    // Optimization 4: Suggest clear call to action
    if (!/apply now|submit your application/i.test(optimizedText)) {
        feedback.push("Suggestion: Ensure there is a clear call to action for candidates to apply.");
    }

    let html = `<h2>Optimized Job Description:</h2><p>${optimizedText}</p>`;
    if (feedback.length > 0) {
        html += `<h3>Optimization Feedback:</h3><ul>${feedback.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    optimizedOutputDiv.innerHTML = html;
});