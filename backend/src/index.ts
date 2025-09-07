import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'JobFit Analyzer API is running!',
    timestamp: new Date().toISOString()
  });
});

// Basic test endpoint
app.post('/api/test', (req, res) => {
  const { message } = req.body;
  res.json({ 
    received: true, 
    message: message || 'No message provided',
    echo: req.body
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`✅ Health check: http://localhost:${port}/api/health`);
});