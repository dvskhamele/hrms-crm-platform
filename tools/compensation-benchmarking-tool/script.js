document.getElementById('benchmark-btn').addEventListener('click', () => {
    const jobTitle = document.getElementById('job-title').value;
    const industry = document.getElementById('industry').value;
    const location = document.getElementById('location').value;
    const resultsDiv = document.getElementById('results');

    if (!jobTitle || !industry || !location) {
        resultsDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    // Mock data for demonstration purposes
    const mockData = {
        "software engineer": {
            "tech": {
                "new york": { min: 100000, max: 180000, avg: 140000 },
                "remote": { min: 90000, max: 160000, avg: 125000 }
            },
            "healthcare": {
                "new york": { min: 90000, max: 160000, avg: 125000 },
                "remote": { min: 80000, max: 140000, avg: 110000 }
            }
        },
        "hr manager": {
            "tech": {
                "new york": { min: 80000, max: 130000, avg: 105000 },
                "remote": { min: 70000, max: 110000, avg: 90000 }
            },
            "healthcare": {
                "new york": { min: 75000, max: 120000, avg: 97500 },
                "remote": { min: 65000, max: 100000, avg: 82500 }
            }
        }
    };

    const normalizedJobTitle = jobTitle.toLowerCase();
    const normalizedIndustry = industry.toLowerCase();
    const normalizedLocation = location.toLowerCase();

    const benchmark = mockData[normalizedJobTitle]?.[normalizedIndustry]?.[normalizedLocation];

    if (benchmark) {
        resultsDiv.innerHTML = `
            <h2>Compensation Benchmark for ${jobTitle} in ${industry}, ${location}:</h2>
            <p><strong>Minimum Salary:</strong> $${benchmark.min.toLocaleString()}</p>
            <p><strong>Maximum Salary:</strong> $${benchmark.max.toLocaleString()}</p>
            <p><strong>Average Salary:</strong> $${benchmark.avg.toLocaleString()}</p>
        `;
    } else {
        resultsDiv.innerHTML = '<p style="color: red;">No benchmark data found for the specified criteria. Please try different inputs.</p>';
    }
});
