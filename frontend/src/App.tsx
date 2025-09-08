import { useState, useEffect } from 'react';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import { apiService } from './services/api';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState<string>('Checking backend connection...');
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // Check if backend is connected
    const checkBackendHealth = async () => {
      try {
        const health = await apiService.healthCheck();
        setBackendStatus(`✅ ${health.message}`);
        setIsOnline(true);
      } catch (error) {
        setBackendStatus('❌ Backend connection failed - make sure the server is running');
        setIsOnline(false);
        console.error('Backend health check failed:', error);
      }
    };

    checkBackendHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {!isOnline && (
        <div className="bg-red-100 border-b border-red-200 text-red-700 text-center py-3 px-4">
          <div className="max-w-4xl mx-auto">
            {backendStatus} - Run the backend with: <code className="bg-red-200 px-2 py-1 rounded">cd backend && npm run dev</code>
          </div>
        </div>
      )}
      
      <ResumeAnalyzer />
      
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by AI • Built with React, TypeScript, and OpenAI</p>
      </footer>
    </div>
  );
}

export default App;