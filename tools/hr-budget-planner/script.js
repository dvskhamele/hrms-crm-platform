document.getElementById('calculate-btn').addEventListener('click', () => {
    const salaries = parseFloat(document.getElementById('salaries').value) || 0;
    const benefits = parseFloat(document.getElementById('benefits').value) || 0;
    const recruitment = parseFloat(document.getElementById('recruitment').value) || 0;
    const training = parseFloat(document.getElementById('training').value) || 0;
    const other = parseFloat(document.getElementById('other').value) || 0;

    const totalBudget = salaries + benefits + recruitment + training + other;

    document.getElementById('results').innerHTML = `<h2>Total HR Budget: $${totalBudget.toFixed(2)}</h2>`;
});
