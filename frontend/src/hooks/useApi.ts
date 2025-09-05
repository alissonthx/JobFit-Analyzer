import { useState, useCallback } from 'react';
import type { ApiError } from '../types/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const callApi = useCallback(async <T>(
    apiCall: () => Promise<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: ApiError) => void
  ): Promise<T | void> => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiCall();
      if (onSuccess) {
        onSuccess(data);
      }
      return data;
    } catch (err: any) {
      const errorObj: ApiError = {
        message: err.response?.data?.error || err.message || 'An error occurred',
        status: err.response?.status,
      };
      
      setError(errorObj);
      if (onError) {
        onError(errorObj);
      }
      throw errorObj;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    callApi,
    clearError,
  };
};