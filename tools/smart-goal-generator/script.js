const goalIdeaInput = document.getElementById('goal-idea');
const generateBtn = document.getElementById('generate-btn');
const smartGoalPre = document.getElementById('smart-goal');

generateBtn.addEventListener('click', () => {
    const goalIdea = goalIdeaInput.value.trim();

    if (!goalIdea) {
        smartGoalPre.textContent = "Please enter a goal idea.";
        return;
    }

    let smartGoal = `
**SMART Goal:**

**Specific:** What exactly needs to be achieved? Who is involved? Where will it take place? Why is this goal important?
    *   To ${goalIdea.toLowerCase()} by [specific action, e.g., implementing a new feedback system].

**Measurable:** How will progress be tracked? What metrics will indicate success?
    *   Success will be measured by [specific metric, e.g., a 15% increase in positive customer feedback scores] within [timeframe].

**Achievable:** Is the goal realistic and attainable given available resources and constraints?
    *   This goal is achievable as [reason, e.g., we have the necessary resources and team support].

**Relevant:** Does the goal align with broader objectives and priorities?
    *   This goal is relevant as it directly contributes to [broader objective, e.g., enhancing our brand reputation and customer loyalty].

**Time-bound:** What is the deadline for achieving the goal?
    *   The target completion date for this goal is [specific date, e.g., December 31, 2025].

**Example SMART Goal:**
"To improve customer satisfaction by implementing a new feedback system, resulting in a 15% increase in positive customer feedback scores by December 31, 2025, which will enhance our brand reputation and customer loyalty."
    `;

    // Attempt to make the example more specific based on the input idea
    if (goalIdea.toLowerCase().includes('customer satisfaction')) {
        smartGoal = smartGoal.replace('To improve customer satisfaction by [specific action, e.g., implementing a new feedback system].', 'To improve customer satisfaction by implementing a new customer feedback survey and acting on the results.');
        smartGoal = smartGoal.replace('a 15% increase in positive customer feedback scores', 'a 15% increase in our Net Promoter Score (NPS)');
    } else if (goalIdea.toLowerCase().includes('sales') || goalIdea.toLowerCase().includes('revenue')) {
        smartGoal = smartGoal.replace('To improve customer satisfaction by [specific action, e.g., implementing a new feedback system].', 'To increase sales revenue by launching a new product line.');
        smartGoal = smartGoal.replace('a 15% increase in positive customer feedback scores', 'a 20% increase in quarterly sales revenue');
        smartGoal = smartGoal.replace('enhancing our brand reputation and customer loyalty', 'achieving our quarterly financial targets');
    }

    smartGoalPre.textContent = smartGoal;
});
