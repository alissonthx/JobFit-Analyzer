import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/api';
import type { AnalysisResult } from '../types/api';
import AnalysisResults from './AnalysisResults';
import FileUpload from './FileUpload';
import JobDescriptionInput from './JobDescriptionInput';
import { Transition } from '@headlessui/react';

const ResumeAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const { loading, error, callApi, clearError } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription.trim()) return;

    clearError();
    
    await callApi(
      () => apiService.analyzeResume(resumeFile, jobDescription),
      (result) => {
        setAnalysis(result);
      },
      (error) => {
        console.error('Analysis failed:', error);
        setAnalysis(null);
      }
    );
  };

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription('');
    setAnalysis(null);
    clearError();
  };

  const isFormValid = resumeFile && jobDescription.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            JobFit Analyzer
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered resume optimization for your dream job
          </p>
        </div>

        <Transition
          show={!analysis}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {!analysis ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <FileUpload 
                resumeFile={resumeFile}
                onFileChange={setResumeFile}
              />
              
              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
              />

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 font-medium">Error: {error.message}</p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Analyzing...
                    </span>
                  ) : (
                    'Analyze Resume Fit'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-4 border border-gray-300 rounded-xl text-blue-500 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Reset
                </button>
              </div>
            </form>
          ) : null}
        </Transition>

        <Transition
          show={!!analysis}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {analysis && (
            <AnalysisResults 
              analysis={analysis}
              jobDescription={jobDescription}
              onReset={handleReset}
            />
          )}
        </Transition>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;