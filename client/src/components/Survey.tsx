import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SurveyAnswers, PolicyQuestion } from '../types/survey.ts';
import { useSurveyConfig } from '../hooks/useSurveyConfig';
import QuestionPage from './QuestionPage.tsx';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import ProgressBar from './ProgressBar';

const Survey = () => {
  const { questionIndex } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { config, loading, error, refetch } = useSurveyConfig();
  
  const questions: PolicyQuestion[] = config 
    ? Object.keys(config.questions).map(key => config.questions[key])
    : [];


  useEffect(() => {
    if (!config) return;
    
    const index = parseInt(questionIndex || '0', 10);
    if (!isNaN(index) && index > 0 && index <= questions.length) {
      setCurrentQuestionIndex(index - 1);
    } else {
      navigate('/');
      setCurrentQuestionIndex(0);
    }
  }, [questionIndex, questions.length, navigate, config]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      navigate(`/question/${currentQuestionIndex + 2}`);
    } else {
      console.log('Survey completed with answers:', answers);
      navigate('/complete', { state: { answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      navigate(`/question/${prevIndex + 1}`);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading survey..." className="max-w-256 py-8 px-4 m-auto" />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={refetch} className="max-w-256 py-8 px-4 m-auto" />;
  }

  if (!config || questions.length === 0) {
    return <LoadingSpinner message="No questions available" className="max-w-256 py-8 px-4 m-auto" />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || '';

  return (
    <div className="max-w-256 py-8 px-4 m-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Political Survey</h1>
        <p className="text-gray-600">Answer questions about Canadian politics</p>
        <div className="mt-4">
          <ProgressBar 
            current={currentQuestionIndex + 1} 
            total={questions.length} 
          />
        </div>
      </div>

      <QuestionPage
        question={currentQuestion}
        answer={currentAnswer}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoBack={currentQuestionIndex > 0}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        config={config}
      />
    </div>
  );
};

export default Survey;