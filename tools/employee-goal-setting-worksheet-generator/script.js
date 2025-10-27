document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const reviewPeriod = document.getElementById('review-period').value;
    const worksheetDiv = document.getElementById('worksheet');

    if (!employeeName || !reviewPeriod) {
        worksheetDiv.innerHTML = '<p style="color: red;">Please enter employee name and review period.</p>';
        return;
    }

    const worksheetContent = `
        <h1>Employee Goal Setting Worksheet</h1>
        <p><strong>Employee Name:</strong> ${employeeName}</p>
        <p><strong>Review Period:</strong> ${reviewPeriod}</p>
        
        <h2>Instructions:</h2>
        <p>Use this worksheet to set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals for the upcoming review period. For each goal, clearly define what you want to achieve, how you will measure success, whether it's realistic, its relevance to your role and company objectives, and the deadline for completion.</p>
        
        <div class="goal-section">
            <h3>Goal 1:</h3>
            <p><strong>Specific:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Measurable:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Achievable:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Relevant:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Time-bound:</strong> ____________________________________________________________________________________________________</p>
        </div>
        
        <div class="goal-section">
            <h3>Goal 2:</h3>
            <p><strong>Specific:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Measurable:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Achievable:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Relevant:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Time-bound:</strong> ____________________________________________________________________________________________________</p>
        </div>
        
        <div class="goal-section">
            <h3>Goal 3:</h3>
            <p><strong>Specific:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Measurable:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Achievable:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Relevant:</strong> ____________________________________________________________________________________________________</p>
            <p><strong>Time-bound:</strong> ____________________________________________________________________________________________________</p>
        </div>
        
        <h2>Manager Comments:</h2>
        <p>____________________________________________________________________________________________________</p>
        
        <h2>Employee Signature:</h2>
        <p>_________________________ Date: _______________</p>
        
        <h2>Manager Signature:</h2>
        <p>_________________________ Date: _______________</p>
    `;

    worksheetDiv.innerHTML = worksheetContent;
});
