import React, { useState } from 'react';

interface FloatingLabelInputProps {
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: boolean; 
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  name,
  value = '',
  onChange,
  type = 'text',
  error = false,
}) => {
  const [isActive, setIsActive] = useState(!!value);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsActive(false);
    }
  };

  return (
    <div className={`mb-0.5 relative ${isActive || error ? 'active' : ''}`}>
      <label
        htmlFor={name}
        className={`block font-bold text-white-900 transition-transform ${
          isActive || value ? '-translate-y-5 text-xs text-gray-400' : ''
        } absolute left-4 top-1/2 transform -translate-y-2/4 ${
          isActive || value ? 'active' : ''
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
        className={`bg-[#2f2e2e] border ${
          error ? 'border-red-500' : 'border-gray-300'
        } px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-350`}
        style={{ padding: '1rem 0.4rem 0.2rem 0.4rem' }}
      />
    </div>
  );
};

export default FloatingLabelInput;
