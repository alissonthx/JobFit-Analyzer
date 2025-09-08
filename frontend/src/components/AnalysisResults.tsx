import React, { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { CheckCircle, XCircle, Lightbulb, TrendingUp, AlertCircle, Download, RotateCcw } from 'lucide-react';
import type { AnalysisResult } from '../types/api';

interface AnalysisResultsProps {
  analysis: AnalysisResult;
  jobDescription: string;
  onReset: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  analysis, 
  jobDescription,
  onReset 
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent match! 🎉';
    if (score >= 60) return 'Good potential 👍';
    return 'Needs improvement 📈';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const exportResults = () => {
    const data = {
      analysis,
      jobDescription,
      generatedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jobfit-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabClasses = (selected: boolean) =>
    `w-full py-4 text-sm font-medium rounded-lg transition-all duration-200 ${
      selected
        ? 'bg-blue-600 text-white shadow-lg'
        : 'bg-white text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <div className="space-y-8 fade-in">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-3">Analysis Complete 🎯</h3>
        <p className="text-lg text-gray-600">Here's how your resume matches the job description</p>
      </div>

      {/* Score Summary */}
      <div className={`p-8 rounded-2xl text-center border-2 ${getScoreBgColor(analysis.score)}`}>
        <div className={`text-6xl font-bold ${getScoreColor(analysis.score)} mb-3`}>
          {analysis.score}/100
        </div>
        <p className="text-2xl font-semibold text-gray-700 mb-6">
          {getScoreLabel(analysis.score)}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mx-auto max-w-md shadow-inner">
          <div 
            className={`h-4 rounded-full transition-all duration-1000 ${
              analysis.score >= 80 ? 'bg-green-500' :
              analysis.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            } shadow-lg`}
            style={{ width: `${analysis.score}%` }}
          ></div>
        </div>
      </div>

      {/* Tabbed Interface */}
      <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
        <TabList className="flex space-x-2 rounded-xl bg-gray-100 p-2">
          <Tab className={tabClasses(selectedTab === 0)}>Matches & Gaps</Tab>
          <Tab className={tabClasses(selectedTab === 1)}>Suggestions</Tab>
          <Tab className={tabClasses(selectedTab === 2)}>Strengths & Weaknesses</Tab>
        </TabList>
        
        <TabPanels className="mt-6">
          {/* Panel 1: Matches & Gaps */}
          <TabPanel>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="font-semibold text-green-800 text-xl">✅ Matching Skills</h4>
                </div>
                <ul className="space-y-3">
                  {analysis.matches.map((match, index) => (
                    <li key={index} className="text-green-700 bg-white py-3 px-4 rounded-xl text-base border border-green-100">
                      {match}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <XCircle className="h-7 w-7 text-red-600 mr-3" />
                  <h4 className="font-semibold text-red-800 text-xl">❌ Missing Keywords</h4>
                </div>
                <ul className="space-y-3">
                  {analysis.missingKeywords.map((keyword, index) => (
                    <li key={index} className="text-red-700 bg-white py-3 px-4 rounded-xl text-base border border-red-100">
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabPanel>

          {/* Panel 2: Suggestions */}
          <TabPanel>
            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-7 w-7 text-blue-600 mr-3" />
                <h4 className="font-semibold text-blue-800 text-xl">💡 Improvement Suggestions</h4>
              </div>
              <ul className="space-y-4">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-blue-700 bg-white py-4 px-5 rounded-xl text-base border border-blue-100">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </TabPanel>

          {/* Panel 3: Strengths & Weaknesses */}
          <TabPanel>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-7 w-7 text-yellow-600 mr-3" />
                  <h4 className="font-semibold text-yellow-800 text-xl">🌟 Strengths</h4>
                </div>
                <ul className="space-y-3">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="text-yellow-700 bg-white py-3 px-4 rounded-xl text-base border border-yellow-100">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-7 w-7 text-orange-600 mr-3" />
                  <h4 className="font-semibold text-orange-800 text-xl">⚠️ Areas to Improve</h4>
                </div>
                <ul className="space-y-3">
                  {analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-orange-700 bg-white py-3 px-4 rounded-xl text-base border border-orange-100">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {/* Action Buttons */}
      <div className="flex gap-6 pt-8 border-t border-gray-200">
        <button
          onClick={onReset}
          className="flex items-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 px-8 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform flex-1"
        >
          <RotateCcw className="h-5 w-5" />
          Analyze Another Resume
        </button>
        
        <button
          onClick={exportResults}
          className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform flex-1"
        >
          <Download className="h-5 w-5" />
          Export Results
        </button>
      </div>
    </div>
  );
};

export default AnalysisResults;