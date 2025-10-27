document.getElementById('generate-btn').addEventListener('click', () => {
    const programName = document.getElementById('program-name').value;
    const referralBonus = parseFloat(document.getElementById('referral-bonus').value) || 0;
    const eligibility = document.getElementById('eligibility').value;
    const processStepsInput = document.getElementById('process-steps').value;
    const programOutlineDiv = document.getElementById('program-outline');

    if (!programName || !referralBonus || !eligibility || !processStepsInput) {
        programOutlineDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const processSteps = processStepsInput.split(',').map(step => `<li>${step.trim()}</li>`).join('');

    const programOutlineContent = `
        <h2>${programName}</h2>
        <p><strong>Referral Bonus:</strong> $${referralBonus.toLocaleString()}</p>
        <h3>Eligibility Criteria:</h3>
        <p>${eligibility}</p>
        <h3>Process Steps:</h3>
        <ul>
            ${processSteps}
        </ul>
        <p>Encourage your employees to refer talented individuals to our company and be rewarded!</p>
    `;

    programOutlineDiv.innerHTML = programOutlineContent;
});