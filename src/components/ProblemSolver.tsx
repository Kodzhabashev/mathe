import React, { useState, useEffect } from 'react';
import { MathProblem } from '../types';
import NumericInput from './NumericInput';
import Numpad from './Numpad';
import TimerDisplay from './TimerDisplay';
import { useLanguage } from '../contexts/LanguageContext';
import { TIMER_DURATION_SECONDS } from '../utils/storage';

interface ProblemSolverProps {
  problems: MathProblem[];
  onProblemAnswered: (problemId: number, userAnswer: number) => void;
  currentProblemIndex: number;
  onNextProblem: () => void;
  onSkipProblem?: () => void;
  timeLeft?: number;
}

const ProblemSolver: React.FC<ProblemSolverProps> = ({
  problems,
  onProblemAnswered,
  currentProblemIndex,
  onNextProblem,
  onSkipProblem,
  timeLeft = TIMER_DURATION_SECONDS,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState('');
  const { t } = useLanguage();
  const currentProblem = problems[currentProblemIndex];

  useEffect(() => {
    setCurrentAnswer('');
  }, [currentProblemIndex]);

  const handleSubmitAnswer = () => {
    if (currentAnswer.trim() && currentProblem) {
      const userAnswer = parseInt(currentAnswer.trim(), 10);
      onProblemAnswered(currentProblem.id, userAnswer);
      setCurrentAnswer('');
      onNextProblem();
    }
  };

  const handleNumpadNumber = (number: number) => {
    setCurrentAnswer(prev => (prev + number.toString()).slice(0, 4));
  };

  const handleNumpadBackspace = () => {
    setCurrentAnswer(prev => prev.slice(0, -1));
  };


  const handleSkip = () => {
    if (onSkipProblem) {
      onSkipProblem();
    }
  };


  if (!currentProblem) {
    return <div className="problem-solver">No problems available</div>;
  }

  const progress = ((currentProblemIndex + 1) / problems.length) * 100;

  return (
    <div className="problem-solver">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        <span className="progress-text">
          {currentProblemIndex + 1} / {problems.length}
        </span>
        <TimerDisplay timeLeft={timeLeft} />
      </div>

      <div className="problem-display">
        <div className="problem-number">
          Problem {currentProblemIndex + 1}
        </div>
        <div className="math-problem">
          <span className="operand">{currentProblem.operand1}</span>
          <span className="operation">{currentProblem.operation}</span>
          <span className="operand">{currentProblem.operand2}</span>
          <span className="equals">=</span>
          <div className="inline-input">
            <NumericInput
              value={currentAnswer}
              onChange={setCurrentAnswer}
              placeholder=""
              maxLength={4}
            />
          </div>
        </div>
        <div className="numpad-row">
          <Numpad
            onNumberClick={handleNumpadNumber}
            onBackspace={handleNumpadBackspace}
          />
        </div>
      </div>

      <div className="problem-navigation">
        <button
          className="submit-button"
          onClick={handleSubmitAnswer}
          disabled={!currentAnswer.trim()}
        >
          {t('submitAnswer')}
        </button>
        {onSkipProblem && (
          <button
            className="skip-button"
            onClick={handleSkip}
          >
            {t('skipProblem')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProblemSolver;
