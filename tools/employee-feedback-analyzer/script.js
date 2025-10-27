document.getElementById('analyze-btn').addEventListener('click', () => {
    const feedbackText = document.getElementById('feedback-text').value;
    const resultsDiv = document.getElementById('results');

    if (!feedbackText) {
        resultsDiv.innerHTML = '<p style="color: red;">Please paste employee feedback.</p>';
        return;
    }

    const feedbackEntries = feedbackText.split('\n').map(entry => entry.trim()).filter(entry => entry.length > 0);

    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    let themes = {};

    feedbackEntries.forEach(entry => {
        // Simple sentiment analysis (keyword-based)
        if (/excellent|great|positive|satisfied|love|good|strong/i.test(entry)) {
            positiveCount++;
        } else if (/poor|bad|negative|dissatisfied|hate|weak|struggle|lack/i.test(entry)) {
            negativeCount++;
        } else {
            neutralCount++;
        }

        // Simple theme extraction (example keywords)
        if (/team|collaboration|colleagues/i.test(entry)) {
            themes.team = (themes.team || 0) + 1;
        }
        if (/growth|development|career|opportunities/i.test(entry)) {
            themes.growth = (themes.growth || 0) + 1;
        }
        if (/management|manager|leadership/i.test(entry)) {
            themes.management = (themes.management || 0) + 1;
        }
        if (/workload|stress|balance/i.test(entry)) {
            themes.workload = (themes.workload || 0) + 1;
        }
    });

    let html = `<h2>Feedback Analysis Results:</h2>`;
    html += `<h3>Sentiment Analysis:</h3>`;
    html += `<p>Positive: <span class="sentiment-positive">${positiveCount}</span></p>`;
    html += `<p>Negative: <span class="sentiment-negative">${negativeCount}</span></p>`;
    html += `<p>Neutral: <span class="sentiment-neutral">${neutralCount}</span></p>`;

    html += `<h3>Common Themes:</h3>`;
    if (Object.keys(themes).length > 0) {
        html += '<ul>';
        for (const theme in themes) {
            html += `<li>${theme.charAt(0).toUpperCase() + theme.slice(1)}: ${themes[theme]} mentions</li>`;
        }
        html += '</ul>';
    } else {
        html += '<p>No common themes identified (try more diverse feedback).</p>';
    }

    resultsDiv.innerHTML = html;
});