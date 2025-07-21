import React from 'react';


const PasswordConfirmationField = ({ value, onChange, error }) => {
  return (
    <input
      type="password"
      value={value || ''}
      onChange={onChange}
      aria-invalid={!!error}
      className={`border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
  );
};

export default PasswordConfirmationField;
