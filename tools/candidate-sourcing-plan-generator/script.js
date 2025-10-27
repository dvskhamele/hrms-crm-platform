const jobRoleInput = document.getElementById('job-role');
const targetDemographicsInput = document.getElementById('target-demographics');
const generateBtn = document.getElementById('generate-btn');
const generatedPlanPre = document.getElementById('generated-plan');

generateBtn.addEventListener('click', () => {
    const jobRole = jobRoleInput.value.trim();
    const demographics = targetDemographicsInput.value.trim();

    let sourcingPlan = `
**Candidate Sourcing Plan for ${jobRole || '[Job Role]'}**

**Target Demographics:** ${demographics || '[e.g., experience level, skills, location]'}
**Date Generated:** ${new Date().toLocaleDateString()}

---

**1. Define Ideal Candidate Profile:**

*   **Experience:** ${demographics.includes('experience') ? demographics.split('experience')[1].split(',')[0].trim() : '[e.g., 5+ years]'}
*   **Skills:** ${demographics.includes('skills') ? demographics.split('skills')[1].split(',')[0].trim() : '[e.g., Project Management, Python, Cloud Computing]'}
*   **Education:** [e.g., Bachelor's Degree in Computer Science]
*   **Location:** ${demographics.includes('location') ? demographics.split('location')[1].split(',')[0].trim() : '[e.g., Remote, San Francisco Bay Area]'}
*   **Key Traits:** [e.g., Problem-solver, Team player, Innovative]

---

**2. Sourcing Channels:**

*   **Job Boards:** LinkedIn, Indeed, Glassdoor, Specialized Job Boards (e.g., Dice for tech)
*   **Professional Networks:** LinkedIn Recruiter, Industry-specific online communities, professional associations and groups
*   **Internal Referrals:** Leverage existing employee networks for qualified candidates
*   **Database Search:** Utilize ATS/CRM database for previous applicants or passive candidates
*   **Boolean Search:** Craft advanced search strings for platforms like Google, LinkedIn
*   **Social Media:** Twitter, Facebook, Instagram (for employer branding and niche talent)
*   **University Partnerships:** Collaborate with career services for entry-level or intern roles
*   **Conferences/Meetups:** Attend industry events to network with potential candidates

-----`

**3. Outreach Strategy:**

*   **Personalized Messages:** Tailor outreach messages to highlight why the role is a good fit for the candidate's background.
*   **Value Proposition:** Clearly articulate company culture, growth opportunities, and benefits.
*   **Follow-ups:** Implement a structured follow-up plan for candidates who don't respond initially.

---

**4. Key Performance Indicators (KPIs):**

*   Number of candidates sourced
*   Candidate response rate
*   Candidate quality (interview-to-hire ratio)
*   Source of hire efficiency

---

**5. Timeline/Frequency:**

*   [e.g., Week 1-2: Initial search and outreach]
*   [e.g., Week 3-4: Follow-ups and screening]
*   [e.g., Ongoing: Pipeline nurturing]
    `;

    generatedPlanPre.textContent = template;
});
