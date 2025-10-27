document.getElementById('calculate-btn').addEventListener('click', () => {
    const totalTrainingCosts = parseFloat(document.getElementById('total-training-costs').value) || 0;
    const monetaryBenefits = parseFloat(document.getElementById('monetary-benefits').value) || 0;

    if (totalTrainingCosts === 0) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Please enter total training costs.</p>';
        return;
    }

    const trainingROI = ((monetaryBenefits - totalTrainingCosts) / totalTrainingCosts) * 100;

    document.getElementById('results').innerHTML = `<h2>Training ROI: ${trainingROI.toFixed(2)}%</h2>`;
});