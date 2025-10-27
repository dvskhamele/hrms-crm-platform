
document.addEventListener('DOMContentLoaded', () => {
    const acronyms = [
        { acronym: 'HR', definition: 'Human Resources' },
        { acronym: 'HRM', definition: 'Human Resource Management' },
        { acronym: 'HRD', definition: 'Human Resource Development' },
        { acronym: 'ATS', definition: 'Applicant Tracking System' },
        { acronym: 'EEO', definition: 'Equal Employment Opportunity' },
        { acronym: 'OFCCP', definition: 'Office of Federal Contract Compliance Programs' },
        { acronym: 'FLSA', definition: 'Fair Labor Standards Act' },
        { acronym: 'FMLA', definition: 'Family and Medical Leave Act' },
        { acronym: 'COBRA', definition: 'Consolidated Omnibus Budget Reconciliation Act' },
        { acronym: 'HIPAA', definition: 'Health Insurance Portability and Accountability Act' },
        { acronym: 'ERISA', definition: 'Employee Retirement Income Security Act' },
        { acronym: 'OSHA', definition: 'Occupational Safety and Health Administration' },
        { acronym: 'KPI', definition: 'Key Performance Indicator' },
        { acronym: 'PIP', definition: 'Performance Improvement Plan' },
        { acronym: 'LMS', definition: 'Learning Management System' },
        { acronym: 'HRIS', definition: 'Human Resource Information System' },
        { acronym: 'HCM', definition: 'Human Capital Management' },
        { acronym: 'SaaS', definition: 'Software as a Service' },
        { acronym: 'EVP', definition: 'Employee Value Proposition' },
        { acronym: 'DEI', definition: 'Diversity, Equity, and Inclusion' },
        { acronym: 'WFH', definition: 'Work From Home' },
        { acronym: 'PTO', definition: 'Paid Time Off' },
        { acronym: 'ADA', definition: 'Americans with Disabilities Act' },
        { acronym: 'ADEA', definition: 'Age Discrimination in Employment Act' },
        { acronym: 'GINA', definition: 'Genetic Information Nondiscrimination Act' },
        { acronym: 'NLRA', definition: 'National Labor Relations Act' },
        { acronym: 'USERRA', definition: 'Uniformed Services Employment and Reemployment Rights Act' },
        { acronym: 'ROI', definition: 'Return on Investment' },
        { acronym: 'SME', definition: 'Subject Matter Expert' },
        { acronym: 'SWOT', definition: 'Strengths, Weaknesses, Opportunities, Threats' },
    ];

    const glossaryContainer = document.getElementById('glossary-container');
    const searchInput = document.getElementById('search-input');

    const displayAcronyms = (filteredAcronyms) => {
        glossaryContainer.innerHTML = '';
        const acronymsToDisplay = filteredAcronyms || acronyms;

        acronymsToDisplay.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('glossary-item');
            itemElement.innerHTML = `
                <h3>${item.acronym}</h3>
                <p>${item.definition}</p>
            `;
            glossaryContainer.appendChild(itemElement);
        });
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = acronyms.filter(item => 
            item.acronym.toLowerCase().includes(searchTerm) || 
            item.definition.toLowerCase().includes(searchTerm)
        );
        displayAcronyms(filtered);
    });

    // Initial display
    displayAcronyms();
});
