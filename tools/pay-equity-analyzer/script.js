document.getElementById('analyze-btn').addEventListener('click', () => {
    const csvData = document.getElementById('csv-data').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!csvData) {
        resultsDiv.innerHTML = '<p style="color: red;">Please paste your CSV data.</p>';
        return;
    }

    try {
        const rows = csvData.trim().split('\n').map(row => row.split(',').map(item => item.trim()));
        const header = rows[0];
        const data = rows.slice(1);

        const genderIndex = header.indexOf('gender');
        const raceIndex = header.indexOf('race');
        const salaryIndex = header.indexOf('salary');

        if (genderIndex === -1 || raceIndex === -1 || salaryIndex === -1) {
            resultsDiv.innerHTML = '<p style="color: red;">CSV data must contain \'gender\', \'race\', and \'salary\' columns.</p>';
            return;
        }

        const analysis = {};

        data.forEach(row => {
            const gender = row[genderIndex];
            const race = row[raceIndex];
            const salary = parseFloat(row[salaryIndex]);

            if (!analysis[gender]) {
                analysis[gender] = { totalSalary: 0, count: 0, races: {} };
            }
            analysis[gender].totalSalary += salary;
            analysis[gender].count++;

            if (!analysis[gender].races[race]) {
                analysis[gender].races[race] = { totalSalary: 0, count: 0 };
            }
            analysis[gender].races[race].totalSalary += salary;
            analysis[gender].races[race].count++;
        });

        let html = '<h2>Analysis Results</h2>';

        for (const gender in analysis) {
            const genderData = analysis[gender];
            const avgSalary = (genderData.totalSalary / genderData.count).toFixed(2);
            html += `<h3>${gender}</h3>`;
            html += `<p>Average Salary: $${avgSalary}</p>`;

            for (const race in genderData.races) {
                const raceData = genderData.races[race];
                const avgRaceSalary = (raceData.totalSalary / raceData.count).toFixed(2);
                html += `<p style="margin-left: 20px;">${race}: Average Salary: $${avgRaceSalary}</p>`;
            }
        }

        resultsDiv.innerHTML = html;

    } catch (error) {
        resultsDiv.innerHTML = `<p style="color: red;">Error analyzing data: ${error.message}</p>`;
    }
});
