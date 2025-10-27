document.getElementById('generate-btn').addEventListener('click', () => {
    const goalDescription = document.getElementById('goal-description').value;
    const measurable = document.getElementById('measurable').value;
    const achievable = document.getElementById('achievable').value;
    const relevant = document.getElementById('relevant').value;
    const timeBound = document.getElementById('time-bound').value;

    if (!goalDescription || !measurable || !achievable || !relevant || !timeBound) {
        document.getElementById('smart-goal').innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const smartGoal = `
        <h2>Your SMART Goal:</h2>
        <p><strong>Specific:</strong> ${goalDescription}</p>
        <p><strong>Measurable:</strong> ${measurable}</p>
        <p><strong>Achievable:</strong> ${achievable}</p>
        <p><strong>Relevant:</strong> ${relevant}</p>
        <p><strong>Time-bound:</strong> ${timeBound}</p>
    `;

    document.getElementById('smart-goal').innerHTML = smartGoal;
});
