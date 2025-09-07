import { useState, useEffect } from 'react';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import { apiService } from './services/api';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState<string>('Checking...');

  useEffect(() => {
    // Check if backend is connected
    const checkBackendHealth = async () => {
      try {
        const health = await apiService.healthCheck();
        setBackendStatus(`✅ ${health.message}`);
      } catch (error) {
        setBackendStatus('❌ Backend connection failed');
        console.error('Backend health check failed:', error);
      }
    };

    checkBackendHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          JobFit Analyzer
        </h1>
        
        <div className="text-center text-sm text-gray-600 mb-6">
          {backendStatus}
        </div>

        <ResumeAnalyzer />
      </div>
    </div>
  );
}

export default App;