const performanceAreaSelect = document.getElementById('performance-area');
const generateBtn = document.getElementById('generate-btn');
const commentList = document.getElementById('comment-list');

const comments = {
    "communication": [
        "[Employee Name] consistently communicates clearly and concisely, both verbally and in writing.",
        "[Employee Name] actively listens to others and effectively conveys their ideas in team discussions.",
        "[Employee Name] could improve their communication by providing more regular updates on project progress.",
        "[Employee Name] sometimes struggles to articulate complex ideas, leading to misunderstandings.",
        "[Employee Name] excels at tailoring their communication style to different audiences."
    ],
    "teamwork": [
        "[Employee Name] is a highly collaborative team member, always willing to support colleagues.",
        "[Employee Name] actively participates in team projects and contributes positively to group dynamics.",
        "[Employee Name] could enhance their teamwork by taking a more proactive role in shared responsibilities.",
        "[Employee Name] sometimes prefers to work independently, which can limit team synergy.",
        "[Employee Name] consistently fosters a cooperative and inclusive team environment."
    ],
    "leadership": [
        "[Employee Name] demonstrates strong leadership potential by guiding and motivating their peers.",
        "[Employee Name] effectively takes initiative and provides clear direction on tasks.",
        "[Employee Name] could develop their leadership skills by seeking opportunities to mentor junior team members.",
        "[Employee Name] sometimes hesitates to take charge in group settings, even when appropriate.",
        "[Employee Name] inspires confidence and trust among team members, leading by example."
    ],
    "problem-solving": [
        "[Employee Name] consistently identifies issues quickly and proposes innovative solutions.",
        "[Employee Name] approaches challenges with a logical and analytical mindset, leading to effective resolutions.",
        "[Employee Name] could improve their problem-solving by exploring a wider range of potential solutions before making a decision.",
        "[Employee Name] sometimes relies too heavily on others to solve complex problems.",
        "[Employee Name] demonstrates excellent critical thinking skills when faced with unexpected obstacles."
    ],
    "productivity": [
        "[Employee Name] consistently meets and often exceeds performance targets and deadlines.",
        "[Employee Name] manages their time effectively, prioritizing tasks to maximize output.",
        "[Employee Name] could enhance their productivity by minimizing distractions and focusing on high-priority tasks.",
        "[Employee Name] sometimes struggles with workload management, leading to missed deadlines.",
        "[Employee Name] is highly efficient and delivers high-quality work consistently."
    ]
};

generateBtn.addEventListener('click', () => {
    const selectedArea = performanceAreaSelect.value;
    commentList.innerHTML = '';

    if (comments[selectedArea]) {
        comments[selectedArea].forEach(comment => {
            const listItem = document.createElement('li');
            listItem.textContent = comment;
            commentList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = "No comments available for this performance area.";
        commentList.appendChild(listItem);
    }
});

// Generate default comments on load
generateBtn.click();
