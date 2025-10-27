document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-checklist-btn');
    const checklistOutput = document.getElementById('checklist-output');
    const checklistContent = document.getElementById('checklist-content');
    const copyBtn = document.getElementById('copy-checklist-btn');

    const checklistData = {
        preTermination: {
            title: 'Pre-Termination Actions',
            items: [
                'Review employment contract and company policies.',
                'Consult with HR/Legal regarding termination reason and process.',
                'Prepare all necessary termination documents (e.g., termination letter, severance agreement).',
                'Calculate final pay, including accrued PTO, commissions, etc.',
                'Schedule termination meeting with employee and witness (if applicable).',
                'Disable employee access to company systems (email, internal networks) effective immediately after meeting.'
            ]
        },
        terminationMeeting: {
            title: 'During Termination Meeting',
            items: [
                'Clearly state the reason for termination.',
                'Provide termination letter and explain final pay details.',
                'Discuss benefits continuation (e.g., COBRA information).',
                'Explain return of company property (laptop, keys, badge).',
                'Collect company property.',
                'Answer any employee questions.'
            ]
        },
        postTermination: {
            title: 'Post-Termination Actions',
            items: [
                'Process final payroll and severance (if applicable).',
                'Notify relevant departments (IT, Payroll, Benefits, Security).',
                'Update employee records in HRIS.',
                'Remove employee from company directories and communication lists.',
                'Conduct exit interview (if applicable).',
                'Send COBRA election notice and other required benefits information.',
                'Issue Record of Employment (ROE) / unemployment information.'
            ]
        }
    };

    generateBtn.addEventListener('click', () => {
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const terminationDate = document.getElementById('termination-date').value || '[Termination Date]';
        const reason = document.getElementById('reason').value;

        let reasonText = '';
        if (reason) {
            reasonText = `<p><strong>Reason for Termination:</strong> ${reason}</p>`;
        }

        let content = "
            <p><strong>Employee Name:</strong> ${employeeName}</p>
            <p><strong>Termination Date:</strong> ${terminationDate}</p>
            ${reasonText}
            <p>This checklist is designed to guide managers and HR through the employee termination process, ensuring all necessary steps are completed in a compliant and respectful manner.</p>
        ";

        for (const categoryKey in checklistData) {
            const category = checklistData[categoryKey];
            content += `<div class=\"checklist-category\"><h4>${category.title}</h4>`;
            category.items.forEach(item => {
                content += `<div class=\"checklist-item\"><input type=\"checkbox\"><label>${item}</label></div>`;
            });
            content += `</div>`;
        }

        checklistContent.innerHTML = content;
        checklistOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        let textToCopy = '';
        const employeeInfo = checklistContent.querySelectorAll('p');
        employeeInfo.forEach(p => {
            textToCopy += p.textContent + '\n';
        });

        const categories = checklistContent.querySelectorAll('.checklist-category');
        categories.forEach(category => {
            textToCopy += `\n**${category.querySelector('h4').textContent}**\n`;
            const items = category.querySelectorAll('.checklist-item label');
            items.forEach(item => {
                textToCopy += `- [ ] ${item.textContent}\n`;
            });
        });

        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Checklist';
            }, 2000);
        });
    });
});
