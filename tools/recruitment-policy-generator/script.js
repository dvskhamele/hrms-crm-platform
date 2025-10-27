document.getElementById('generate-btn').addEventListener('click', () => {
    const companyName = document.getElementById('company-name').value;
    const effectiveDate = document.getElementById('effective-date').value;
    const policyContentDiv = document.getElementById('policy-content');

    if (!companyName || !effectiveDate) {
        policyContentDiv.innerHTML = '<p style="color: red;">Please enter company name and effective date.</p>';
        return;
    }

    const policyContent = `
        <h1>${companyName} Recruitment Policy</h1>
        <p><strong>Effective Date:</strong> ${effectiveDate}</p>
        
        <h2>1. Introduction</h2>
        <p>This policy outlines ${companyName}'s commitment to fair, transparent, and effective recruitment practices. Our goal is to attract, select, and hire the most qualified candidates who align with our values and contribute to our success.</p>
        
        <h2>2. Equal Employment Opportunity</h2>
        <p>${companyName} is an Equal Opportunity Employer. We are committed to providing equal employment opportunities to all qualified individuals without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, age, disability, veteran status, or any other protected characteristic.</p>
        
        <h2>3. Recruitment Process</h2>
        <p>Our recruitment process typically involves the following steps:</p>
        <ul>
            <li>Job Requisition & Approval</li>
            <li>Job Description Creation</li>
            <li>Candidate Sourcing & Advertising</li>
            <li>Application Review & Screening</li>
            <li>Interviews (Phone, Virtual, In-Person)</li>
            <li>Assessments (if applicable)</li>
            <li>Reference Checks</li>
            <li>Offer & Background Check</li>
            <li>Onboarding</li>
        </ul>
        
        <h2>4. Candidate Experience</h2>
        <p>We are committed to providing a positive and respectful candidate experience throughout the entire recruitment process, regardless of the outcome.</p>
        
        <h2>5. Confidentiality</h2>
        <p>All candidate information will be treated with strict confidentiality and used solely for recruitment purposes.</p>
        
        <h2>6. Policy Review</h2>
        <p>This policy will be reviewed periodically and updated as necessary to ensure compliance with all applicable laws and best practices.</p>
    `;

    policyContentDiv.innerHTML = policyContent;
});