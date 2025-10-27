
document.addEventListener('DOMContentLoaded', () => {
    const generateQuestionsBtn = document.getElementById('generate-questions');
    const jobRoleInput = document.getElementById('job-role');
    const experienceLevelSelect = document.getElementById('experience-level');
    const keySkillsInput = document.getElementById('key-skills');
    const questionsOutputDiv = document.getElementById('questions-output');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    const questionBank = {
        general: {
            entry: [
                "Tell me about yourself.",
                "Why are you interested in this position?",
                "What are your strengths and weaknesses?"
            ],
            mid: [
                "Describe a challenging project you worked on and how you overcame obstacles.",
                "How do you prioritize tasks and manage your time effectively?",
                "Tell me about a time you had to adapt to a change in the workplace."
            ],
            senior: [
                "Describe your leadership style and how you motivate your team.",
                "How do you handle conflict or disagreements within a team?",
                "Tell me about a strategic decision you made and its impact."
            ]
        },
        technical: {
            'Python': [
                "Explain the difference between a list and a tuple in Python.",
                "How do you handle errors in Python?",
                "Describe a project where you used Python and the challenges you faced."
            ],
            'JavaScript': [
                "Explain event delegation in JavaScript.",
                "What are closures in JavaScript?",
                "Describe a complex UI component you built with JavaScript."
            ]
        },
        softSkills: {
            'Communication': [
                "Describe a situation where you had to explain a complex technical concept to a non-technical audience.",
                "How do you ensure effective communication within your team?"
            ],
            'Project Management': [
                "Tell me about your experience managing projects from start to finish.",
                "How do you handle project delays or scope changes?"
            ]
        }
    };

    const generateQuestions = () => {
        const jobRole = jobRoleInput.value;
        const experienceLevel = experienceLevelSelect.value;
        const keySkills = keySkillsInput.value.split(',').map(s => s.trim()).filter(s => s);

        if (!jobRole) {
            alert('Please enter a Job Role.');
            return;
        }

        let generatedQuestions = `<h2>Interview Questions for ${jobRole} (${experienceLevel}-level)</h2><ul>`;

        // Add general questions
        if (questionBank.general[experienceLevel]) {
            questionBank.general[experienceLevel].forEach(q => {
                generatedQuestions += `<li>${q}</li>`;
            });
        }

        // Add technical and soft skill questions based on input
        keySkills.forEach(skill => {
            if (questionBank.technical[skill]) {
                questionBank.technical[skill].forEach(q => {
                    generatedQuestions += `<li>${q}</li>`;
                });
            } else if (questionBank.softSkills[skill]) {
                questionBank.softSkills[skill].forEach(q => {
                    generatedQuestions += `<li>${q}</li>`;
                });
            }
        });

        generatedQuestions += '</ul>';

        questionsOutputDiv.innerHTML = generatedQuestions;
        questionsOutputDiv.style.display = 'block';
        emailCaptureDiv.style.display = 'block';

        logAnalytics('interview_questions_generated');
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Job Interview Question Generator',
                timestamp: new Date().toISOString()
            };
            saveLead(leadData);
            emailMessage.textContent = 'Thank you! Your interview question set has been sent to your email.';
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

    generateQuestionsBtn.addEventListener('click', generateQuestions);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);
});
