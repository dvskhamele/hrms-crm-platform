document.getElementById('calculate-btn').addEventListener('click', () => {
    const advertisingCosts = parseFloat(document.getElementById('advertising-costs').value) || 0;
    const agencyFees = parseFloat(document.getElementById('agency-fees').value) || 0;
    const softwareTools = parseFloat(document.getElementById('software-tools').value) || 0;
    const interviewerTime = parseFloat(document.getElementById('interviewer-time').value) || 0;
    const otherRecruitmentExpenses = parseFloat(document.getElementById('other-recruitment-expenses').value) || 0;

    const totalBudget = advertisingCosts + agencyFees + softwareTools + interviewerTime + otherRecruitmentExpenses;

    document.getElementById('results').innerHTML = `<h2>Total Recruitment Budget: $${totalBudget.toFixed(2)}</h2>`;
});
