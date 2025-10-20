import React from 'react';
import { SessionResult, MathProblem } from '../types';

interface ResultsProps {
  result: SessionResult;
  onClose: () => void;
  onRetry?: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onClose, onRetry }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatProblem = (problem: MathProblem): string => {
    return `${problem.operand1} ${problem.operation} ${problem.operand2} = ${problem.correctAnswer}`;
  };

  return (
    <div className="results-modal">
      <div className="results-content">
        <h2>Session {result.sessionId} Results</h2>

        <div className="results-summary">
          <div className="summary-stat">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{result.correctAnswers}/{result.totalProblems}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Accuracy:</span>
            <span className="stat-value">{result.accuracy.toFixed(1)}%</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Time Spent:</span>
            <span className="stat-value">{formatTime(result.timeSpent)}</span>
          </div>
        </div>

        {result.errors.length > 0 && (
          <div className="errors-section">
            <h3>Incorrect Answers ({result.errors.length})</h3>
            <div className="errors-list">
              {result.errors.map((error, index) => (
                <div key={error.id} className="error-item">
                  <span className="problem-text">{formatProblem(error)}</span>
                  <span className="user-answer">Your answer: {error.userAnswer}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="results-actions">
          {onRetry && (
            <button className="retry-button" onClick={onRetry}>
              Try Again
            </button>
          )}
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
