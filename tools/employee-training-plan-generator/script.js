document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const role = document.getElementById('role').value;
    const trainingNeedsInput = document.getElementById('training-needs').value;
    const timeline = document.getElementById('timeline').value;
    const trainingPlanDiv = document.getElementById('training-plan');

    if (!employeeName || !role || !trainingNeedsInput || !timeline) {
        trainingPlanDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const trainingNeeds = trainingNeedsInput.split(',').map(item => `<li>${item.trim()}</li>`).join('');

    const trainingPlanContent = `
        <h2>Training Plan for ${employeeName} (${role})</h2>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <h3>Identified Training Needs:</h3>
        <ul>
            ${trainingNeeds}
        </ul>
        <h3>Recommended Training Activities:</h3>
        <ul>
            <li>Online courses related to identified needs.</li>
            <li>Workshops or seminars on specific skills.</li>
            <li>Mentorship or coaching from experienced colleagues.</li>
            <li>On-the-job training and practical application.</li>
            <li>Regular check-ins with manager to review progress.</li>
        </ul>
        <h3>Expected Outcomes:</h3>
        <p>Upon completion of this training plan, ${employeeName} is expected to demonstrate improved proficiency in the identified training needs, leading to enhanced job performance and career development.</p>
    `;

    trainingPlanDiv.innerHTML = trainingPlanContent;
});