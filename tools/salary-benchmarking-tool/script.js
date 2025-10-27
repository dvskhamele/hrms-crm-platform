document.addEventListener('DOMContentLoaded', () => {
    logAnalytic('ToolOpened');

    const form = document.getElementById('salary-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        logAnalytic('ToolSubmitted');

        const jobTitle = document.getElementById('job-title').value;
        const industry = document.getElementById('industry').value;
        const location = document.getElementById('location').value;
        const experience = document.getElementById('experience').value;

        const salaryData = {
            "Software Engineer": {
                "Technology": {
                    "USA": {
                        "base": 100000,
                        "experience_multiplier": 10000
                    },
                    "UK": {
                        "base": 70000,
                        "experience_multiplier": 7000
                    }
                }
            },
            "Product Manager": {
                "Technology": {
                    "USA": {
                        "base": 120000,
                        "experience_multiplier": 12000
                    },
                    "UK": {
                        "base": 80000,
                        "experience_multiplier": 8000
                    }
                }
            }
        };

        const jobData = salaryData[jobTitle];
        if (jobData) {
            const industryData = jobData[industry];
            if (industryData) {
                const locationData = industryData[location];
                if (locationData) {
                    const baseSalary = locationData.base;
                    const experienceMultiplier = locationData.experience_multiplier;
                    const estimatedSalary = baseSalary + (experience * experienceMultiplier);
                    const salaryRange = `${estimatedSalary - 10000} - ${estimatedSalary + 10000}`;

                    localStorage.setItem('salaryResult', JSON.stringify({ jobTitle, industry, location, experience, salaryRange }));
                } else {
                    alert("Location not found!");
                    return;
                }
            } else {
                alert("Industry not found!");
                return;
            }
        } else {
            alert("Job title not found!");
            return;
        }

        const resultId = Date.now().toString();
        const resultUrl = `/tools/results/salary-benchmark-result.html?id=${resultId}`;

        // For now, redirect to a placeholder page
        window.location.href = resultUrl;
    });
});

function logAnalytic(eventName) {
    // In a real application, this would send data to an analytics service
    console.log(`Analytics Event: ${eventName}`);
    // Example of what could be sent:
    // fetch('/api/analytics', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ event: eventName, tool: 'SalaryBenchmarkingTool' })
    // });
}
