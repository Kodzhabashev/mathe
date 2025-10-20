import React from 'react';

interface TimerDisplayProps {
  timeLeft: number; // in seconds
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = (): string => {
    if (timeLeft <= 60) return '#e74c3c'; // Red for last minute
    if (timeLeft <= 180) return '#f39c12'; // Orange for last 3 minutes
    return '#27ae60'; // Green otherwise
  };

  return (
    <div className="timer-display" style={{ color: getTimerColor() }}>
      <span className="timer-icon">⏱️</span>
      <span className="timer-text">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default TimerDisplay;
