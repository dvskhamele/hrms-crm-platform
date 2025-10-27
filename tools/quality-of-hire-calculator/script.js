document.getElementById('calculate-btn').addEventListener('click', () => {
    const performanceRating = parseFloat(document.getElementById('performance-rating').value) || 0;
    const retentionRate = parseFloat(document.getElementById('retention-rate').value) || 0;
    const rampUpTime = parseFloat(document.getElementById('ramp-up-time').value) || 0;

    if (performanceRating === 0 || retentionRate === 0 || rampUpTime === 0) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Please enter all values.</p>';
        return;
    }

    // Normalize the values to a scale of 0-1
    const normalizedPerformance = performanceRating / 5;
    const normalizedRetention = retentionRate / 100;
    // Inverse ramp-up time, so a lower time is better
    const normalizedRampUp = 1 / rampUpTime;

    // A simple weighted average. You can adjust the weights as needed.
    const qualityOfHire = (normalizedPerformance * 0.5) + (normalizedRetention * 0.3) + (normalizedRampUp * 0.2);

    document.getElementById('results').innerHTML = `<h2>Your Quality of Hire Score is: ${(qualityOfHire * 100).toFixed(2)}%</h2>`;
});
