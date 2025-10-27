const jobTitleInput = document.getElementById('job-title');
const experienceInput = document.getElementById('experience');
const locationInput = document.getElementById('location');
const estimateBtn = document.getElementById('estimate-btn');
const salaryRangeP = document.getElementById('salary-range');

estimateBtn.addEventListener('click', () => {
    const jobTitle = jobTitleInput.value.trim().toLowerCase();
    const experience = parseInt(experienceInput.value) || 0;
    const location = locationInput.value.trim().toLowerCase();

    let baseSalary = 50000;
    let experienceFactor = experience * 5000;
    let locationFactor = 0;

    // Simple logic for demonstration
    if (jobTitle.includes('software') || jobTitle.includes('developer')) {
        baseSalary = 70000;
    } else if (jobTitle.includes('manager') || jobTitle.includes('lead')) {
        baseSalary = 80000;
    } else if (jobTitle.includes('marketing')) {
        baseSalary = 60000;
    }

    if (location.includes('new york') || location.includes('london') || location.includes('san francisco')) {
        locationFactor = 20000;
    } else if (location.includes('remote')) {
        locationFactor = -5000;
    }

    const estimatedMin = baseSalary + experienceFactor + locationFactor;
    const estimatedMax = estimatedMin + 30000; // Add a fixed range for simplicity

    salaryRangeP.textContent = `$${estimatedMin.toLocaleString()} - $${estimatedMax.toLocaleString()}`;
});