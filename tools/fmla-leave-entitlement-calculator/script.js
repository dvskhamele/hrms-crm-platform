document.getElementById('calculate-btn').addEventListener('click', () => {
    const hoursWorked = parseFloat(document.getElementById('hours-worked').value) || 0;
    const weeksWorked = parseFloat(document.getElementById('weeks-worked').value) || 0;
    const resultsDiv = document.getElementById('results');

    // FMLA eligibility criteria (simplified for demonstration):
    // 1. Works for a covered employer.
    // 2. Has worked for the employer for at least 12 months (need not be consecutive).
    // 3. Has worked at least 1,250 hours during the 12 months prior to the start of leave.
    // 4. Works at a location where the employer has 50 or more employees within 75 miles.

    // This calculator only checks criteria 2 and 3.
    const isEligibleMonths = weeksWorked >= 52; // At least 12 months (52 weeks)
    const isEligibleHours = hoursWorked >= 1250;

    let entitlementMessage = '';

    if (isEligibleMonths && isEligibleHours) {
        entitlementMessage = '<p style="color: green;">Based on hours and weeks worked, the employee is likely eligible for FMLA leave (up to 12 weeks).</p>';
    } else {
        let reasons = [];
        if (!isEligibleMonths) {
            reasons.push("has not worked for the employer for at least 12 months");
        }
        if (!isEligibleHours) {
            reasons.push("has not worked at least 1,250 hours during the 12 months prior to the start of leave");
        }
        entitlementMessage = `<p style="color: red;">Based on the provided data, the employee is likely NOT eligible for FMLA leave because they ${reasons.join(' and ')}.</p>`;
    }

    resultsDiv.innerHTML = `<h2>FMLA Entitlement:</h2>${entitlementMessage}<p><em>Note: This is a simplified calculation and does not account for all FMLA eligibility criteria or specific state laws. Consult with an HR professional or legal counsel for definitive guidance.</em></p>`;
});
