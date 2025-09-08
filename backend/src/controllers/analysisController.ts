import { Request, Response } from 'express';
import { AnalysisService } from '../services/analysisService';
import { extractTextFromPDF } from '../utils/pdfParser';

const analysisService = new AnalysisService();

export const analyzeResume = async (req: Request, res: Response) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    if (!resumeFile || !jobDescription) {
      return res.status(400).json({ error: 'Resume file and job description are required' });
    }

    // Extract text from PDF
    const extractionResult = await extractTextFromPDF(resumeFile.buffer);
    const resumeText = extractionResult.text;
    
    const analysis = await analysisService.analyzeResume(resumeText, jobDescription);

    res.json({
      success: true,
      analysis,
      metadata: {
        processedAt: new Date().toISOString(),
        pageCount: extractionResult.metadata.pageCount
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze resume',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const analyzeResumeDirect = async (req: Request, res: Response) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    if (!resumeFile || !jobDescription) {
      return res.status(400).json({ error: 'Resume file and job description are required' });
    }

    // File buffer approach
    const analysis = await analysisService.processPDFAndAnalyze(resumeFile.buffer, jobDescription);

    res.json({
      success: true,
      analysis,
      metadata: {
        processedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze resume',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};