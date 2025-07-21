import React from 'react';


const FormAutoSaveIndicator = ({ status }) => {
  let color = 'text-gray-500';
  if (status === 'Saved') color = 'text-green-600';
  if (status === 'Saving...') color = 'text-orange-500';
  return <span className={`ml-2 font-medium ${color}`}>{status}</span>;
};

export default FormAutoSaveIndicator;
