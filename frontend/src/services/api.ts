import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api', // This will be proxied to http://localhost:3001 via vite.config.ts
  timeout: 30000, // 30 second timeout for large file uploads
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for adding auth tokens if needed later
api.interceptors.request.use(
  (config) => {
    // Add authentication tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access');
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Health check
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    const response = await api.get('/health');
    return response.data;
  },

  // Analyze resume
  analyzeResume: async (file: File, jobDescription: string): Promise<any> => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    const response = await api.post('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Test endpoint
  testEndpoint: async (message: string): Promise<any> => {
    const response = await api.post('/test', { message });
    return response.data;
  },

  // Get analysis history (if you implement it later)
  getAnalysisHistory: async (): Promise<any[]> => {
    const response = await api.get('/analysis/history');
    return response.data;
  },

  // Get specific analysis by ID
  getAnalysisById: async (id: string): Promise<any> => {
    const response = await api.get(`/analysis/${id}`);
    return response.data;
  },
};

// Export the axios instance for direct use if needed
export default api;