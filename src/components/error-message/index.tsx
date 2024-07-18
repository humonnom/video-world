import { FieldError } from '@/types/field';

const ErrorMessage: React.FC<{ error?: FieldError }> = ({ error }) => {
  if (!error) {
    return null;
  }
  return (
    <div className={'error-message'}>
      {!error.success && (
        <p className={'text-red-500 text-sm mt-1 ml-0.5'}>
          {error.message ?? ''}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
