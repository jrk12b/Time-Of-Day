// components/Messages.js
import React from 'react';

const SuccessMessage = ({ message }) => {
  return message ? <p className="success-message">{message}</p> : null;
};

const ErrorMessage = ({ message }) => {
  return message ? <p className="error-message">{message}</p> : null;
};

export { SuccessMessage, ErrorMessage };