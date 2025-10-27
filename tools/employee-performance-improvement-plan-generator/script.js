document.addEventListener('DOMContentLoaded', () => {
    const employeeNameInput = document.getElementById('employee-name');
    const employeeRoleInput = document.getElementById('employee-role');
    const performanceAreaInput = document.getElementById('performance-area');
    const improvementGoalsInput = document.getElementById('improvement-goals');
    const pipDurationInput = document.getElementById('pip-duration');
    const generateBtn = document.getElementById('generate-btn');
    const generatedPipTextarea = document.getElementById('generated-pip');
    const copyBtn = document.getElementById('copy-btn');

    const generatePip = () => {
        const employeeName = employeeNameInput.value.trim();
        const employeeRole = employeeRoleInput.value.trim();
        const performanceArea = performanceAreaInput.value.trim();
        const improvementGoals = improvementGoalsInput.value.split(',').map(goal => goal.trim()).filter(goal => goal.length > 0);
        const pipDuration = parseInt(pipDurationInput.value, 10);

        if (!employeeName || !employeeRole || !performanceArea || improvementGoals.length === 0 || isNaN(pipDuration) || pipDuration <= 0) {
            generatedPipTextarea.value = "Please fill in all fields correctly to generate the PIP.";
            return;
        }

        let pipText = `Performance Improvement Plan (PIP)\n\n`;
        pipText += `Employee Name: ${employeeName}\n`;
        pipText += `Employee Role: ${employeeRole}\n`;
        pipText += `Date Issued: ${new Date().toLocaleDateString()}\n`;
        pipText += `PIP Duration: ${pipDuration} weeks\n\n`;
        pipText += `--------------------------------------------------\n\n`;

        pipText += `Area(s) for Improvement:\n`;
        pipText += `  - ${performanceArea}\n\n`;

        pipText += `Specific Improvement Goals:\n`;
        improvementGoals.forEach((goal, index) => {
            pipText += `  ${index + 1}. ${goal}\n`;
        });
        pipText += `\n`;

        pipText += `Action Steps & Support:\n`;
        pipText += `  - [Specific actions the employee will take to achieve goals]\n`;
        pipText += `  - [Resources or training provided by the company]\n`;
        pipText += `  - [Managerial support and regular check-ins]\n\n`;

        pipText += `Timeline & Milestones:\n`;
        for (let i = 1; i <= pipDuration; i++) {
            pipText += `  - Week ${i}: [Specific milestone or check-in]\n`;
        }
        pipText += `\n`;

        pipText += `Evaluation Criteria:\n`;
        pipText += `  - [How success will be measured for each goal]\n`;
        pipText += `  - [Consequences of not meeting expectations]\n\n`;

        pipText += `--------------------------------------------------\n\n`;
        pipText += `Employee Signature: _________________________ Date: _________
`;
        pipText += `Manager Signature: __________________________ Date: _________
`;
        pipText += `HR Representative Signature: _________________ Date: _________
`;

        generatedPipTextarea.value = pipText;
    };

    generateBtn.addEventListener('click', generatePip);

    copyBtn.addEventListener('click', () => {
        generatedPipTextarea.select();
        generatedPipTextarea.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy to Clipboard';
        }, 2000);
    });

    // Generate initial PIP on load
    generatePip();
});
