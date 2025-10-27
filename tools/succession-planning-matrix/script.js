const addRoleButton = document.getElementById('add-role-btn');
const matrixDiv = document.getElementById('matrix');

let roles = [];

function renderMatrix() {
    if (roles.length === 0) {
        matrixDiv.innerHTML = '<p>No roles added yet.</p>';
        return;
    }

    let html = '<table>';
    html += '<thead><tr><th>Role Name</th><th>Current Incumbent</th><th>Successor Readiness (1-5)</th><th>Successor Potential (1-5)</th></tr></thead>';
    html += '<tbody>';
    roles.forEach(role => {
        html += `<tr><td>${role.roleName}</td><td>${role.incumbent}</td><td>${role.readiness}</td><td>${role.potential}</td></tr>`;
    });
    html += '</tbody>';
    html += '</table>';
    matrixDiv.innerHTML = html;
}

addRoleButton.addEventListener('click', () => {
    const roleName = document.getElementById('role-name').value;
    const incumbent = document.getElementById('incumbent').value;
    const readiness = parseInt(document.getElementById('readiness').value);
    const potential = parseInt(document.getElementById('potential').value);

    if (!roleName || !incumbent || isNaN(readiness) || isNaN(potential)) {
        alert('Please fill out all fields with valid values.');
        return;
    }

    roles.push({ roleName, incumbent, readiness, potential });
    renderMatrix();

    // Clear form fields
    document.getElementById('role-name').value = '';
    document.getElementById('incumbent').value = '';
    document.getElementById('readiness').value = '';
    document.getElementById('potential').value = '';
});

renderMatrix();
