src/components/ui/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClass?: string;
  as?: 'input' | 'textarea'; Agrega esta línea
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, containerClass = '', className = '', ...props }, ref) => {
    return (
      <div className={`mb-4 ${containerClass}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-red-500"> *</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;