
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-checklist-btn');
    const checklistOutput = document.getElementById('checklist-output');
    const checklistContent = document.getElementById('checklist-content');
    const copyBtn = document.getElementById('copy-checklist-btn');

    const checklistData = {
        preboarding: {
            title: 'Pre-boarding (Before Start Date)',
            items: [
                'Send welcome email with essential information and first-day agenda.',
                'Ship necessary equipment (laptop, monitor, keyboard, mouse, headset) to new hire.',
                'Set up all required software accounts and access (email, communication tools, HRIS, project management).',
                'Grant access to shared drives and relevant documentation.',
                'Schedule virtual introductory meetings with manager and key team members.',
                'Assign an onboarding buddy/mentor.',
                'Complete all necessary HR paperwork electronically.',
                'Send company swag/welcome kit.'
            ]
        },
        firstDay: {
            title: 'First Day',
            items: [
                'Virtual welcome meeting with manager and team.',
                'Review first-day agenda and expectations.',
                'Ensure all equipment is set up and functional.',
                'Verify access to all systems and tools.',
                'Complete any remaining HR paperwork/training modules.',
                'Virtual tour of key communication channels and shared resources.',
                'Lunch break with manager or onboarding buddy (virtual).',
                'Initial goal setting discussion with manager.'
            ]
        },
        firstWeek: {
            title: 'First Week',
            items: [
                'Regular check-ins with manager and onboarding buddy.',
                'Complete mandatory compliance training.',
                'Deep dive into role-specific tools and processes.',
                'Meet with key cross-functional stakeholders (virtual).',
                'Begin working on initial tasks/projects.',
                'Review company culture and values.',
                'Set up regular 1:1 meetings with manager.'
            ]
        },
        firstMonth: {
            title: 'First Month',
            items: [
                '30-day check-in with manager to review progress and address concerns.',
                'Continue role-specific training and development.',
                'Seek feedback from manager and peers.',
                'Actively participate in team meetings and discussions.',
                'Understand performance metrics and expectations.',
                'Explore professional development opportunities.'
            ]
        }
    };

    generateBtn.addEventListener('click', () => {
        const employeeName = document.getElementById('employee-name').value || '[New Hire Name]';
        const startDate = document.getElementById('start-date').value || '[Start Date]';

        let content = `
            <h2>Remote Onboarding Checklist for ${employeeName}</h2>
            <p><strong>Start Date:</strong> ${startDate}</p>
            <p>This checklist is designed to ensure a smooth and successful onboarding experience for our remote new hires. It covers key tasks and activities from pre-boarding through the first month.</p>
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
        const headerInfo = checklistContent.querySelectorAll('p');
        headerInfo.forEach(p => {
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
