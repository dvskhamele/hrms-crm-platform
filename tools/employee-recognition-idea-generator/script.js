
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-ideas-btn');
    const ideasOutput = document.getElementById('ideas-output');
    const ideasContent = document.getElementById('ideas-content');
    const copyBtn = document.getElementById('copy-ideas-btn');

    const recognitionIdeas = {
        publicRecognition: {
            title: 'Public Recognition',
            ideas: [
                'Shout-outs during team meetings or company-wide announcements.',
                '"Employee of the Month" or similar awards with a public announcement.',
                'Feature employee achievements on the company intranet or social media (with consent).',
                'Team presentations to leadership to showcase collective achievements.',
                'Mentions in company newsletters or internal communications.'
            ]
        },
        personalGestures: {
            title: 'Personal Gestures',
            ideas: [
                'Handwritten thank you notes from managers or leadership.',
                'Personalized email acknowledging specific contributions.',
                'Recognition of birthdays and work anniversaries.',
                'Small, thoughtful gifts aligned with employee interests.',
                'A personal call from a senior leader to express appreciation.'
            ]
        },
        timeRewards: {
            title: 'Time-Based Rewards',
            ideas: [
                'Option for an early departure or late start.',
                'An extra-long lunch break.',
                'A half-day off as a spot reward.',
                'Flexible work arrangements for a period.',
                'Additional paid time off (PTO) days.'
            ]
        },
        developmentOpportunities: {
            title: 'Development Opportunities',
            ideas: [
                'Offer a special assignment or project that aligns with their career goals.',
                'Provide mentorship opportunities with senior leaders.',
                'Sponsor attendance at a relevant conference or workshop.',
                'Fund an online course or certification program.',
                'Opportunity to lead a new initiative or project.'
            ]
        },
        creativeFun: {
            title: 'Creative & Fun Ideas',
            ideas: [
                'Organize a team lunch or dinner to celebrate success.',
                '"Swap a Task" day where a manager takes on an employee\'s task.',
                'Host a team-building event or outing.',
                'Create a "Wall of Fame" for recognized employees.',
                'Allow employees to bring pets to work for a day (if feasible).',
                'A rotating trophy or award for team achievements.'
            ]
        }
    };

    generateBtn.addEventListener('click', () => {
        const selectedCategories = Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
                                    .map(cb => cb.id.replace(/-/g, '')); // Convert 'public-recognition' to 'publicRecognition'

        let content = '';

        if (selectedCategories.length === 0) {
            ideasContent.innerHTML = '<p>Please select at least one category to generate ideas.</p>';
            ideasOutput.classList.remove('hidden');
            return;
        }

        selectedCategories.forEach(categoryKey => {
            const category = recognitionIdeas[categoryKey];
            if (category) {
                content += `<div class="idea-category"><h4>${category.title}</h4>`;
                category.ideas.forEach(idea => {
                    content += `<div class="idea-item"><p>- ${idea}</p></div>`;
                });
                content += `</div>`;
            }
        });

        ideasContent.innerHTML = content;
        ideasOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        let textToCopy = 'Generated Employee Recognition Ideas:\n\n';
        const categories = ideasContent.querySelectorAll('.idea-category');
        categories.forEach(category => {
            textToCopy += `**${category.querySelector('h4').textContent}**\n`;
            const items = category.querySelectorAll('.idea-item p');
            items.forEach(item => {
                textToCopy += `${item.textContent}\n`;
            });
            textToCopy += '\n';
        });

        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Ideas';
            }, 2000);
        });
    });
});
