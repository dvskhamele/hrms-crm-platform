const fs = require('fs');
const path = require('path');

const generateReport = () => {
  const date = new Date().toISOString().slice(0, 10);
  const reportContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weekly Progress Report - ${date}</title>
</head>
<body>
  <h1>Weekly Progress Report - ${date}</h1>
  <p>This report summarizes the progress made in the last week.</p>
  <h2>New Tools Developed:</h2>
  <ul>
    <li>Time to Fill Calculator</li>
    {/* Add more tools as they are developed */}
  </ul>
  <h2>SEO Improvements:</h2>
  <ul>
    <li>Added new heading and paragraph to Time to Fill Calculator audit blog.</li>
    {/* Add more SEO improvements as they are made */}
  </ul>
  <h2>New Pages Generated:</h2>
  <ul>
    {/* Add new pages as they are generated */}
  </ul>
  <h2>Scraped Content:</h2>
  <p>Dummy content scraped and saved.</p>
  {/* Add more details about scraped content */}
</body>
</html>
`;

  const reportPath = path.join(__dirname, `../blogs/auto_reports/weekly_report_${date}.html`);
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }
  fs.writeFileSync(reportPath, reportContent);
  console.log(`Generated weekly report: ${reportPath}`);
};

const run = () => {
  generateReport();
};

run();