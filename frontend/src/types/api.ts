export interface AnalysisResult {
  score: number;
  matches: string[];
  missingKeywords: string[];
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface HealthCheckResponse {
  status: string;
  message: string;
  timestamp?: string;
}