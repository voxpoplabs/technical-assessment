import { useState, useEffect } from 'react';
import { PoliticalSurveyConfig } from '../types/survey';

interface UseSurveyConfigResult {
  config: PoliticalSurveyConfig | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSurveyConfig = (): UseSurveyConfigResult => {
  const [config, setConfig] = useState<PoliticalSurveyConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/config');
      if (!response.ok) {
        throw new Error('Failed to fetch survey configuration');
      }
      const configData = await response.json();
      setConfig(configData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load survey');
      console.error('Error fetching config:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return { config, loading, error, refetch: fetchConfig };
};