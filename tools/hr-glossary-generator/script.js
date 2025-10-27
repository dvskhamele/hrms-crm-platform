document.getElementById('generate-btn').addEventListener('click', () => {
    const glossaryDiv = document.getElementById('glossary');

    const terms = [
        { term: "Applicant Tracking System (ATS)", definition: "Software used by recruiters and employers to track applicants and manage the hiring process." },
        { term: "Employee Engagement", definition: "The emotional commitment an employee has to their organization and its goals." },
        { term: "Human Resources (HR)", definition: "The department responsible for managing an organization's workforce." },
        { term: "Onboarding", definition: "The process of integrating a new employee into an organization and its culture." },
        { term: "Performance Review", definition: "A formal assessment in which a manager evaluates an employee's work performance." },
        { term: "Recruitment", definition: "The process of actively seeking out, finding, and hiring candidates for a job." },
        { term: "Retention Rate", definition: "The percentage of employees who remain with an organization over a given period." },
        { term: "Succession Planning", definition: "A process for identifying and developing new leaders and high-potential employees to replace current ones." },
        { term: "Time to Hire", definition: "The number of days between a job opening being approved and a candidate accepting the offer." },
        { term: "Turnover Rate", definition: "The percentage of employees who leave an organization over a given period." }
    ];

    let html = '<h2>HR Glossary</h2>';
    terms.forEach(item => {
        html += `<p><span class="term">${item.term}:</span> ${item.definition}</p>`;
    });

    glossaryDiv.innerHTML = html;
});