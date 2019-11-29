import React from 'react';

const ValidationError = ({ message, show }) => {
  if (show) {
    return (
      <div className="error-message">{message}</div>
    );
  }
  return null;
};

export default ValidationError;
