import { OpenAI } from 'openai';
import { Redis } from 'ioredis';
import { extractTextFromPDF } from '../utils/pdfParser';

export class AnalysisService {
  private openai: OpenAI;
  private redis: Redis;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
    this.redis = new Redis(process.env.REDIS_URL!);
  }

  async analyzeResume(
    resumeText: string, 
    jobDescription: string
  ): Promise<AnalysisResult> {
    const cacheKey = `analysis:${this.generateHash(resumeText + jobDescription)}`;
    
    // Check Redis cache first
    const cachedResult = await this.redis.get(cacheKey);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }

    const prompt = `
      Analyze how well this resume matches the job description and provide specific, actionable feedback.
      
      RESUME:
      ${resumeText}
      
      JOB DESCRIPTION:
      ${jobDescription}
      
      Provide analysis in this JSON format:
      {
        "score": number (0-100),
        "matches": string[],
        "missingKeywords": string[],
        "suggestions": string[],
        "strengths": string[],
        "weaknesses": string[]
      }
    `;

    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 1000
    });

    const result = JSON.parse(response.choices[0]?.message?.content || '{}');
    
    // Cache result in Redis for 24 hours
    await this.redis.setex(cacheKey, 86400, JSON.stringify(result));
    
    return result;
  }

  private generateHash(text: string): string {
    // Simple hash function for caching
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString();
  }
}

export interface AnalysisResult {
  score: number;
  matches: string[];
  missingKeywords: string[];
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}