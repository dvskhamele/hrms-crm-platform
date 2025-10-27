
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-form-btn');
    const formOutput = document.getElementById('form-output');
    const generatedForm = document.getElementById('generated-form');
    const copyBtn = document.getElementById('copy-form-btn');

    generateBtn.addEventListener('click', () => {
        const feedbackFor = document.getElementById('feedback-for').value || '[Individual/Team/Project]';
        const feedbackFrom = document.getElementById('feedback-from').value;

        let fromLine = '';
        if (feedbackFrom) {
            fromLine = `Feedback From: ${feedbackFrom}\n`;
        }

        const formText = `
Start, Stop, Continue Feedback for ${feedbackFor}

${fromLine}
Date: ${new Date().toLocaleDateString()}

---

**START:** What should we *start* doing? (New ideas, initiatives, behaviors)

[Your response here]


**STOP:** What should we *stop* doing? (Ineffective practices, negative behaviors, unnecessary tasks)

[Your response here]


**CONTINUE:** What should we *continue* doing? (Successful practices, positive behaviors, valuable contributions)

[Your response here]

---

Thank you for your honest and constructive feedback!
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
