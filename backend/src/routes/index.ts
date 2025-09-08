import express from 'express';
import analysisRoutes from './analysis';

const router = express.Router();

router.use('/api', analysisRoutes);

router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
router.post('/test', (req, res) => {
  const { message } = req.body;
  res.json({ 
    received: true, 
    message: message || 'No message provided',
    timestamp: new Date().toISOString()
  });
});

export default router;