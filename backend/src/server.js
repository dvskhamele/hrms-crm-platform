import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import recruitmentRoutes from './routes/recruitmentRoutes.js';

// Create Express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files

// Routes - using /api prefix for all routes
app.use('/api', recruitmentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Conditionally start the server only if not in a serverless environment
if (!process.env.VERCEL_REGION) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Recruitment API server is running on port ${PORT}`);
  });
}

export default app;