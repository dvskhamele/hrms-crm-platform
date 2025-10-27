document.getElementById('calculate-btn').addEventListener('click', () => {
    const promoters = parseInt(document.getElementById('promoters').value) || 0;
    const passives = parseInt(document.getElementById('passives').value) || 0;
    const detractors = parseInt(document.getElementById('detractors').value) || 0;

    const totalRespondents = promoters + passives + detractors;

    if (totalRespondents === 0) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Please enter the number of respondents.</p>';
        return;
    }

    const promoterPercentage = (promoters / totalRespondents) * 100;
    const detractorPercentage = (detractors / totalRespondents) * 100;

    const enpsScore = promoterPercentage - detractorPercentage;

    document.getElementById('results').innerHTML = `<h2>Your eNPS Score is: ${enpsScore.toFixed(2)}</h2>`;
});
