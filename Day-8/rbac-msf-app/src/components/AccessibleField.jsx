import React from 'react';


const AccessibleField = ({ label, id, children, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block font-medium text-gray-700 mb-1">{label}</label>
    {children}
    {error && <span role="alert" className="text-red-600 ml-2 text-sm">{error}</span>}
  </div>
);

export default AccessibleField;
