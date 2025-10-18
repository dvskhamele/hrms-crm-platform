const express = require('express');
const path = require('path');
const fs = require('fs');

// Create express app
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'frontend', 'out')));

// Serve index.html for all routes to support client-side routing
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'frontend', 'out', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('File not found');
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`HRMS Recruitment Platform (Mock Version) running on http://localhost:${PORT}`);
  console.log('This is a frontend-only prototype using localStorage for all data storage');
  console.log('No backend API calls required - all data is mocked in the browser');
});