
document.addEventListener('DOMContentLoaded', () => {
    const addCandidateBtn = document.getElementById('add-candidate-btn');
    const candidateNameInput = document.getElementById('candidate-name');
    const candidateRoleInput = document.getElementById('candidate-role');
    const applicantTableBody = document.querySelector('#applicant-table tbody');

    let candidates = [];

    const hiringStages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];

    const renderTable = () => {
        applicantTableBody.innerHTML = '';
        candidates.forEach((candidate, index) => {
            const row = document.createElement('tr');

            const stageOptions = hiringStages.map(stage => 
                `<option value="${stage}" ${candidate.stage === stage ? 'selected' : ''}>${stage}</option>`
            ).join('');

            row.innerHTML = `
                <td>${candidate.name}</td>
                <td>${candidate.role}</td>
                <td>
                    <select data-index="${index}" class="stage-select">
                        ${stageOptions}
                    </select>
                </td>
                <td><button data-index="${index}" class="remove-btn">Remove</button></td>
            `;
            applicantTableBody.appendChild(row);
        });
    };

    addCandidateBtn.addEventListener('click', () => {
        const name = candidateNameInput.value.trim();
        const role = candidateRoleInput.value.trim();

        if (name && role) {
            candidates.push({ name, role, stage: 'Applied' });
            candidateNameInput.value = '';
            candidateRoleInput.value = '';
            renderTable();
        }
    });

    applicantTableBody.addEventListener('change', (e) => {
        if (e.target.classList.contains('stage-select')) {
            const index = e.target.dataset.index;
            candidates[index].stage = e.target.value;
            renderTable();
        }
    });

    applicantTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            candidates.splice(index, 1);
            renderTable();
        }
    });

    // Initial render
    renderTable();
});
