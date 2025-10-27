
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-plan-btn');
    const planOutput = document.getElementById('plan-output');
    const planContent = document.getElementById('plan-content');
    const copyBtn = document.getElementById('copy-plan-btn');

    generateBtn.addEventListener('click', () => {
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const employeeRole = document.getElementById('employee-role').value || '[Employee Role]';
        const trainingObjective = document.getElementById('training-objective').value || '[Clearly define the objective of this training plan.]';
        const trainingActivities = document.getElementById('training-activities').value.split('\n').filter(line => line.trim() !== '');
        const startDate = document.getElementById('start-date').value || '[Start Date]';
        const endDate = document.getElementById('end-date').value || '[Completion Date]';

        let activitiesHtml = trainingActivities.length > 0 ? `<ul>${trainingActivities.map(a => `<li>${a.trim()}</li>`).join('')}</ul>` : '<p>[List specific training activities, courses, or resources.]</p>';

        planContent.innerHTML = `
            <h2>Employee Training Plan</h2>
            <p><strong>Employee Name:</strong> ${employeeName}</p>
            <p><strong>Employee Role:</strong> ${employeeRole}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>

            <h3>1. Training Objective</h3>
            <p>${trainingObjective}</p>

            <h3>2. Training Activities</h3>
            ${activitiesHtml}

            <h3>3. Timeline</h3>
            <p><strong>Start Date:</strong> ${startDate}</p>
            <p><strong>Expected Completion Date:</strong> ${endDate}</p>

            <h3>4. Evaluation & Follow-up</h3>
            <p>Upon completion of the training, a review will be conducted to assess the effectiveness of the training and its impact on performance. Further development opportunities may be identified at that time.</p>

            <h3>Acknowledgement</h3>
            <p>I have reviewed this training plan and understand the objectives and activities outlined.</p>
            <p>_________________________<br>Employee Signature & Date</p>
            <p>_________________________<br>Manager Signature & Date</p>
        `;

        planOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(planContent);
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand('copy');
        window.getSelection().removeAllRanges();// to deselect

        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Document';
        }, 2000);
    });
});
