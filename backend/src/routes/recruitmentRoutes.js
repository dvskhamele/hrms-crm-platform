// recruitmentRoutes.js - API routes for recruitment functionality
import express from 'express';
import recruitmentService from '../services/recruitmentService.js';

const router = express.Router();

// Authentication routes
router.post('/auth/register', (req, res) => {
  try {
    const result = recruitmentService.register(req.body);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error || 'Registration failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const result = recruitmentService.login(email, password);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(401).json({ error: result.error || 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Positions routes
router.get('/positions', (req, res) => {
  try {
    const positions = recruitmentService.getAllPositions();
    res.json({ positions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/positions/:id', (req, res) => {
  try {
    const position = recruitmentService.getPositionById(req.params.id);
    if (position) {
      res.json({ position });
    } else {
      res.status(404).json({ error: 'Position not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/positions', (req, res) => {
  try {
    const result = recruitmentService.createPosition(req.body);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error || 'Failed to create position' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/positions/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const result = recruitmentService.updatePositionStatus(req.params.id, status);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error || 'Failed to update position status' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Applications routes
router.get('/applications', (req, res) => {
  try {
    const applications = recruitmentService.getAllApplications();
    res.json({ applications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/applications/:id', (req, res) => {
  try {
    const application = recruitmentService.getApplicationById(req.params.id);
    if (application) {
      res.json({ application });
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/applications', (req, res) => {
  try {
    const result = recruitmentService.createApplication(req.body);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error || 'Failed to create application' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/applications/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const result = recruitmentService.updateApplicationStatus(req.params.id, status);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error || 'Failed to update application status' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recruiters routes
router.get('/recruiters', (req, res) => {
  try {
    const recruiters = recruitmentService.getAllRecruiters();
    res.json({ recruiters });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/recruiters/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const result = recruitmentService.updateRecruiterStatus(req.params.id, status);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ error: result.error || 'Failed to update recruiter status' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Departments routes
router.get('/departments', (req, res) => {
  try {
    const departments = recruitmentService.getAllDepartments();
    res.json({ departments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard routes
router.get('/dashboard/stats', (req, res) => {
  try {
    const stats = recruitmentService.getDashboardStats();
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/dashboard/activity', (req, res) => {
  try {
    const activity = recruitmentService.getDashboardActivity();
    res.json({ activity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;