
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-form-btn');
    const formOutput = document.getElementById('form-output');
    const generatedForm = document.getElementById('generated-form');
    const copyBtn = document.getElementById('copy-form-btn');

    generateBtn.addEventListener('click', () => {
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const reviewPeriod = document.getElementById('review-period').value || '[Review Period]';

        const formText = `
Self-Evaluation Form

Employee Name: ${employeeName}
Review Period: ${reviewPeriod}
Date: ${new Date().toLocaleDateString()}

---

**1. Accomplishments & Contributions**

What were your most significant accomplishments and contributions during this review period? Please provide specific examples and quantify results where possible.

[Your response here]


**2. Areas for Development & Growth**

What areas do you believe you need to develop or improve upon? What steps are you taking or planning to take to address these areas?

[Your response here]


**3. Goals & Objectives**

How did you perform against your goals and objectives for this period? What new goals do you propose for the next period?

[Your response here]


**4. Strengths**

What do you consider your greatest strengths that you bring to your role and the team?

[Your response here]


**5. Support & Resources**

What support or resources do you need from your manager or the company to perform your job more effectively or to achieve your development goals?

[Your response here]


**6. Additional Comments**

Is there anything else you would like to share regarding your performance, role, or overall experience during this review period?

[Your response here]

---

Thank you for completing your self-evaluation!
`;

        generatedForm.value = formText.trim();
        formOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        generatedForm.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Form Text';
        }, 2000);
    });
});
