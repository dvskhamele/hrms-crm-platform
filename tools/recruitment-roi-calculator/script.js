document.getElementById('calculate-btn').addEventListener('click', () => {
    const totalRecruitmentCosts = parseFloat(document.getElementById('total-recruitment-costs').value) || 0;
    const totalValueOfHires = parseFloat(document.getElementById('total-value-of-hires').value) || 0;

    if (totalRecruitmentCosts === 0) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Please enter total recruitment costs.</p>';
        return;
    }

    const recruitmentROI = ((totalValueOfHires - totalRecruitmentCosts) / totalRecruitmentCosts) * 100;

    document.getElementById('results').innerHTML = `<h2>Recruitment ROI: ${recruitmentROI.toFixed(2)}%</h2>`;
});