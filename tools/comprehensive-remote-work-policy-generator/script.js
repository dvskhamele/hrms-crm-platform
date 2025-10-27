document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const generatedPolicy = document.getElementById('generated-policy');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value.trim();
        const remoteModel = document.getElementById('remote-model').value;
        const selectedSections = Array.from(document.querySelectorAll('.policy-section:checked')).map(cb => cb.value);

        if (!companyName) {
            alert('Please enter your Company Name.');
            return;
        }

        let policy = `Remote Work Policy for ${companyName}\n\n`;
        policy += `1. Introduction\n`;
        policy += `This policy outlines ${companyName}'s approach to remote work, ensuring clarity and consistency for all employees. Our goal is to support a productive and flexible work environment.\n\n`;

        policy += `2. Remote Work Model\n`;
        if (remoteModel === 'fully-remote') {
            policy += `   ${companyName} operates as a fully remote organization, with all employees working from approved remote locations.\n`;
        } else if (remoteModel === 'hybrid') {
            policy += `   ${companyName} embraces a hybrid work model, combining in-office collaboration with the flexibility of remote work.\n`;
        } else if (remoteModel === 'remote-first') {
            policy += `   ${companyName} is a remote-first company, meaning remote work is our primary mode of operation. Our physical office serves as a hub for collaboration and optional in-person meetings.\n`;
        }
        policy += `\n`;

        selectedSections.forEach(section => {
            policy += `3. ${section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ')}\n`;
            switch (section) {
                case 'eligibility':
                    policy += `   Remote work eligibility is determined based on job role, performance, and business needs. All remote work arrangements require management approval.\n`;
                    break;
                case 'expectations':
                    policy += `   Remote employees are expected to maintain the same level of productivity and performance as in-office employees. Clear goals and regular check-ins will be established.\n`;
                    break;
                case 'communication':
                    policy += `   Effective communication is vital for remote teams. Employees are expected to be responsive and utilize designated communication tools (e.g., Slack, Microsoft Teams, email) for collaboration.\n`;
                    break;
                case 'equipment':
                    policy += `   ${companyName} will provide necessary equipment (e.g., laptop, monitor) for remote work. Employees are responsible for maintaining a safe and ergonomic workspace.\n`;
                    break;
                case 'security':
                    policy += `   Remote employees must adhere to all data security and confidentiality policies. Company data must be accessed and stored securely, and personal devices used for work must meet security standards.\n`;
                    break;
                case 'health-safety':
                    policy += `   Employees working remotely are responsible for ensuring their remote workspace is safe and free from hazards. ${companyName} encourages regular breaks and ergonomic setups.\n`;
                    break;
            }
            policy += `\n`;
        });

        policy += `4. Policy Review\n`;
        policy += `This policy will be reviewed periodically and may be updated as business needs or regulations change.`;

        generatedPolicy.value = policy;
    });

    copyBtn.addEventListener('click', () => {
        if (generatedPolicy.value) {
            navigator.clipboard.writeText(generatedPolicy.value)
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
