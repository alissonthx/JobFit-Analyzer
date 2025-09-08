import ResumeAnalyzer from './components/ResumeAnalyzer';
import { useApi } from './hooks/useApi';
import { Transition } from '@headlessui/react';

function App() {
  const { isOnline, backendStatus } = useApi();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Transition
        show={!isOnline}
        enter="transition-all duration-300"
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-300"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-4"
      >
        {!isOnline && (
          <div className="bg-red-100 border-b border-red-200 text-red-700 text-center py-3 px-4">
            <div className="max-w-4xl mx-auto">
              {backendStatus} - Run the backend with: <code className="bg-red-200 px-2 py-1 rounded">cd backend && npm run dev</code>
            </div>
          </div>
        )}
      </Transition>
      
      <ResumeAnalyzer />
      
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by AI • Built with React, TypeScript, and OpenAI</p>
      </footer>
    </div>
  );
}

export default App;