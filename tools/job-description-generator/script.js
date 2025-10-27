document.getElementById('generate-btn').addEventListener('click', () => {
    const jobTitle = document.getElementById('job-title').value;
    const department = document.getElementById('department').value;
    const responsibilitiesInput = document.getElementById('responsibilities').value;
    const qualificationsInput = document.getElementById('qualifications').value;
    const jobDescriptionDiv = document.getElementById('job-description');

    if (!jobTitle || !department || !responsibilitiesInput || !qualificationsInput) {
        jobDescriptionDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const responsibilities = responsibilitiesInput.split(',').map(item => `<li>${item.trim()}</li>`).join('');
    const qualifications = qualificationsInput.split(',').map(item => `<li>${item.trim()}</li>`).join('');

    const jobDescriptionContent = `
        <h2>${jobTitle}</h2>
        <p><strong>Department:</strong> ${department}</p>
        <h3>Key Responsibilities:</h3>
        <ul>
            ${responsibilities}
        </ul>
        <h3>Required Qualifications:</h3>
        <ul>
            ${qualifications}
        </ul>
    `;

    jobDescriptionDiv.innerHTML = jobDescriptionContent;
});
