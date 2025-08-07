interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

const ErrorDisplay = ({ 
  message, 
  onRetry, 
  retryLabel = 'Retry',
  className = 'max-w-4xl mx-auto py-16 px-4'
}: ErrorDisplayProps) => {
  return (
    <div className={className}>
      <div className="text-center">
        <div className="text-xl font-semibold text-red-600 mb-4">Error</div>
        <div className="text-gray-700 mb-4">{message}</div>
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;