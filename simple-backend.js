const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;  // Explicitly set to 3002

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'HRMS Recruitment Management API - Working on port 3002' });
});

// Minimal recruitment endpoints
app.get('/api/positions', (req, res) => {
  res.json({ positions: [] });
});

app.get('/api/applications', (req, res) => {
  res.json({ applications: [] });
});

app.get('/api/recruiters', (req, res) => {
  res.json({ recruiters: [] });
});

app.get('/api/candidates', (req, res) => {
  res.json({ candidates: [] });
});

app.get('/api/departments', (req, res) => {
  res.json({ departments: [] });
});

// Start server
app.listen(PORT, () => {
  console.log(`HRMS Recruitment Management server running on http://localhost:${PORT}`);
});