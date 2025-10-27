
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-checklist-btn');
    const checklistOutput = document.getElementById('checklist-output');
    const checklistContent = document.getElementById('checklist-content');
    const copyBtn = document.getElementById('copy-checklist-btn');

    const checklistData = {
        preArrival: {
            title: 'Pre-Arrival (Before Start Date)',
            items: [
                'Create new user accounts (email, network, software licenses).',
                'Order and configure hardware (laptop, monitor, peripherals).',
                'Install and test all necessary software.',
                'Set up VPN access (if applicable).',
                'Provide access to relevant shared drives and cloud storage.',
                'Prepare IT welcome packet (login credentials, IT support contacts, basic troubleshooting guide).',
                'Schedule IT orientation/setup meeting for the first day.'
            ]
        },
        firstDay: {
            title: 'First Day IT Setup',
            items: [
                'Conduct IT orientation/setup meeting (virtual or in-person).',
                'Assist with hardware setup and connectivity.',
                'Verify all software installations and access.',
                'Confirm VPN access and network connectivity.',
                'Review IT security policies and best practices.',
                'Provide contact information for IT support.'
            ]
        },
        firstWeek: {
            title: 'First Week IT Integration',
            items: [
                'Follow up on any outstanding IT issues or access requests.',
                'Ensure new hire can access all role-specific applications.',
                'Provide training on any specialized software or systems.',
                'Review data backup and recovery procedures.',
                'Confirm understanding of password policies and multi-factor authentication.'
            ]
        }
    };

    generateBtn.addEventListener('click', () => {
        const employeeName = document.getElementById('employee-name').value || '[New Hire Name]';
        const startDate = document.getElementById('start-date').value || '[Start Date]';

        let content = `
            <h2>IT Onboarding Checklist for ${employeeName}</h2>
            <p><strong>Start Date:</strong> ${startDate}</p>
            <p>This checklist ensures that all necessary IT resources and access are provided to new hires for a smooth and productive start.</p>
        `;

        for (const categoryKey in checklistData) {
            const category = checklistData[categoryKey];
            content += `<div class="checklist-category"><h4>${category.title}</h4>`;
            category.items.forEach(item => {
                content += `<div class="checklist-item"><input type="checkbox"><label>${item}</label></div>`;
            });
            content += `</div>`;
        }

        checklistContent.innerHTML = content;
        checklistOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        let textToCopy = '';
        const headerInfo = checklistContent.querySelectorAll('h2, p');
        headerInfo.forEach(el => {
            textToCopy += el.textContent + '\n';
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
