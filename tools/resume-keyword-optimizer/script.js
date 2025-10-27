document.getElementById('optimize-btn').addEventListener('click', () => {
    const jobDescriptionText = document.getElementById('job-description-text').value;
    const resumeText = document.getElementById('resume-text').value;
    const resultsDiv = document.getElementById('results');

    if (!jobDescriptionText || !resumeText) {
        resultsDiv.innerHTML = '<p style="color: red;">Please paste both the job description and your resume text.</p>';
        return;
    }

    const extractKeywords = (text) => {
        // Simple extraction: split by non-alphanumeric, filter short words, convert to lowercase, remove duplicates
        return [...new Set(text.toLowerCase().split(/[^a-z0-9]+/g).filter(word => word.length > 2))];
    };

    const jdKeywords = extractKeywords(jobDescriptionText);
    const resumeKeywords = extractKeywords(resumeText);

    const matchedKeywords = jdKeywords.filter(keyword => resumeKeywords.includes(keyword));
    const missingKeywords = jdKeywords.filter(keyword => !resumeKeywords.includes(keyword));

    let html = '<h2>Keyword Optimization Results:</h2>';

    if (jdKeywords.length > 0) {
        html += `<p><strong>Job Description Keywords (${jdKeywords.length}):</strong> ${jdKeywords.join(', ')}</p>`;
    }

    if (matchedKeywords.length > 0) {
        html += `<p><span class="keyword-match">Matched Keywords (${matchedKeywords.length}):</span> ${matchedKeywords.join(', ')}</p>`;
    } else {
        html += '<p style="color: orange;">No direct keyword matches found. Consider adding more relevant terms.</p>';
    }

    if (missingKeywords.length > 0) {
        html += `<p><span class="keyword-missing">Missing Keywords (${missingKeywords.length}):</span> ${missingKeywords.join(', ')}</p>`;
        html += '<p>Consider incorporating these missing keywords into your resume where appropriate.</p>';
    } else {
        html += '<p style="color: green;">Great! All identified job description keywords are present in your resume.</p>';
    }

    resultsDiv.innerHTML = html;
});
