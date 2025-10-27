
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-checklist-btn');
    const checklistOutput = document.getElementById('checklist-output');
    const checklistContent = document.getElementById('checklist-content');
    const copyBtn = document.getElementById('copy-checklist-btn');

    const checklistData = {
        generalSafety: {
            title: 'General Workplace Safety',
            items: [
                'Are emergency exits clearly marked and unobstructed?',
                'Are fire extinguishers easily accessible and inspected regularly?',
                'Are first-aid kits fully stocked and accessible?',
                'Are walkways clear of hazards and well-lit?',
                'Is proper signage in place for hazardous areas?',
                'Are electrical cords in good condition and not overloaded?',
                'Is the workplace clean and free of clutter?',
                'Are emergency contact numbers clearly posted?',
            ]
        },
        equipmentSafety: {
            title: 'Equipment Safety',
            items: [
                'Are all machines and equipment properly guarded?',
                'Are employees trained on safe operation of equipment?',
                'Is personal protective equipment (PPE) available and used correctly?',
                'Are tools and equipment maintained in good working order?',
                'Are lockout/tagout procedures in place for machinery maintenance?',
            ]
        },
        fireSafety: {
            title: 'Fire Safety',
            items: [
                'Are fire alarms and smoke detectors functional and tested regularly?',
                'Are fire drills conducted periodically?',
                'Is there a clear evacuation plan posted?',
                'Are flammable materials stored safely?',
            ]
        },
        ergonomics: {
            title: 'Ergonomics (Office/Desk Work)',
            items: [
                'Are workstations adjustable and ergonomically sound?',
                'Are employees aware of proper posture and lifting techniques?',
                'Is lighting adequate to prevent eye strain?',
            ]
        }
    };

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const department = document.getElementById('department').value;

        let departmentText = '';
        if (department) {
            departmentText = `<p><strong>Department/Area:</strong> ${department}</p>`;
        }

        let content = `
            <h2>Workplace Safety Checklist for ${companyName}</h2>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            ${departmentText}
            <p>This checklist is designed to help identify potential hazards and ensure compliance with safety standards in the workplace. Please review each item and mark as complete or note any issues.</p>
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
