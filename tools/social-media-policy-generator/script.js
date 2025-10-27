
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-policy-btn');
    const policyOutput = document.getElementById('policy-output');
    const policyContent = document.getElementById('policy-content');
    const copyBtn = document.getElementById('copy-policy-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const policyDate = document.getElementById('policy-date').value || new Date().toLocaleDateString();
        const personalUseGuidelines = document.getElementById('personal-use-guidelines').value || 'Employees are encouraged to use social media responsibly and professionally. Avoid discussing confidential company information, disparaging the company or colleagues, or engaging in any activity that could negatively impact the company's reputation.';
        const professionalUseGuidelines = document.getElementById('professional-use-guidelines').value || 'Employees authorized to represent the company on social media must adhere to brand guidelines, disclose their affiliation, and ensure all communications are accurate and professional. Do not post on behalf of the company without explicit authorization.';

        policyContent.innerHTML = `
            <h2>Social Media Policy for ${companyName}</h2>
            <p><strong>Effective Date:</strong> ${policyDate}</p>

            <h3>1. Policy Statement</h3>
            <p>${companyName} recognizes the importance and widespread use of social media. This policy provides guidelines for employees' use of social media, both for personal and professional purposes, to ensure responsible conduct, protect company interests, and maintain a positive online presence.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all employees, contractors, and agents of ${companyName} who use social media, whether for personal or business purposes, and whether during or outside of working hours.</p>

            <h3>3. Definition of Social Media</h3>
            <p>Social media includes, but is not limited to, platforms such as Facebook, Twitter, LinkedIn, Instagram, TikTok, YouTube, blogs, forums, and any other online platforms for sharing content or interacting with others.</p>

            <h3>4. General Guidelines for All Social Media Use</h3>
            <ul>
                <li><strong>Be Respectful:</strong> Always be respectful and professional in your online interactions. Do not engage in harassment, bullying, or discriminatory behavior.</li>
                <li><strong>Protect Confidential Information:</strong> Never disclose confidential, proprietary, or sensitive company information, trade secrets, or client data.</li>
                <li><strong>Maintain Professionalism:</strong> Your online conduct can reflect on ${companyName}. Avoid posting anything that could be perceived as offensive, inappropriate, or damaging to the company's reputation.</li>
                <li><strong>Accuracy:</strong> Ensure any information you share about the company is accurate and truthful.</li>
                <li><strong>Respect Copyright and Intellectual Property:</strong> Do not post copyrighted materials or intellectual property belonging to others without permission.</li>
            </ul>

            <h3>5. Personal Use of Social Media</h3>
            <p>${personalUseGuidelines}</p>

            <h3>6. Professional Use of Social Media (Company-Authorized)</h3>
            <p>${professionalUseGuidelines}</p>

            <h3>7. Reporting Concerns</h3>
            <p>If you encounter content on social media that violates this policy or raises concerns about ${companyName}, please report it to your manager or Human Resources.</p>

            <h3>8. Consequences of Violations</h3>
            <p>Violations of this policy may result in disciplinary action, up to and including termination of employment.</p>

            <h3>Acknowledgement</h3>
            <p>I have read, understood, and agree to abide by the terms and conditions outlined in this Social Media Policy.</p>
            <p>_________________________<br>Employee Signature & Date</p>
            <p>_________________________<br>Manager Signature & Date</p>
        `;

        policyOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(policyContent);
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
