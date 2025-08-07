interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

const LoadingSpinner = ({ 
  message = 'Loading...', 
  className = 'max-w-4xl mx-auto py-16 px-4' 
}: LoadingSpinnerProps) => {
  return (
    <div className={className}>
      <div className="text-center">
        <div className="text-xl font-semibold text-gray-700">{message}</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;