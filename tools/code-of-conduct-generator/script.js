
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-coc-btn');
    const cocOutput = document.getElementById('coc-output');
    const cocContent = document.getElementById('coc-content');
    const copyBtn = document.getElementById('copy-coc-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const companyMission = document.getElementById('company-mission').value;
        const selectedValues = Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
                                    .map(cb => cb.dataset.value);

        let missionSection = '';
        if (companyMission) {
            missionSection = `
            <h3>Our Mission & Vision</h3>
            <p>${companyMission}</p>
            `;
        }

        let valuesSection = '';
        if (selectedValues.length > 0) {
            valuesSection = `
            <h3>Our Core Values</h3>
            <ul>
                ${selectedValues.map(value => `<li><strong>${value.charAt(0).toUpperCase() + value.slice(1)}:</strong> [Describe how this value is lived at ${companyName}.]</li>`).join('')}
            </ul>
            `;
        }

        cocContent.innerHTML = `
            <h2>Code of Conduct for ${companyName}</h2>
            <p><strong>Effective Date:</strong> ${new Date().toLocaleDateString()}</p>

            <h3>Introduction</h3>
            <p>This Code of Conduct outlines the principles and expectations for all employees, contractors, and stakeholders of ${companyName}. It serves as a guide for ethical decision-making and professional behavior, ensuring a respectful, inclusive, and productive work environment for everyone.</p>

            ${missionSection}
            ${valuesSection}

            <h3>1. Respect and Professionalism</h3>
            <ul>
                <li>Treat all colleagues, customers, partners, and stakeholders with dignity and respect.</li>
                <li>Foster an inclusive environment free from harassment, discrimination, and bullying.</li>
                <li>Communicate professionally and constructively, even in challenging situations.</li>
            </ul>

            <h3>2. Integrity and Honesty</h3>
            <ul>
                <li>Act with honesty, transparency, and integrity in all business dealings.</li>
                <li>Avoid conflicts of interest and disclose any potential conflicts promptly.</li>
                <li>Maintain the confidentiality of company and client information.</li>
            </ul>

            <h3>3. Compliance with Laws and Policies</h3>
            <ul>
                <li>Adhere to all applicable laws, regulations, and company policies.</li>
                <li>Report any suspected violations of laws or this Code of Conduct.</li>
            </ul>

            <h3>4. Workplace Safety and Well-being</h3>
            <ul>
                <li>Contribute to a safe and healthy work environment.</li>
                <li>Report any safety concerns or hazards immediately.</li>
            </ul>

            <h3>5. Use of Company Resources</h3>
            <ul>
                <li>Use company property and resources responsibly and only for legitimate business purposes.</li>
                <li>Protect company assets from loss, damage, misuse, or theft.</li>
            </ul>

            <h3>6. Reporting Violations</h3>
            <p>Any concerns or suspected violations of this Code of Conduct should be reported to your manager, Human Resources, or [Designated Reporting Channel]. All reports will be treated with confidentiality and investigated promptly and fairly.</p>

            <h3>7. Consequences of Violations</h3>
            <p>Violations of this Code of Conduct may result in disciplinary action, up to and including termination of employment, and may also lead to legal action.</p>

            <h3>Acknowledgement</h3>
            <p>I have read, understood, and agree to abide by the principles and expectations outlined in this Code of Conduct.</p>
            <p>_________________________<br>Employee Signature & Date</p>
        `;

        cocOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(cocContent);
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
