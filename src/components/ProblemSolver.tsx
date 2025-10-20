import React, { useState, useEffect } from 'react';
import { MathProblem } from '../types';
import NumericInput from './NumericInput';

interface ProblemSolverProps {
  problems: MathProblem[];
  onProblemAnswered: (problemId: number, userAnswer: number) => void;
  currentProblemIndex: number;
  onNextProblem: () => void;
}

const ProblemSolver: React.FC<ProblemSolverProps> = ({
  problems,
  onProblemAnswered,
  currentProblemIndex,
  onNextProblem,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState('');
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
        </div>
        <div className="answer-input">
          <NumericInput
            value={currentAnswer}
            onChange={setCurrentAnswer}
            placeholder="Enter answer"
            maxLength={4}
          />
        </div>
      </div>

      <div className="problem-navigation">
        <button
          className="submit-button"
          onClick={handleSubmitAnswer}
          disabled={!currentAnswer.trim()}
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default ProblemSolver;
