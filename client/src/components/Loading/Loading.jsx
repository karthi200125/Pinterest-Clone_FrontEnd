import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
