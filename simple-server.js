const express = require('express');
const path = require('path');
const fs = require('fs');

// Create express app
const app = express();

// Use port 3009 to avoid conflicts
const PORT = 3009;

// Serve static files from the frontend out directory
app.use(express.static(path.join(__dirname, 'frontend', 'out')));

// Simple API endpoints that return mock data
app.get('/api/*', (req, res) => {
  // For any API request, return a simple success response
  res.json({ 
    status: 'success', 
    message: 'API endpoint accessed',
    data: {}
  });
});

// Serve index.html for all routes (client-side routing)
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
  console.log(`Recruitment Platform Server running on http://localhost:${PORT}`);
  console.log(`Serving files from: ${path.join(__dirname, 'frontend', 'out')}`);
});