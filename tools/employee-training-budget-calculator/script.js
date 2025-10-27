document.getElementById('calculate-btn').addEventListener('click', () => {
    const numEmployees = parseFloat(document.getElementById('num-employees').value) || 0;
    const avgCourseCost = parseFloat(document.getElementById('avg-course-cost').value) || 0;
    const travelLodging = parseFloat(document.getElementById('travel-lodging').value) || 0;
    const lostProductivity = parseFloat(document.getElementById('lost-productivity').value) || 0;
    const resultsDiv = document.getElementById('results');

    if (numEmployees === 0) {
        resultsDiv.innerHTML = '<p style="color: red;">Please enter the number of employees to train.</p>';
        return;
    }

    const costPerEmployee = avgCourseCost + travelLodging + lostProductivity;
    const totalTrainingBudget = costPerEmployee * numEmployees;

    resultsDiv.innerHTML = `
        <h2>Total Employee Training Budget:</h2>
        <p><strong>Cost Per Employee:</strong> $${costPerEmployee.toFixed(2)}</p>
        <p><strong>Total Budget:</strong> $${totalTrainingBudget.toFixed(2)}</p>
    `;
});
