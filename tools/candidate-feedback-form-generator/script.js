const jobRoleInput = document.getElementById('job-role');
const interviewerNameInput = document.getElementById('interviewer-name');
const generateBtn = document.getElementById('generate-btn');
const generatedFormPre = document.getElementById('generated-form');

generateBtn.addEventListener('click', () => {
    const jobRole = jobRoleInput.value.trim();
    const interviewerName = interviewerNameInput.value.trim();

    const formContent = `
**Candidate Interview Feedback Form**

**Job Role:** ${jobRole || '[Job Role]'}
**Candidate Name:** _________________________
**Interviewer Name:** ${interviewerName || '[Interviewer Name]'}
**Date of Interview:** ${new Date().toLocaleDateString()}

---

**1. Overall Impression (Rating: 1-5, 5=Excellent):**

*   Overall fit for the role: _____
*   Overall impression of candidate: _____

Comments:
[Provide general comments on the candidate's overall suitability, enthusiasm, and professionalism.]

---

**2. Key Competencies Assessment (Rating: 1-5):**

*   **Technical Skills:**
    Rating: _____
    Comments: [Specific examples of technical strengths and weaknesses related to the role.]

*   **Problem-Solving Skills:**
    Rating: _____
    Comments: [How did the candidate approach challenges? Were their solutions logical and effective?]

*   **Communication Skills:**
    Rating: _____
    Comments: [Clarity, conciseness, listening skills, ability to articulate ideas.]

*   **Teamwork/Collaboration:**
    Rating: _____
    Comments: [Examples of working effectively with others, conflict resolution, contribution to team goals.]

*   **Cultural Fit:**
    Rating: _____
    Comments: [Alignment with company values, work ethic, interpersonal style.]

---

**3. Strengths:**

[List 2-3 key strengths demonstrated by the candidate during the interview.]

---

**4. Areas for Development/Concerns:**

[List 1-2 areas where the candidate may need development or any concerns regarding their fit for the role.]

---

**5. Recommendation:**

*   [ ] Highly Recommend
*   [ ] Recommend
*   [ ] Recommend with Reservations
*   [ ] Do Not Recommend

**Reason for Recommendation:**
[Provide a brief justification for your recommendation.]

    `;

    generatedFormPre.textContent = formContent;
});
