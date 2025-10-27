document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const reviewPeriod = document.getElementById('review-period').value;
    const selfAssessmentDiv = document.getElementById('self-assessment');

    if (!employeeName || !reviewPeriod) {
        selfAssessmentDiv.innerHTML = '<p style="color: red;">Please enter employee name and review period.</p>';
        return;
    }

    const assessmentContent = `
        <h1>Performance Review Self-Assessment for ${employeeName}</h1>
        <p><strong>Review Period:</strong> ${reviewPeriod}</p>
        <p>This self-assessment is an opportunity to reflect on your performance, achievements, and development areas during the past review period. Your thoughtful responses will contribute to a productive performance discussion with your manager.</p>
        
        <div class="assessment-section">
            <h2>1. Key Achievements & Contributions</h2>
            <p>What were your most significant accomplishments and contributions during this review period? How did they align with your goals and team/company objectives?</p>
            <textarea rows="4" style="width: 100%;"></textarea>
        </div>
        
        <div class="assessment-section">
            <h2>2. Strengths & Areas of Expertise</h2>
            <p>What are your key strengths that you leveraged in your role? In what areas do you feel you excel?</p>
            <textarea rows="4" style="width: 100%;"></textarea>
        </div>
        
        <div class="assessment-section">
            <h2>3. Areas for Development & Learning</h2>
            <p>What areas do you believe you need to develop further? What skills or knowledge would enhance your performance or career growth?</p>
            <textarea rows="4" style="width: 100%;"></textarea>
        </div>
        
        <div class="assessment-section">
            <h2>4. Future Goals & Aspirations</h2>
            <p>What are your professional goals for the next review period? How can your manager and the company support your aspirations?</p>
            <textarea rows="4" style="width: 100%;"></textarea>
        </div>
        
        <div class="assessment-section">
            <h2>5. Overall Self-Rating</h2>
            <p>On a scale of 1-5 (1=Needs Significant Improvement, 5=Outstanding), how would you rate your overall performance during this period?</p>
            <input type="number" min="1" max="5" style="width: 100px;">
        </div>
        
        <h2>Employee Signature:</h2>
        <p>_________________________ Date: _______________</p>
    `;

    selfAssessmentDiv.innerHTML = assessmentContent;
});
