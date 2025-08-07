import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SurveyAnswers } from '../types/survey';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';

const SurveyComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const answers = location.state?.answers as SurveyAnswers;

  useEffect(() => {
    const fetchResults = async () => {
      if (!answers) {
        setError('No survey answers found. Please complete the survey first.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }

        const resultsData = await response.json();
        setResults(resultsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results');
        console.error('Error fetching results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [answers]);

  const handleStartOver = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <LoadingSpinner message="Loading results..." className="" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <ErrorDisplay 
            message={error} 
            onRetry={handleStartOver} 
            retryLabel="Start Over"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Survey Complete!
          </h1>
          <p className="text-gray-600">
            Here's how you compare to the top parties
          </p>
        </div>

        {results && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Results</h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-left text-sm overflow-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleStartOver}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Take Survey Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyComplete;