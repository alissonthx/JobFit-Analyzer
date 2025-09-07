import { Request, Response } from 'express';
import { AnalysisService } from '../services/analysisService';

const analysisService = new AnalysisService();

export const analyzeResume = async (req: Request, res: Response) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    if (!resumeFile || !jobDescription) {
      return res.status(400).json({ error: 'Resume file and job description are required' });
    }

    const resumeText = await extractTextFromPDF(resumeFile.buffer);
    const analysis = await analysisService.analyzeResume(resumeText, jobDescription);

    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
};