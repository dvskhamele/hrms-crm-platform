const employeeNameInput = document.getElementById('employee-name');
const enrollmentPeriodInput = document.getElementById('enrollment-period');
const generateBtn = document.getElementById('generate-btn');
const generatedChecklistPre = document.getElementById('generated-checklist');

generateBtn.addEventListener('click', () => {
    const employeeName = employeeNameInput.value.trim();
    const enrollmentPeriod = enrollmentPeriodInput.value.trim();

    const checklist = `
**Benefits Enrollment Checklist for ${employeeName || '[Employee Name]'}**

**Enrollment Period:** ${enrollmentPeriod || '[Enrollment Period]'}
**Date Generated:** ${new Date().toLocaleDateString()}

---

**1. Review Benefits Information:**

*   [ ] Review the Benefits Guidebook/Summary Plan Description.
*   [ ] Understand available health insurance plans (Medical, Dental, Vision).
*   [ ] Learn about retirement savings options (e.g., 401(k), 403(b)).
*   [ ] Explore other benefits (e.g., Life Insurance, Disability, FSA/HSA, EAP).
*   [ ] Attend benefits orientation session or webinar.

---

**2. Gather Required Documents:**

*   [ ] Social Security numbers for all dependents.
*   [ ] Dates of birth for all dependents.
*   [ ] Marriage certificate (if enrolling spouse).
*   [ ] Birth certificates for children (if enrolling children).

---

**3. Make Enrollment Decisions:**

*   [ ] Select your preferred health insurance plan.
*   [ ] Decide on your retirement plan contributions.
*   [ ] Choose life insurance and disability coverage levels.
*   [ ] Elect any flexible spending accounts (FSA) or health savings accounts (HSA).

---

**4. Complete Enrollment Forms:**

*   [ ] Fill out all necessary online or paper enrollment forms accurately.
*   [ ] Sign and date all required documents.
*   [ ] Submit forms by the enrollment deadline.

---

**5. Confirmation & Follow-up:**

*   [ ] Receive confirmation of your benefits elections.
*   [ ] Keep copies of all submitted forms for your records.
*   [ ] Contact HR with any questions or discrepancies.

---

**Additional Notes:**

[Add any company-specific benefits or instructions here]

    `;

    generatedChecklistPre.textContent = checklist;
});
