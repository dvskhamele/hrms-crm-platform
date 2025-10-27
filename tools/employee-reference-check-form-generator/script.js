document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-form-btn');
    const formOutput = document.getElementById('form-output');
    const formContent = document.getElementById('form-content');
    const copyBtn = document.getElementById('copy-form-btn');

    generateBtn.addEventListener('click', () => {
        const candidateName = document.getElementById('candidate-name').value || '[Candidate Name]';
        const positionApplied = document.getElementById('position-applied').value || '[Position Applied For]';
        const referenceName = document.getElementById('reference-name').value || '[Reference Name]';
        const referenceTitle = document.getElementById('reference-title').value || '[Reference Title/Relationship]';
        const referenceCompany = document.getElementById('reference-company').value || '[Reference Company]';
        const interviewerName = document.getElementById('interviewer-name').value || '[Interviewer Name]';

        formContent.innerHTML = `
            <h2>Employee Reference Check Form</h2>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Interviewer:</strong> ${interviewerName}</p>
            <p><strong>Candidate Name:</strong> ${candidateName}</p>
            <p><strong>Position Applied For:</strong> ${positionApplied}</p>
            <br>
            <p><strong>Reference Name:</strong> ${referenceName}</p>
            <p><strong>Reference Title/Relationship:</strong> ${referenceTitle}</p>
            <p><strong>Reference Company:</strong> ${referenceCompany}</p>
            <br>
            <p>Thank you for taking the time to speak with us regarding ${candidateName}. Your insights are valuable to our hiring process.</p>

            <h3>1. Relationship & Employment Details</h3>
            <p>What was your relationship with ${candidateName}?</p>
            <textarea placeholder="Your answer"></textarea>
            <p>What were ${candidateName}'s start and end dates of employment?</p>
            <textarea placeholder="Your answer"></textarea>
            <p>What was ${candidateName}'s job title and primary responsibilities?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>2. Performance & Strengths</h3>
            <p>How would you describe ${candidateName}'s overall performance?</p>
            <textarea placeholder="Your answer"></textarea>
            <p>What do you consider ${candidateName}'s greatest strengths?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>3. Areas for Development</h3>
            <p>What areas, if any, did ${candidateName} need to develop or improve upon?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>4. Teamwork & Communication</h3>
            <p>How well did ${candidateName} work with colleagues and communicate effectively?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>5. Reliability & Professionalism</h3>
            <p>How would you rate ${candidateName}'s reliability, punctuality, and professionalism?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>6. Rehire Eligibility</h3>
            <p>Would you rehire ${candidateName} if given the opportunity? Why or why not?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>7. Additional Comments</h3>
            <p>Is there anything else you would like to add regarding ${candidateName}'s qualifications or character?</p>
            <textarea placeholder="Your answer"></textarea>
        `;

        formOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        let textToCopy = '';
        const headerInfo = formContent.querySelectorAll('h2, p');
        headerInfo.forEach(el => {
            textToCopy += el.textContent + '\n';
        });

        const sections = formContent.querySelectorAll('h3');
        sections.forEach(section => {
            textToCopy += `\n**${section.textContent}**\n`;
            const textarea = section.nextElementSibling.nextElementSibling;
            if (textarea && textarea.tagName === 'TEXTAREA') {
                textToCopy += textarea.previousElementSibling.textContent + '\n';
                textToCopy += '[Your answer here]\n';
            }
        });

        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Form Text';
            }, 2000);
        });
    });
});
