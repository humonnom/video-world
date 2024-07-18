import Label from '@/components/label';
import ErrorMessage from '@/components/error-message';
import { FieldError } from '@/types/field';
import { ReactElement } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  required?: boolean;
  customInput?: (
    inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
      className: string;
    }
  ) => ReactElement;
}

const FormInput = (props: InputProps) => {
  const { customInput, label, error, required, ...rest } = props;

  return (
    <div className="mb-4">
      <Label htmlFor={rest.id} required={required}>
        {label}
      </Label>
      {customInput ? (
        customInput({
          ...rest,
          className:
            'w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500',
        })
      ) : (
        <input
          {...rest}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      )}
      <ErrorMessage error={error} />
    </div>
  );
};
export default FormInput;
