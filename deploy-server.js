const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the frontend build directory
const staticPath = path.join(__dirname, 'frontend', 'out');
app.use(express.static(staticPath));

// Serve index.html for all routes (client-side routing)
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not found');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`HRMS Recruitment Platform running on http://localhost:${PORT}`);
});