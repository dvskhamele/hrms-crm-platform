document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const areaOfConcern = document.getElementById('area-of-concern').value;
    const desiredOutcome = document.getElementById('desired-outcome').value;
    const actionStepsInput = document.getElementById('action-steps').value;
    const timeline = document.getElementById('timeline').value;
    const pipDiv = document.getElementById('pip');

    if (!employeeName || !areaOfConcern || !desiredOutcome || !actionStepsInput || !timeline) {
        pipDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const actionSteps = actionStepsInput.split(',').map(step => `<li>${step.trim()}</li>`).join('');

    const pipContent = `
        <h2>Performance Improvement Plan for ${employeeName}</h2>
        <p><strong>Area of Concern:</strong> ${areaOfConcern}</p>
        <p><strong>Desired Outcome:</strong> ${desiredOutcome}</p>
        <p><strong>Action Steps:</strong></p>
        <ul>
            ${actionSteps}
        </ul>
        <p><strong>Timeline:</strong> ${timeline}</p>
    `;

    pipDiv.innerHTML = pipContent;
});
