import React from 'react';

import './message-indicator.css';

const MessageIndicator = ({ children }) => {
  return (
    <div className="app">
      { children }
    </div>
  )
};

export default MessageIndicator;
