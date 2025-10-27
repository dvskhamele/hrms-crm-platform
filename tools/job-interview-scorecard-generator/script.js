const generateButton = document.getElementById('generate-btn');
const scorecardDiv = document.getElementById('scorecard');

generateButton.addEventListener('click', () => {
    const jobTitle = document.getElementById('job-title').value;
    const interviewCriteriaInput = document.getElementById('interview-criteria').value;

    if (!jobTitle || !interviewCriteriaInput) {
        scorecardDiv.innerHTML = '<p style="color: red;">Please enter job title and interview criteria.</p>';
        return;
    }

    const criteria = interviewCriteriaInput.split(',').map(item => item.trim());

    let html = `<h2>Interview Scorecard for ${jobTitle}</h2>`;
    html += '<table>';
    html += '<thead><tr><th>Criteria</th><th>Rating (1-5)</th><th>Comments</th></tr></thead>';
    html += '<tbody>';
    criteria.forEach(criterion => {
        html += `<tr><td>${criterion}</td><td></td><td></td></tr>`;
    });
    html += '</tbody>';
    html += '</table>';
    html += `
        <h3>Overall Recommendation:</h3>
        <p>____________________________________________________________________________________________________</p>
        <h3>Interviewer Name:</h3>
        <p>_________________________</p>
        <h3>Date:</h3>
        <p>_________________________</p>
    `;

    scorecardDiv.innerHTML = html;
});
