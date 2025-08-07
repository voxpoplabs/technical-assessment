import { useNavigate } from 'react-router-dom';
import { useSurveyConfig } from '../hooks/useSurveyConfig';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';

const LandingPage = () => {
  const navigate = useNavigate();
  const { config, loading, error, refetch } = useSurveyConfig();
  
  const questionCount = config ? Object.keys(config.questions).length : 0;


  const handleStartSurvey = () => {
    navigate('/question/1');
  };

  if (loading) {
    return <LoadingSpinner message="Loading survey..." />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={refetch} />;
  }

  if (!config) {
    return <LoadingSpinner message="No survey available" />;
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Political Survey
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          See how your views compare with the top Canadian fictional parties.
        </p>
        
        <div className="bg-blue-50 rounded-xl p-8 mb-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            About This Survey
          </h2>
          <div className="text-left space-y-3 text-gray-700">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p><strong>{questionCount} questions</strong> about key political issues in Canada</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p><strong>1-2 minutes</strong> to complete</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p><strong>Anonymous</strong> responses that protect your privacy</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>Questions cover topics like healthcare, environment, economy, and governance</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleStartSurvey}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Start Survey
        </button>
        
        <p className="text-sm text-gray-500 mt-4">
          You can navigate back and forth between questions as needed
        </p>
      </div>
    </div>
  );
};

export default LandingPage;