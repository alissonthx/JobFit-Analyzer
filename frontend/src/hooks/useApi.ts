// hooks/useApi.ts
import { useState, useCallback } from 'react';
import type { ApiError } from '../types/api';

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [isOnline, setIsOnline] = useState(true);
  const [backendStatus, setBackendStatus] = useState('Backend not connected');

  const checkBackendStatus = useCallback(async (): Promise<boolean> => {
    try {
      // Simple health check endpoint - adjust based on your backend
      const response = await fetch('/api/health');
      const isOnline = response.ok;
      setIsOnline(isOnline);
      setBackendStatus(isOnline ? 'Backend connected' : 'Backend not responding');
      return isOnline;
    } catch {
      setIsOnline(false);
      setBackendStatus('Backend not connected');
      return false;
    }
  }, []);

  const callApi = useCallback(async <T>(
    apiCall: () => Promise<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: ApiError) => void
  ): Promise<T | void> => {
    setLoading(true);
    setError(null);
    setStatus('loading');

    // Optional: Check backend status before making the call
    const isBackendOnline = await checkBackendStatus();
    if (!isBackendOnline) {
      const errorObj: ApiError = {
        message: 'Backend service is unavailable',
        status: 503,
      };
      setError(errorObj);
      setStatus('error');
      setLoading(false);
      
      if (onError) {
        onError(errorObj);
      }
      throw errorObj;
    }

    try {
      const data = await apiCall();
      if (onSuccess) {
        onSuccess(data);
      }
      setStatus('success');
      return data;
    } catch (err: any) {
      const errorObj: ApiError = {
        message: err.response?.data?.error || err.message || 'An error occurred',
        status: err.response?.status,
        details: err.response?.data?.details,
      };
      
      setError(errorObj);
      setStatus('error');
      if (onError) {
        onError(errorObj);
      }
      throw errorObj;
    } finally {
      setLoading(false);
    }
  }, [checkBackendStatus]);

  const clearError = useCallback(() => {
    setError(null);
    setStatus('idle');
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setStatus('idle');
  }, []);

  return {
    loading,
    error,
    status,
    isOnline,
    backendStatus,
    callApi,
    clearError,
    reset,
    checkBackendStatus,
  };
};