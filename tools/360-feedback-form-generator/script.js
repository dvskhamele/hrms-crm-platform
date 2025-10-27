
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-form-btn');
    const formOutput = document.getElementById('form-output');
    const formContent = document.getElementById('form-content');
    const copyBtn = document.getElementById('copy-form-btn');

    generateBtn.addEventListener('click', () => {
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const reviewerType = document.getElementById('reviewer-type').value;

        let formTitle = `360-Degree Feedback Form for ${employeeName}`; 
        let introText = `Please provide honest and constructive feedback for ${employeeName} based on your interactions and observations. Your input is invaluable for their growth and development.`;

        if (reviewerType === 'self') {
            formTitle = `Self-Assessment Form for ${employeeName}`; 
            introText = `This form is for your self-assessment. Please reflect on your performance, strengths, and areas for development.`;
        } else if (reviewerType === 'manager') {
            formTitle = `Manager Feedback Form for ${employeeName}`; 
            introText = `Please provide your assessment of ${employeeName}'s performance, strengths, and areas for development.`;
        } else if (reviewerType === 'peer') {
            formTitle = `Peer Feedback Form for ${employeeName}`; 
            introText = `Please provide your assessment of ${employeeName}'s performance, strengths, and areas for development from a peer perspective.`;
        } else if (reviewerType === 'direct-report') {
            formTitle = `Direct Report Feedback Form for ${employeeName}`; 
            introText = `Please provide your assessment of ${employeeName}'s manager, focusing on their leadership, support, and communication.`;
        }

        formContent.innerHTML = `
            <h2>${formTitle}</h2>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p>${introText}</p>

            <h3>1. Strengths</h3>
            <p>What are ${employeeName}'s key strengths? Please provide specific examples.</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>2. Areas for Development</h3>
            <p>What are some areas where ${employeeName} could improve or develop further? Please provide specific examples.</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>3. Communication & Collaboration</h3>
            <p>How effectively does ${employeeName} communicate and collaborate with others?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>4. Leadership & Influence (if applicable)</h3>
            <p>How effectively does ${employeeName} demonstrate leadership and influence others?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>5. Overall Performance</h3>
            <p>What is your overall assessment of ${employeeName}'s performance?</p>
            <textarea placeholder="Your answer"></textarea>

            <h3>6. Additional Comments</h3>
            <p>Is there anything else you would like to add?</p>
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
