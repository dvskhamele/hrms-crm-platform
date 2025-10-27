document.getElementById('generate-btn').addEventListener('click', () => {
    const companyName = document.getElementById('company-name').value;
    const effectiveDate = document.getElementById('effective-date').value;
    const handbookDiv = document.getElementById('handbook');

    if (!companyName || !effectiveDate) {
        handbookDiv.innerHTML = '<p style="color: red;">Please enter company name and effective date.</p>';
        return;
    }

    const handbookContent = `
        <h1>${companyName} Employee Handbook</h1>
        <p><strong>Effective Date:</strong> ${effectiveDate}</p>
        
        <h2>Welcome Message</h2>
        <p>Welcome to ${companyName}! This handbook is designed to provide you with important information about our company culture, policies, and procedures. We are committed to creating a positive and productive work environment for all employees.</p>
        
        <h2>Code of Conduct</h2>
        <p>Our Code of Conduct outlines the ethical principles and behavioral expectations for all employees. We expect all employees to act with integrity, respect, and professionalism in all business dealings.</p>
        
        <h2>Workplace Policies</h2>
        <p>This section covers key workplace policies, including:</p>
        <ul>
            <li>Equal Employment Opportunity</li>
            <li>Anti-Harassment and Discrimination</li>
            <li>Attendance and Punctuality</li>
            <li>Confidentiality</li>
            <li>Use of Company Property</li>
            <li>Social Media Guidelines</li>
        </ul>
        
        <h2>Compensation and Benefits</h2>
        <p>Information regarding compensation, benefits, and payroll procedures can be found here. This includes details on salary, health insurance, retirement plans, paid time off, and other employee benefits.</p>
        
        <h2>Performance Management</h2>
        <p>Our performance management process is designed to support your growth and development. This section outlines our performance review process, goal setting, and feedback mechanisms.</p>
        
        <h2>Safety and Security</h2>
        <p>We are committed to providing a safe and secure workplace for all employees. This section covers our safety policies, emergency procedures, and security guidelines.</p>
        
        <h2>Conclusion</h2>
        <p>We encourage you to read this handbook carefully and familiarize yourself with its contents. If you have any questions, please do not hesitate to contact your manager or the HR department.</p>
    `;

    handbookDiv.innerHTML = handbookContent;
});