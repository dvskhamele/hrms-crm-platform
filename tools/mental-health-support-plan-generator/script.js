document.getElementById('generate-btn').addEventListener('click', () => {
    const planDiv = document.getElementById('plan');

    const plan = {
        title: "Employee Mental Health Support Plan",
        sections: [
            {
                title: "1. Promote Open Communication",
                points: [
                    "Encourage open and honest conversations about mental health.",
                    "Train managers to recognize signs of distress and provide support.",
                    "Create a culture where employees feel safe to speak up without fear of stigma."
                ]
            },
            {
                title: "2. Provide Resources and Support",
                points: [
                    "Offer an Employee Assistance Program (EAP) with confidential counseling services.",
                    "Provide access to mental health apps, online resources, and workshops.",
                    "Ensure health insurance coverage includes mental health services."
                ]
            },
            {
                title: "3. Encourage Work-Life Balance",
                points: [
                    "Promote flexible work arrangements, such as remote work or flexible hours.",
                    "Encourage employees to take regular breaks and use their paid time off.",
                    "Set realistic workloads and deadlines to prevent burnout."
                ]
            },
            {
                title: "4. Foster a Supportive Community",
                points: [
                    "Organize team-building activities and social events to foster connections.",
                    "Create peer support groups or buddy systems.",
                    "Recognize and celebrate employees' contributions and achievements."
                ]
            }
        ]
    };

    let html = `<h2>${plan.title}</h2>`;
    plan.sections.forEach(section => {
        html += `<h3>${section.title}</h3>`;
        html += '<ul>';
        section.points.forEach(point => {
            html += `<li>${point}</li>`;
        });
        html += '</ul>';
    });

    planDiv.innerHTML = html;
});
