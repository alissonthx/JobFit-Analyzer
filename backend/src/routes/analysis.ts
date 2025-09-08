import express from 'express';
import { analyzeResume } from '../controllers/analysisController';
import { uploadMiddleware } from '../middleware/upload';

const router = express.Router();

// POST /api/analyze - Analyze a resume
router.post('/analyze', uploadMiddleware, analyzeResume);

// Optional: Health check endpoint for analysis routes
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Analysis routes are working' });
});

export default router;