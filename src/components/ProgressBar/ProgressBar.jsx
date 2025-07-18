// ProgressBar.jsx - Visual representation of goal progress
import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, status }) => {
  // Determine color based on status
  const getProgressColor = () => {
    switch(status) {
      case 'Completed': return '#4CAF50'; // Green
      case 'Overdue': return '#F44336';   // Red
      case 'Warning': return '#FFC107';   // Yellow
      default: return '#2196F3';         // Blue
    }
  };

  return (
    <div className="progress-container">
      <div 
        className="progress-bar"
        style={{
          width: `${Math.min(progress, 100)}%`,
          backgroundColor: getProgressColor()
        }}
      >
        <span className="progress-text">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;