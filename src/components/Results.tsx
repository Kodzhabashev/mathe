import React from 'react';
import { SessionResult, MathProblem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ResultsProps {
  result: SessionResult;
  onClose: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onClose }) => {
  const { t } = useLanguage();
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
        <h2>{t('resultsTitle', { number: result.sessionId })}</h2>

        <div className="results-summary">
          <div className="summary-stat">
            <span className="stat-label">{t('scoreLabel')}:</span>
            <span className="stat-value">{t('scoreText', { correct: result.correctAnswers, total: result.totalProblems })}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">{t('accuracyLabel')}:</span>
            <span className="stat-value">{t('accuracyText', { accuracy: result.accuracy.toFixed(1) })}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">{t('timeSpentLabel')}:</span>
            <span className="stat-value">{formatTime(result.timeSpent)}</span>
          </div>
        </div>

        {result.errors.length > 0 && (
          <div className="errors-section">
            <h3>{t('incorrectAnswersTitle', { count: result.errors.length })}</h3>
            <div className="errors-list">
              {result.errors.map((error, index) => (
                <div key={error.id} className="error-item">
                  <span className="problem-text">{formatProblem(error)}</span>
                  <span className="user-answer">{t('yourAnswerText', { answer: error.userAnswer || '?' })}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="results-actions">
          <button className="close-button" onClick={onClose}>
            {t('closeResults')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
