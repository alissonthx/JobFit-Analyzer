import React, { useState } from 'react';
import { apiService } from '../services/api';

const ApiTest: React.FC = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<any>(null);

  const handleTest = async () => {
    try {
      const result = await apiService.testEndpoint(message);
      setResponse(result);
    } catch (error) {
      setResponse({ error: (error as Error).message });
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white mb-6">
      <h3 className="text-lg font-semibold mb-2">API Test</h3>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter test message"
        className="border p-2 mr-2 rounded"
      />
      <button
        onClick={handleTest}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test API
      </button>
      {response && (
        <div className="mt-2 p-2 bg-gray-50 rounded">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;