import React from 'react';

interface ElapsedTimeProps {
  elapsedTime: number;
}

const ElapsedTimeDisplay: React.FC<ElapsedTimeProps> = ({ elapsedTime }) => {
  // Function to format time in HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div>
      <p>{formatTime(elapsedTime)}</p>
    </div>
  );
};

export default ElapsedTimeDisplay;
