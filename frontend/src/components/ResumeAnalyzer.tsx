import React, { useState } from 'react';
import { apiService } from '../services/api';

const ResumeAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription) return;

    setLoading(true);
    try {
      const result = await apiService.analyzeResume(resumeFile, jobDescription);
      setAnalysis(result);
    } catch (error) {
      console.error('Error:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">JobFit Analyzer</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Upload Resume (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="w-full p-2 border rounded"
            placeholder="Paste the job description here..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Fit'}
        </button>
      </form>

      {analysis && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Overall Score: {analysis.score}/100</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-500 h-4 rounded-full" 
                style={{ width: `${analysis.score}%` }}
              ></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600">✅ Matching Skills</h4>
              <ul className="list-disc list-inside">
                {analysis.matches.map((match: string, index: number) => (
                  <li key={index}>{match}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-600">❌ Missing Keywords</h4>
              <ul className="list-disc list-inside">
                {analysis.missingKeywords.map((keyword: string, index: number) => (
                  <li key={index}>{keyword}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold">💡 Suggestions</h4>
            <ul className="list-disc list-inside">
              {analysis.suggestions.map((suggestion: string, index: number) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;