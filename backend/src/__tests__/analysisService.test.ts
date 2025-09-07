import { AnalysisService } from '../src/services/analysisService';
import { OpenAI } from 'openai';

jest.mock('openai');
jest.mock('ioredis');

describe('AnalysisService', () => {
  let analysisService: AnalysisService;

  beforeEach(() => {
    analysisService = new AnalysisService();
  });

  it('should analyze resume and return structured results', async () => {
    const mockResponse = {
      choices: [{
        message: {
          content: JSON.stringify({
            score: 85,
            matches: ['React', 'TypeScript'],
            missingKeywords: ['GraphQL'],
            suggestions: ['Add more metrics to your experience'],
            strengths: ['Good foundation in frontend'],
            weaknesses: ['Lacking backend experience']
          })
        }
      }]
    };

    (analysisService['openai'].chat.completions.create as jest.Mock).mockResolvedValue(mockResponse);

    const result = await analysisService.analyzeResume(
      'Experienced React developer',
      'Looking for React/TypeScript developer'
    );

    expect(result.score).toBe(85);
    expect(result.matches).toContain('React');
    expect(result.missingKeywords).toContain('GraphQL');
  });

  it('should cache results in Redis', async () => {
    // Test caching functionality
    const resumeText = 'test resume';
    const jobDescription = 'test job';
    
    await analysisService.analyzeResume(resumeText, jobDescription);
    
    // Second call should use cache
    await analysisService.analyzeResume(resumeText, jobDescription);
    
    // Verify OpenAI API was called only once
    expect(analysisService['openai'].chat.completions.create).toHaveBeenCalledTimes(1);
  });
});