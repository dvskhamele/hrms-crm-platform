document.getElementById('generate-btn').addEventListener('click', () => {
    const reviewType = document.getElementById('review-type').value;
    const employeeName = document.getElementById('employee-name').value;
    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewTemplateDiv = document.getElementById('review-template');

    if (!employeeName || !reviewerName) {
        reviewTemplateDiv.innerHTML = '<p style="color: red;">Please enter employee name and reviewer name.</p>';
        return;
    }

    let templateContent = `
        <h1>${reviewType.replace(/-/g, ' ').toUpperCase()} Performance Review</h1>
        <p><strong>Employee Name:</strong> ${employeeName}</p>
        <p><strong>Reviewer Name:</strong> ${reviewerName}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        
        <h2>Performance Areas:</h2>
        <p>Please rate the employee's performance in the following areas (e.g., Exceeds Expectations, Meets Expectations, Needs Improvement):</p>
        <ul>
            <li>Job Knowledge & Skills: ____________________</li>
            <li>Quality of Work: ____________________</li>
            <li>Productivity: ____________________</li>
            <li>Teamwork & Collaboration: ____________________</li>
            <li>Communication: ____________________</li>
            <li>Problem-Solving: ____________________</li>
            <li>Adaptability: ____________________</li>
        </ul>
        
        <h2>Strengths:</h2>
        <p>____________________________________________________________________________________________________</p>
        
        <h2>Areas for Development:</h2>
        <p>____________________________________________________________________________________________________</p>
        
        <h2>Goals for Next Review Period:</h2>
        <p>____________________________________________________________________________________________________</p>
        
        <h2>Employee Comments:</h2>
        <p>____________________________________________________________________________________________________</p>
        
        <h2>Signatures:</h2>
        <p>Employee Signature: _________________________ Date: _______________</p>
        <p>Reviewer Signature: _________________________ Date: _______________</p>
    `;

    reviewTemplateDiv.innerHTML = templateContent;
});
