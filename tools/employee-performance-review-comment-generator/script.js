document.getElementById('generate-btn').addEventListener('click', () => {
    const category = document.getElementById('category').value;
    const performanceLevel = document.getElementById('performance-level').value;
    const commentsDiv = document.getElementById('comments');

    const commentBank = {
        communication: {
            exceeds: [
                "Exemplary communicator; consistently conveys complex ideas with clarity and precision.",
                "Masterful at active listening, fostering open dialogue and understanding.",
                "Proactively shares information and facilitates effective cross-functional communication."
            ],
            meets: [
                "Communicates clearly and professionally in all interactions.",
                "Listens attentively and responds thoughtfully to colleagues and clients.",
                "Effectively conveys information, ensuring understanding within the team."
            ],
            needs_improvement: [
                "Needs to improve clarity and conciseness in written and verbal communication.",
                "Sometimes struggles to actively listen or understand others' perspectives.",
                "Can be hesitant to share information or ask for clarification."
            ]
        },
        teamwork: {
            exceeds: [
                "An exceptional team player who consistently elevates group performance through collaboration and support.",
                "Proactively seeks opportunities to assist colleagues and shares expertise generously.",
                "Fosters an inclusive and positive team environment, leading by example."
            ],
            meets: [
                "Works effectively with team members, contributing positively to group projects.",
                "Supports colleagues and respects diverse opinions and working styles.",
                "Reliably completes assigned team tasks and contributes to shared goals."
            ],
            needs_improvement: [
                "Needs to enhance collaboration skills and engage more actively in team initiatives.",
                "Can be more proactive in offering support or sharing workload with colleagues.",
                "Sometimes struggles to integrate feedback from team members."
            ]
        },
        productivity: {
            exceeds: [
                "Consistently surpasses productivity targets, delivering high-quality work well before deadlines.",
                "Demonstrates exceptional efficiency and resourcefulness, optimizing workflows and output.",
                "A highly self-motivated individual who consistently takes initiative to drive results."
            ],
            meets: [
                "Consistently meets deadlines and delivers expected output.",
                "Manages time and tasks effectively, completing assignments within established deadlines.",
                "Produces work that is accurate and meets quality standards."
            ],
            needs_improvement: [
                "Needs to improve time management and prioritization to consistently meet deadlines.",
                "Output sometimes falls below expected quality or requires significant revisions.",
                "Can be more proactive in seeking tasks or identifying areas for contribution."
            ]
        },
        problem_solving: {
            exceeds: [
                "Demonstrates outstanding analytical abilities, consistently identifying root causes and implementing innovative solutions.",
                "Proactively anticipates potential problems and implements preventative measures.",
                "Approaches complex challenges with creativity and a strategic mindset."
            ],
            meets: [
                "Effectively identifies and analyzes problems, seeking appropriate solutions.",
                "Applies logical reasoning to analyze situations and make decisions.",
                "Consults with others when facing complex issues."
            ],
            needs_improvement: [
                "Needs to develop stronger problem-solving skills, particularly in complex situations.",
                "Can be more proactive in identifying issues rather than reacting to them.",
                "Sometimes struggles to analyze situations thoroughly before proposing solutions."
            ]
        }
    };

    const comments = commentBank[category]?.[performanceLevel];

    if (comments && comments.length > 0) {
        let html = `<h2>Performance Review Comments for ${category.replace(/-/g, ' ').toUpperCase()} (${performanceLevel.replace(/-/g, ' ').toUpperCase()}):</h2>`;
        html += '<ul>';
        comments.forEach(comment => {
            html += `<li>${comment}</li>`;
        });
        html += '</ul>';
        commentsDiv.innerHTML = html;
    } else {
        commentsDiv.innerHTML = '<p style="color: red;">No comments found for the selected criteria.</p>';
    }
});
