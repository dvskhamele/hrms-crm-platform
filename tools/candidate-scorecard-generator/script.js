const jobRoleInput = document.getElementById('job-role');
const keyCompetenciesInput = document.getElementById('key-competencies');
const generateBtn = document.getElementById('generate-btn');
const generatedScorecardPre = document.getElementById('generated-scorecard');

generateBtn.addEventListener('click', () => {
    const jobRole = jobRoleInput.value.trim();
    const competencies = keyCompetenciesInput.value.split(',').map(comp => comp.trim()).filter(comp => comp !== '');

    let scorecardContent = `
**Candidate Interview Scorecard for ${jobRole || '[Job Role]'}**

**Candidate Name:** _________________________
**Interviewer Name:** _________________________
**Date:** ${new Date().toLocaleDateString()}

---

**Rating Scale:**
1 = Does Not Meet Expectations
2 = Partially Meets Expectations
3 = Meets Expectations
4 = Exceeds Expectations
5 = Significantly Exceeds Expectations

---

**Key Competencies:**

`;

    if (competencies.length > 0) {
        competencies.forEach(comp => {
            scorecardContent += `*   **${comp}:**
    Rating: [1-5]
    Comments: [Provide specific examples and observations related to this competency]

`;
        });
    } else {
        scorecardContent += `*   **[Competency 1, e.g., Problem Solving]:**
    Rating: [1-5]
    Comments: [Provide specific examples and observations related to this competency]

*   **[Competency 2, e.g., Communication]:**
    Rating: [1-5]
    Comments: [Provide specific examples and observations related to this competency]

*   **[Competency 3, e.g., Technical Skills]:**
    Rating: [1-5]
    Comments: [Provide specific examples and observations related to this competency]

`;
    }

    scorecardContent += `
---

**Overall Impression:**

[Summarize overall fit, strengths, and areas of concern]

**Recommendation:**

*   [ ] Hire
*   [ ] Second Interview
*   [ ] No Hire

    `;

    generatedScorecardPre.textContent = scorecardContent;
});
