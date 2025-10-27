
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-form-btn');
    const formOutput = document.getElementById('form-output');
    const formContent = document.getElementById('form-content');
    const copyBtn = document.getElementById('copy-form-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const employeeName = document.getElementById('employee-name').value;

        let employeeInfo = '';
        if (employeeName) {
            employeeInfo = `<p><strong>Employee Name:</strong> ${employeeName}</p>`;
        }

        formContent.innerHTML = `
            <h2>Exit Interview Questionnaire - ${companyName}</h2>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            ${employeeInfo}
            <p>Thank you for taking the time to complete this exit interview questionnaire. Your honest feedback is invaluable to us as we continuously strive to improve our workplace and employee experience.</p>

            <h3>1. Reason for Leaving</h3>
            <p>What is your primary reason for leaving ${companyName}?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>2. Your Role and Responsibilities</h3>
            <p>Please describe your overall satisfaction with your role and responsibilities.</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>3. Management and Leadership</h3>
            <p>How would you describe your relationship with your manager and the overall leadership of the company?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>4. Company Culture and Environment</h3>
            <p>What are your thoughts on ${companyName}'s company culture and work environment?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>5. Compensation and Benefits</h3>
            <p>How do you feel about your compensation and benefits package?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>6. Training and Development</h3>
            <p>Were you provided with adequate training and opportunities for professional development?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>7. What We Do Well</h3>
            <p>What did you like most about working at ${companyName}?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>8. Areas for Improvement</h3>
            <p>What areas do you believe ${companyName} could improve upon?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>9. Future Recommendations</h3>
            <p>Would you recommend ${companyName} as an employer to others? Why or why not?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>10. Additional Comments</h3>
            <p>Is there anything else you would like to share?</p>
            <textarea placeholder="Your answer"></textarea>
        `;

        formOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(formContent);
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand('copy');
        window.getSelection().removeAllRanges();// to deselect

        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Form Text';
        }, 2000);
    });
});
