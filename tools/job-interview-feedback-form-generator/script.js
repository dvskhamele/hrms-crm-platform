document.getElementById('generate-btn').addEventListener('click', () => {
    const candidateName = document.getElementById('candidate-name').value;
    const jobTitle = document.getElementById('job-title').value;
    const interviewerName = document.getElementById('interviewer-name').value;
    const feedbackCriteriaInput = document.getElementById('feedback-criteria').value;
    const feedbackFormDiv = document.getElementById('feedback-form');

    if (!candidateName || !jobTitle || !interviewerName || !feedbackCriteriaInput) {
        feedbackFormDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const criteria = feedbackCriteriaInput.split(',').map(item => item.trim());

    let html = `
        <h2>Interview Feedback Form</h2>
        <p><strong>Candidate Name:</strong> ${candidateName}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Interviewer Name:</strong> ${interviewerName}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        
        <h3>Evaluation Criteria:</h3>
        <table>
            <thead>
                <tr>
                    <th>Criterion</th>
                    <th>Rating (1-5)</th>
                    <th>Comments</th>
                </tr>
            </thead>
            <tbody>
    `;

    criteria.forEach(criterion => {
        html += `
            <tr>
                <td>${criterion}</td>
                <td><input type="number" min="1" max="5"></td>
                <td><textarea rows="1"></textarea></td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        
        <h3>Overall Impression:</h3>
        <textarea rows="3" style="width: 100%;"></textarea>
        
        <h3>Recommendation:</h3>
        <label><input type="radio" name="recommendation" value="hire"> Hire</label>
        <label><input type="radio" name="recommendation" value="no-hire"> Do Not Hire</label>
        <label><input type="radio" name="recommendation" value="further-consideration"> Further Consideration</label>
    `;

    feedbackFormDiv.innerHTML = html;
});