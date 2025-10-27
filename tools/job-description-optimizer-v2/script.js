document.addEventListener('DOMContentLoaded', () => {
    const jobDescriptionInput = document.getElementById('job-description-input');
    const optimizeBtn = document.getElementById('optimize-btn');
    const suggestionsOutput = document.getElementById('suggestions-output');

    optimizeBtn.addEventListener('click', () => {
        const jdText = jobDescriptionInput.value.toLowerCase();
        let suggestions = [];

        if (jdText.trim() === '') {
            suggestions.push("Please paste your job description to get suggestions.");
            renderSuggestions(suggestions);
            return;
        }

        // 1. Inclusivity Check
        if (jdText.includes('rockstar') || jdText.includes('ninja') || jdText.includes('guru')) {
            suggestions.push("Consider using inclusive language. Words like 'rockstar' or 'ninja' might deter some candidates. Try 'high-performing' or 'expert' instead.");
        }
        if (jdText.match(/he\/she|him\/her/g)) {
            suggestions.push("Use gender-neutral pronouns like 'they/them' or rephrase sentences to avoid gender-specific language.");
        }

        // 2. SEO Keywords
        const commonJobTitles = ['software engineer', 'project manager', 'marketing specialist', 'data analyst', 'sales representative', 'customer service'];
        let foundKeyword = false;
        for (const title of commonJobTitles) {
            if (jdText.includes(title)) {
                foundKeyword = true;
                break;
            }
        }
        if (!foundKeyword) {
            suggestions.push("Ensure your job title and description contain relevant keywords that job seekers might use in searches.");
        }

        // 3. Clarity and Brevity
        if (jdText.length > 1500) {
            suggestions.push("Your job description is quite long. Consider shortening it to improve readability and candidate engagement.");
        }
        if (jdText.split('.').length < 5 && jdText.length > 500) {
            suggestions.push("Break up long paragraphs into shorter sentences or bullet points for better readability.");
        }

        // 4. Responsibilities vs. Requirements
        if (!jdText.includes('responsibilities:') && !jdText.includes('you will:')) {
            suggestions.push("Clearly delineate a 'Responsibilities' or 'What You'll Do' section so candidates understand the core tasks.");
        }
        if (!jdText.includes('requirements:') && !jdText.includes('qualifications:')) {
            suggestions.push("Clearly list 'Requirements' or 'Qualifications' so candidates know what skills are essential.");
        }

        if (suggestions.length === 0) {
            suggestions.push("Your job description looks great! No specific suggestions at this time.");
        }

        renderSuggestions(suggestions);
    });

    function renderSuggestions(suggestionsArray) {
        suggestionsOutput.innerHTML = ''; // Clear previous suggestions
        if (suggestionsArray.length > 0) {
            const ul = document.createElement('ul');
            suggestionsArray.forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = suggestion;
                ul.appendChild(li);
            });
            suggestionsOutput.appendChild(ul);
        } else {
            suggestionsOutput.innerHTML = '<p class="placeholder">No specific suggestions at this time.</p>';
        }
    }
});
