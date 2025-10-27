const addApplicationButton = document.getElementById('add-application-btn');
const applicationListDiv = document.getElementById('application-list');

let applications = [];

function renderApplicationList() {
    if (applications.length === 0) {
        applicationListDiv.innerHTML = '<p>No applications added yet.</p>';
        return;
    }

    let html = '<h2>Your Applications</h2>';
    applications.forEach(app => {
        html += `
            <div class="application-item">
                <h3>${app.jobTitle} at ${app.companyName}</h3>
                <p><strong>Application Date:</strong> ${app.applicationDate}</p>
                <p><strong>Status:</strong> ${app.status}</p>
            </div>
        `;
    });
    applicationListDiv.innerHTML = html;
}

addApplicationButton.addEventListener('click', () => {
    const jobTitle = document.getElementById('job-title').value;
    const companyName = document.getElementById('company-name').value;
    const applicationDate = document.getElementById('application-date').value;
    const status = document.getElementById('status').value;

    if (!jobTitle || !companyName || !applicationDate || !status) {
        alert('Please fill out all fields.');
        return;
    }

    applications.push({ jobTitle, companyName, applicationDate, status });
    renderApplicationList();

    // Clear form fields
    document.getElementById('job-title').value = '';
    document.getElementById('company-name').value = '';
    document.getElementById('application-date').value = '';
    document.getElementById('status').value = 'applied';
});

renderApplicationList();