const addSkillButton = document.getElementById('add-skill-btn');
const matrixDiv = document.getElementById('matrix');

let skillsData = {}; // { employeeName: { skill: level, ... }, ... }

function renderMatrix() {
    if (Object.keys(skillsData).length === 0) {
        matrixDiv.innerHTML = '<p>No skills added yet.</p>';
        return;
    }

    let allSkills = new Set();
    for (const employee in skillsData) {
        for (const skill in skillsData[employee]) {
            allSkills.add(skill);
        }
    }
    allSkills = Array.from(allSkills).sort();

    let html = '<table>';
    html += '<thead><tr><th>Employee Name</th>';
    allSkills.forEach(skill => {
        html += `<th>${skill}</th>`;
    });
    html += '</tr></thead>';
    html += '<tbody>';

    for (const employeeName in skillsData) {
        html += `<tr><td>${employeeName}</td>`;
        allSkills.forEach(skill => {
            const level = skillsData[employeeName][skill] || '-';
            html += `<td>${level}</td>`;
        });
        html += '</tr>';
    }
    html += '</tbody>';
    html += '</table>';
    matrixDiv.innerHTML = html;
}

addSkillButton.addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const skillsInput = document.getElementById('skills').value;
    const skillLevel = parseInt(document.getElementById('skill-level').value);

    if (!employeeName || !skillsInput || isNaN(skillLevel) || skillLevel < 1 || skillLevel > 5) {
        alert('Please fill out all fields with valid values (Skill Level 1-5).');
        return;
    }

    if (!skillsData[employeeName]) {
        skillsData[employeeName] = {};
    }

    skillsInput.split(',').forEach(skill => {
        skillsData[employeeName][skill.trim()] = skillLevel;
    });
    
    renderMatrix();

    // Clear form fields
    document.getElementById('employee-name').value = '';
    document.getElementById('skills').value = '';
    document.getElementById('skill-level').value = '';
});

renderMatrix();