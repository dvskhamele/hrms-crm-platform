document.getElementById('schedule-btn').addEventListener('click', () => {
    const candidateName = document.getElementById('candidate-name').value;
    const interviewerName = document.getElementById('interviewer-name').value;
    const interviewDate = new Date(document.getElementById('interview-date').value);

    if (!candidateName || !interviewerName || isNaN(interviewDate)) {
        document.getElementById('confirmation').innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const confirmationMessage = `
        <h2>Interview Scheduled!</h2>
        <p><strong>Candidate:</strong> ${candidateName}</p>
        <p><strong>Interviewer:</strong> ${interviewerName}</p>
        <p><strong>Date:</strong> ${interviewDate.toLocaleString()}</p>
    `;

    document.getElementById('confirmation').innerHTML = confirmationMessage;
});
