import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export interface FormFieldProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, type = 'text', label, placeholder, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          placeholder={placeholder}
          type={type}
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {...props}
        ></input>
        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
      </div>
    );
  },
);

FormField.displayName = 'FormField';

export default FormField;
