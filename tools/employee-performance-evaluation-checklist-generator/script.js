document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewPeriod = document.getElementById('review-period').value;
    const evaluationChecklistDiv = document.getElementById('evaluation-checklist');

    if (!employeeName || !reviewerName || !reviewPeriod) {
        evaluationChecklistDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const checklistItems = [
        "Review employee's job description and key responsibilities.",
        "Gather feedback from peers, direct reports, and other stakeholders (360-degree feedback, if applicable).",
        "Review employee's self-assessment (if submitted).",
        "Assess achievement of goals set in the previous review period.",
        "Evaluate performance against core competencies and company values.",
        "Identify strengths and areas for development.",
        "Discuss career aspirations and development opportunities.",
        "Set SMART goals for the next review period.",
        "Document feedback, ratings, and action plans clearly.",
        "Schedule a constructive and private discussion with the employee.",
        "Obtain necessary signatures and file the review." 
    ];

    let html = `
        <h1>Performance Evaluation Checklist</h1>
        <p><strong>Employee:</strong> ${employeeName}</p>
        <p><strong>Reviewer:</strong> ${reviewerName}</p>
        <p><strong>Review Period:</strong> ${reviewPeriod}</p>
        
        <h2>Checklist Items:</h2>
        <ul>
    `;
    checklistItems.forEach(item => {
        html += `<li class="checklist-item">[ ] ${item}</li>`;
    });
    html += `
        </ul>
        <h3>Notes/Additional Actions:</h3>
        <textarea rows="4" style="width: 100%;"></textarea>
        <br><br>
        <p>___________________________________</p>
        <p>Reviewer Signature / Date</p>
    `;

    evaluationChecklistDiv.innerHTML = html;
});