document.getElementById('calculate-btn').addEventListener('click', () => {
    const internalCosts = parseFloat(document.getElementById('internal-costs').value) || 0;
    const externalCosts = parseFloat(document.getElementById('external-costs').value) || 0;
    const hires = parseInt(document.getElementById('hires').value) || 0;

    if (hires === 0) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Please enter the number of hires.</p>';
        return;
    }

    const totalCosts = internalCosts + externalCosts;
    const costPerHire = totalCosts / hires;

    document.getElementById('results').innerHTML = `<h2>Your Cost Per Hire is: $${costPerHire.toFixed(2)}</h2>`;
});
