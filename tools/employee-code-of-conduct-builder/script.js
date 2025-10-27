document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const generatedCode = document.getElementById('generated-code');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value.trim();
        const selectedValues = Array.from(document.querySelectorAll('.core-value:checked')).map(cb => cb.value);
        const selectedPolicies = Array.from(document.querySelectorAll('.policy-area:checked')).map(cb => cb.value);

        if (!companyName) {
            alert('Please enter your Company Name.');
            return;
        }

        let codeOfConduct = `Employee Code of Conduct for ${companyName}\n\n`;
        codeOfConduct += `1. Introduction\n`;
        codeOfConduct += `At ${companyName}, we are committed to fostering a workplace built on mutual respect, integrity, and professionalism. This Code of Conduct outlines the expectations for all employees to ensure a positive and productive environment.\n\n`;

        if (selectedValues.length > 0) {
            codeOfConduct += `2. Our Core Values\n`;
            codeOfConduct += `Our operations are guided by the following core values:\n`;
            selectedValues.forEach(value => {
                codeOfConduct += `- ${value.charAt(0).toUpperCase() + value.slice(1)}\n`;
            });
            codeOfConduct += `\n`;
        }

        if (selectedPolicies.length > 0) {
            codeOfConduct += `3. Key Policy Areas\n`;
            selectedPolicies.forEach(policy => {
                let policyText = '';
                switch (policy) {
                    case 'harassment':
                        policyText = 'Anti-Harassment & Discrimination: We are committed to providing a workplace free from harassment and discrimination.\n';
                        break;
                    case 'confidentiality':
                        policyText = 'Confidentiality & Data Protection: Employees must protect confidential company and client information.\n';
                        break;
                    case 'social-media':
                        policyText = 'Social Media Usage: Guidelines for professional conduct on social media platforms.\n';
                        break;
                    case 'conflict-of-interest':
                        policyText = 'Conflict of Interest: Employees must avoid situations where personal interests conflict with company interests.\n';
                        break;
                    case 'health-safety':
                        policyText = 'Health & Safety: Adherence to all health and safety regulations to ensure a safe workplace.\n';
                        break;
                }
                codeOfConduct += `- ${policyText}`;
            });
            codeOfConduct += `\n`;
        }

        codeOfConduct += `4. Compliance\n`;
        codeOfConduct += `All employees are expected to read, understand, and comply with this Code of Conduct and all company policies.\n\n`;
        codeOfConduct += `5. Reporting Violations\n`;
        codeOfConduct += `Any concerns or suspected violations should be reported to [HR Department/Manager].\n\n`;
        codeOfConduct += `This Code of Conduct is a living document and may be updated periodically.`;

        generatedCode.value = codeOfConduct;
    });

    copyBtn.addEventListener('click', () => {
        if (generatedCode.value) {
            navigator.clipboard.writeText(generatedCode.value)
                .then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                })
                .catch(err => {
                    alert('Failed to copy text.');
                });
        }
    });
});
