import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = ({ errorCode, errorMessage }) => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-code">{errorCode || 'Oops!'}</h1>
        <p className="error-message">
          {errorMessage || 'Something went wrong. The page you are looking for might have been removed, or is temporarily unavailable.'}
        </p>
        <Link to="/" className="home-link">Go to Homepage</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
