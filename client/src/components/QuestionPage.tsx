import { Question, SurveyConfig, Choice } from "../types/survey.ts";

interface QuestionPageProps {
  question: Question;
  answer: string;
  onAnswer: (questionId: string, answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLastQuestion: boolean;
  config: SurveyConfig;
}

const QuestionPage = ({
  question,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack,
  isLastQuestion,
  config
}: QuestionPageProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answer.trim()) {
      alert('Please select an answer.');
      return;
    }
    
    onNext();
  };

  const renderChoice = (choice: Choice) => (
    <label
      key={choice.value}
      className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <input
        type="radio"
        name={question.id}
        value={choice.value.toString()}
        checked={answer === choice.value.toString()}
        onChange={(e) => onAnswer(question.id, e.target.value)}
        className="mr-3 text-blue-600"
      />
      <span className="text-gray-800">{choice.label.en}</span>
    </label>
  );

  const renderQuestionInput = () => {
    const choiceGroup = config.choiceGroups[question.choiceGroup];
    
    if (!choiceGroup?.choices) {
      return null;
    }

    const regularChoices = choiceGroup.choices.filter((choice: Choice) => choice.value !== -99);
    const dontKnowChoice = choiceGroup.choices.find((choice: Choice) => choice.value === -99);
    
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          {regularChoices.map(choice => renderChoice(choice))}
        </div>
        
        {dontKnowChoice && (
          <div className="border-t border-gray-200 pt-4">
            {renderChoice(dontKnowChoice)}
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {question.label.en}
        </h2>
        
        {renderQuestionInput()}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoBack}
          className={`px-6 py-2 rounded-lg font-medium ${
            canGoBack
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Previous
        </button>
        
        <button
          type="submit"
          disabled={!answer.trim()}
          className={`px-6 py-2 rounded-lg font-medium ${
            answer.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`
          }
        >
          {isLastQuestion ? 'Complete Survey' : 'Next'}
        </button>
      </div>
    </form>
  );
};

export default QuestionPage;