document.addEventListener('DOMContentLoaded', () => {
    const checklistData = {
        it: {
            title: 'IT Setup',
            items: [
                'Set up laptop/computer and necessary peripherals.',
                'Create email account and provide access credentials.',
                'Grant access to required software and systems (e.g., Slack, JIRA, CRM).'
            ]
        },
        hr: {
            title: 'HR Paperwork',
            items: [
                'Complete and sign employment contract and tax forms (W-4, I-9).',
                'Review and acknowledge employee handbook.',
                'Enroll in benefits (health insurance, retirement plans).'
            ]
        },
        training: {
            title: 'Team & Role Training',
            items: [
                'Review job description, goals, and performance metrics.',
                'Schedule introductory meetings with team members and key stakeholders.',
                'Provide access to training materials and documentation.',
                'Assign a mentor or onboarding buddy.'
            ]
        },
        culture: {
            title: 'Company Culture & Introduction',
            items: [
                'Schedule a welcome lunch or coffee with the team.',
                'Provide a tour of the office (if applicable).',
                'Explain company values, mission, and history.',
                'Add new hire to relevant communication channels and groups.'
            ]
        }
    };

    const generateBtn = document.getElementById('generate-checklist-btn');
    const checklistOutput = document.getElementById('checklist-output');
    const checklistContent = document.getElementById('checklist-content');
    const copyBtn = document.getElementById('copy-checklist-btn');

    generateBtn.addEventListener('click', () => {
        const includeIT = document.getElementById('include-it').checked;
        const includeHR = document.getElementById('include-hr').checked;
        const includeTraining = document.getElementById('include-training').checked;
        const includeCulture = document.getElementById('include-culture').checked;

        let content = '';

        if (includeIT) content += generateCategoryHTML(checklistData.it);
        if (includeHR) content += generateCategoryHTML(checklistData.hr);
        if (includeTraining) content += generateCategoryHTML(checklistData.training);
        if (includeCulture) content += generateCategoryHTML(checklistData.culture);

        checklistContent.innerHTML = content;
        checklistOutput.classList.remove('hidden');
    });

    const generateCategoryHTML = (category) => {
        let html = `<div class="checklist-category"><h4>${category.title}</h4>`;
        category.items.forEach(item => {
            html += `<div class="checklist-item"><input type="checkbox"><label>${item}</label></div>`;
        });
        html += `</div>`;
        return html;
    };

    copyBtn.addEventListener('click', () => {
        let textToCopy = '';
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