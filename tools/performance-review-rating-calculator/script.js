document.getElementById('calculate-btn').addEventListener('click', () => {
    const goalAchievement = parseFloat(document.getElementById('goal-achievement').value) || 0;
    const competencyScore = parseFloat(document.getElementById('competency-score').value) || 0;
    const overallContribution = parseFloat(document.getElementById('overall-contribution').value) || 0;
    const resultsDiv = document.getElementById('results');

    if (goalAchievement === 0 || competencyScore === 0 || overallContribution === 0) {
        resultsDiv.innerHTML = '<p style="color: red;">Please enter scores for all criteria (1-5).</p>';
        return;
    }

    const totalScore = goalAchievement + competencyScore + overallContribution;
    const averageScore = totalScore / 3;

    let overallRating = "";
    if (averageScore >= 4.5) {
        overallRating = "Outstanding";
    } else if (averageScore >= 3.5) {
        overallRating = "Exceeds Expectations";
    } else if (averageScore >= 2.5) {
        overallRating = "Meets Expectations";
    } else if (averageScore >= 1.5) {
        overallRating = "Needs Improvement";
    } else {
        overallRating = "Unsatisfactory";
    }

    resultsDiv.innerHTML = `
        <h2>Overall Performance Rating: ${averageScore.toFixed(2)} / 5</h2>
        <h3>Rating: ${overallRating}</h3>
    `;
});
