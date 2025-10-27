document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const managerName = document.getElementById('manager-name').value;
    const date = document.getElementById('date').value;
    const pipTemplateDiv = document.getElementById('pip-template');

    if (!employeeName || !managerName || !date) {
        pipTemplateDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const templateContent = `
        <h1>Performance Improvement Plan (PIP)</h1>
        <p><strong>Employee Name:</strong> ${employeeName}</p>
        <p><strong>Manager Name:</strong> ${managerName}</p>
        <p><strong>Date:</strong> ${date}</p>
        
        <div class="pip-section">
            <h2>1. Area(s) for Improvement:</h2>
            <p>Clearly describe the specific performance or behavioral issues that need improvement. Provide concrete examples.</p>
            <textarea rows="4" style="width: 100%;"></textarea>
        </div>
        
        <div class="pip-section">
            <h2>2. Desired Outcome(s):</h2>
            <p>What specific, measurable, achievable, relevant, and time-bound (SMART) outcomes are expected from the employee?</p>
            <textarea rows="4" style="width: 100%;"></textarea>
        </div>
        
        <div class="pip-section">
            <h2>3. Action Plan & Support:</h2>
            <p>What specific steps will the employee take to improve? What resources, training, or support will the company provide?</p>
            <textarea rows="4" style="width: 100%;"></textarea>
        </div>
        
        <div class="pip-section">
            <h2>4. Timeline & Review Schedule:</h2>
            <p>What is the duration of this PIP? When will progress be reviewed?</p>
            <textarea rows="2" style="width: 100%;"></textarea>
        </div>
        
        <div class="pip-section">
            <h2>5. Consequences of Non-Improvement:</h2>
            <p>Clearly state the potential consequences if the desired improvements are not met within the specified timeline.</p>
            <textarea rows="2" style="width: 100%;"></textarea>
        </div>
        
        <h2>Signatures:</h2>
        <p>Employee Signature: _________________________ Date: _______________</p>
        <p>Manager Signature: _________________________ Date: _______________</p>
        <p>HR Representative Signature (if applicable): _________________________ Date: _______________</p>
    `;

    pipTemplateDiv.innerHTML = templateContent;
});
