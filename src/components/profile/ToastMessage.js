import React from 'react';

const ToastMessage = ({ message, visible }) => {
  if (!visible) return null;

  return <div className="toast-message">{message}</div>;
};

export default ToastMessage;
