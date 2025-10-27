
document.addEventListener('DOMContentLoaded', () => {
    const generatePhraseBtn = document.getElementById('generate-phrase');
    const categorySelect = document.getElementById('category');
    const sentimentSelect = document.getElementById('sentiment');
    const phraseOutputDiv = document.getElementById('phrase-output');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    const phrases = {
        communication: {
            positive: [
                "Effectively communicates ideas and information to team members and stakeholders.",
                "Demonstrates strong active listening skills and provides clear, concise feedback.",
                "Proactively shares important updates and ensures everyone is well-informed."
            ],
            needs-improvement: [
                "Needs to improve clarity and conciseness in written and verbal communication.",
                "Should work on actively listening to others' perspectives before responding.",
                "Can be more proactive in sharing information with relevant team members."
            ]
        },
        teamwork: {
            positive: [
                "Consistently collaborates effectively with team members to achieve shared goals.",
                "Actively supports colleagues and contributes positively to team morale.",
                "Demonstrates a strong ability to work cross-functionally and build strong relationships."
            ],
            needs-improvement: [
                "Needs to enhance collaboration with team members on shared projects.",
                "Should focus on contributing more actively to team discussions and initiatives.",
                "Can improve in building stronger working relationships with colleagues."
            ]
        },
        leadership: {
            positive: [
                "Inspires and motivates team members to achieve their full potential.",
                "Provides clear direction and guidance, fostering a productive work environment.",
                "Effectively delegates tasks and empowers team members to take ownership."
            ],
            needs-improvement: [
                "Needs to develop stronger leadership presence and decision-making skills.",
                "Should work on providing more consistent guidance and support to direct reports.",
                "Can improve in delegating tasks effectively and empowering team members."
            ]
        },
        problem-solving: {
            positive: [
                "Demonstrates excellent analytical skills and effectively identifies root causes of problems.",
                "Proactively seeks innovative solutions to complex challenges.",
                "Makes sound decisions under pressure and adapts quickly to changing circumstances."
            ],
            needs-improvement: [
                "Needs to improve analytical skills to more effectively identify problem root causes.",
                "Should focus on developing more innovative approaches to problem-solving.",
                "Can improve in making timely and effective decisions, especially under pressure."
            ]
        },
        productivity: {
            positive: [
                "Consistently meets or exceeds performance expectations and delivers high-quality work.",
                "Manages time effectively and prioritizes tasks to maximize output.",
                "Demonstrates a strong work ethic and commitment to achieving goals."
            ],
            needs-improvement: [
                "Needs to improve time management and prioritization skills to meet deadlines more consistently.",
                "Should focus on increasing output and efficiency in daily tasks.",
                "Can improve in maintaining consistent productivity levels, especially during demanding periods."
            ]
        }
    };

    const generatePhrase = () => {
        const category = categorySelect.value;
        const sentiment = sentimentSelect.value;

        if (phrases[category] && phrases[category][sentiment]) {
            const availablePhrases = phrases[category][sentiment];
            const randomIndex = Math.floor(Math.random() * availablePhrases.length);
            phraseOutputDiv.innerHTML = `<p>${availablePhrases[randomIndex]}</p>`;
            phraseOutputDiv.style.display = 'block';
            emailCaptureDiv.style.display = 'block';
            logAnalytics('performance_review_phrase_generated');
        } else {
            phraseOutputDiv.innerHTML = '<p>No phrases available for this selection.</p>';
            phraseOutputDiv.style.display = 'block';
        }
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Performance Review Phrase Generator',
                timestamp: new Date().toISOString()
            };
            saveLead(leadData);
            emailMessage.textContent = 'Thank you! A comprehensive list of phrases has been sent to your email.';
            emailMessage.style.color = 'green';
        } else {
            emailMessage.textContent = 'Please enter a valid email address.';
            emailMessage.style.color = 'red';
        }
    };

    const saveLead = (leadData) => {
        console.log('Lead Captured:', JSON.stringify(leadData));
    };

    const logAnalytics = (eventName) => {
        console.log(`Analytics Event: ${eventName}`);
    };

    generatePhraseBtn.addEventListener('click', generatePhrase);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);
});
