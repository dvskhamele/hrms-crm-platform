document.getElementById('calculate-btn').addEventListener('click', () => {
    const technicalScore = parseFloat(document.getElementById('technical-score').value) || 0;
    const communicationScore = parseFloat(document.getElementById('communication-score').value) || 0;
    const problemSolvingScore = parseFloat(document.getElementById('problem-solving-score').value) || 0;
    const culturalFitScore = parseFloat(document.getElementById('cultural-fit-score').value) || 0;
    const resultsDiv = document.getElementById('results');

    if (technicalScore === 0 || communicationScore === 0 || problemSolvingScore === 0 || culturalFitScore === 0) {
        resultsDiv.innerHTML = '<p style="color: red;">Please enter scores for all criteria (1-5).</p>';
        return;
    }

    const totalScore = technicalScore + communicationScore + problemSolvingScore + culturalFitScore;
    const averageScore = totalScore / 4;

    let recommendation = "";
    if (averageScore >= 4) {
        recommendation = "Strong Hire";
    } else if (averageScore >= 3) {
        recommendation = "Consider for Hire";
    } else {
        recommendation = "Do Not Hire";
    }

    resultsDiv.innerHTML = `
        <h2>Interview Score: ${averageScore.toFixed(2)} / 5</h2>
        <h3>Recommendation: ${recommendation}</h3>
    `;
});
