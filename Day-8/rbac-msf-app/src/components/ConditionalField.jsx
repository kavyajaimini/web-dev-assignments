import React from 'react';


const ConditionalField = ({ condition, children }) => {
  return condition
    ? <div className="transition-opacity duration-200">{children}</div>
    : null;
};

export default ConditionalField;
