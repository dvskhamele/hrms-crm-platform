document.addEventListener('DOMContentLoaded', () => {
    const jobDescriptionTextarea = document.getElementById('job-description');
    const targetKeywordsInput = document.getElementById('target-keywords');
    const optimizeBtn = document.getElementById('optimize-btn');
    const suggestionsOutput = document.getElementById('suggestions-output');

    optimizeBtn.addEventListener('click', () => {
        const jobDescription = jobDescriptionTextarea.value.toLowerCase();
        const targetKeywords = targetKeywordsInput.value.toLowerCase().split(',').map(kw => kw.trim()).filter(kw => kw.length > 0);

        suggestionsOutput.innerHTML = ''; // Clear previous suggestions

        if (jobDescription.length === 0) {
            suggestionsOutput.innerHTML = '<p>Please paste a job description to analyze.</p>';
            return;
        }

        if (targetKeywords.length === 0) {
            suggestionsOutput.innerHTML = '<p>Please enter some target keywords to optimize against.</p>';
            return;
        }

        let missingKeywords = [];
        let keywordDensity = {};
        let totalWords = jobDescription.split(/\s+/).filter(word => word.length > 0).length;

        // Calculate keyword density and find missing keywords
        targetKeywords.forEach(keyword => {
            const regex = new RegExp(`\b${keyword}\b`, 'g');
            const matches = (jobDescription.match(regex) || []).length;
            keywordDensity[keyword] = (matches / totalWords * 100).toFixed(2);

            if (matches === 0) {
                missingKeywords.push(keyword);
            }
        });

        // Generate suggestions
        let suggestionsHtml = '<h3>Analysis Results:</h3>';

        if (missingKeywords.length > 0) {
            suggestionsHtml += '<p><strong>Missing Keywords:</strong> The following target keywords were not found in your job description. Consider adding them naturally:</p>';
            suggestionsHtml += '<ul>';
            missingKeywords.forEach(kw => {
                suggestionsHtml += `<li>${kw}</li>`;
            });
            suggestionsHtml += '</ul>';
        } else {
            suggestionsHtml += '<p>All your target keywords were found in the job description!</p>';
        }

        suggestionsHtml += '<p><strong>Keyword Density:</strong> (Occurrences per 100 words)</p>';
        suggestionsHtml += '<ul>';
        for (const keyword in keywordDensity) {
            suggestionsHtml += `<li>"${keyword}": ${keywordDensity[keyword]}%</li>`;
        }
        suggestionsHtml += '</ul>';

        suggestionsHtml += '<p><strong>General Tips:</strong></p>';
        suggestionsHtml += '<ul>';
        suggestionsHtml += '<li>Ensure keywords are integrated naturally, not just stuffed.</li>';
        suggestionsHtml += '<li>Use variations and synonyms of your target keywords.</li>';
        suggestionsHtml += '<li>Keep sentences clear and concise for readability.</li>';
        suggestionsHtml += '<li>Highlight key responsibilities and required skills prominently.</li>';
        suggestionsHtml += '</ul>';

        suggestionsOutput.innerHTML = suggestionsHtml;
    });
});