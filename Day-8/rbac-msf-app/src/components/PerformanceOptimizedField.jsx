import React from 'react';


const PerformanceOptimizedField = React.memo(({ fieldProps }) => {
  return (
    <input
      {...fieldProps}
      className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
    />
  );
});

export default PerformanceOptimizedField;
