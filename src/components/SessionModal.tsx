import React, { useState, useEffect } from 'react';
import { SessionData, SessionResult } from '../types';
import Timer from './Timer';
import TimerDisplay from './TimerDisplay';
import ProblemSolver from './ProblemSolver';
import Results from './Results';
import { useLanguage } from '../contexts/LanguageContext';
import { initializeSession, TOTAL_PROBLEMS } from '../utils/storage';

interface SessionModalProps {
  session: SessionData;
  isOpen: boolean;
  onClose: () => void;
  onSessionComplete: (result: SessionResult, problems?: any[]) => void;
}

const SessionModal: React.FC<SessionModalProps> = ({
  session,
  isOpen,
  onClose,
  onSessionComplete,
}) => {
  const DEFAULT_TIMER_MINUTES = 10;
  const TIMER_OPTIONS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const [sessionState, setSessionState] = useState<'start' | 'solving' | 'finished'>('start');
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);
  const [initializedSession, setInitializedSession] = useState<SessionData | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState(DEFAULT_TIMER_MINUTES);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMER_MINUTES * 60);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen && session) {
      if (session.completed && session.problems && session.problems.length > 0) {
        // For completed sessions, use saved problems and calculate results immediately
        const answeredProblems = session.problems;
        const correctAnswers = answeredProblems.filter(p => p.userAnswer === p.correctAnswer).length;
        const errors = answeredProblems.filter(p => p.userAnswer !== p.correctAnswer);

        const result: SessionResult = {
          sessionId: session.id,
          correctAnswers,
          totalProblems: answeredProblems.length,
          timeSpent: session.timeSpent || 0,
          errors,
          accuracy: answeredProblems.length > 0 ? (correctAnswers / answeredProblems.length) * 100 : 0,
        };

        setSessionResult(result);
        setSessionState('finished');
        setCurrentProblemIndex(answeredProblems.length - 1); // Set to last problem
        setInitializedSession(session); // Use the session directly
      } else {
        // For new sessions, initialize with problems
        const initSession = initializeSession(session.id);
        setInitializedSession(initSession);

        // For new sessions, start normally
        setSessionState('start');
        setCurrentProblemIndex(0);
        setStartTime(null);
        setSessionResult(null);
      }
    }
  }, [isOpen, session]);

  const handleStartSession = () => {
    setSessionState('solving');
    setStartTime(new Date());
    setTimeLeft(selectedMinutes * 60);
  };

  const handleTimeUpdate = (newTimeLeft: number) => {
    setTimeLeft(newTimeLeft);
  };

  const handleTimeUp = () => {
    // Calculate results when time is up
    const endTime = new Date();
    const timeSpent = startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0;

    const answeredProblems = (initializedSession?.problems || []).slice(0, currentProblemIndex + 1);
    const correctAnswers = answeredProblems.filter(p => p.isCorrect).length;
    const errors = answeredProblems.filter(p => !p.isCorrect);

    const result: SessionResult = {
      sessionId: session.id,
      correctAnswers,
      totalProblems: answeredProblems.length,
      timeSpent,
      errors,
      accuracy: answeredProblems.length > 0 ? (correctAnswers / answeredProblems.length) * 100 : 0,
    };

    setSessionResult(result);
    setSessionState('finished');
    onSessionComplete(result, initializedSession?.problems);
  };

  const handleProblemAnswered = (problemId: number, userAnswer: number) => {
    // Update the problem with user answer
    const problem = initializedSession?.problems.find(p => p.id === problemId);
    if (problem) {
      problem.userAnswer = userAnswer;
      problem.isCorrect = userAnswer === problem.correctAnswer;
    }
  };

  const handleNextProblem = () => {
    const problemsLength = initializedSession?.problems.length || 0;
    if (currentProblemIndex < problemsLength - 1) {
      setCurrentProblemIndex(prev => prev + 1);
    } else {
      // All problems answered, but timer will handle completion
      handleTimeUp();
    }
  };

  const handleSkipProblem = () => {
    if (initializedSession && initializedSession.problems.length > 0) {
      const currentProblem = initializedSession.problems[currentProblemIndex];

      // Remove the current problem from its position
      initializedSession.problems.splice(currentProblemIndex, 1);

      // Add it to the end
      initializedSession.problems.push(currentProblem);

      // If we're not at the last problem, stay at current index (which now contains the next problem)
      // If we're at the last problem, move to the new last problem (which is the skipped one)
      const newProblemsLength = initializedSession.problems.length;
      if (currentProblemIndex >= newProblemsLength - 1) {
        setCurrentProblemIndex(newProblemsLength - 1);
      }
      // If we're not at the end, the next problem automatically shifts into the current position
    }
  };

  const handleCloseResults = () => {
    onClose();
  };

  const handleRetry = () => {
    // Reset session state
    setSessionState('start');
    setCurrentProblemIndex(0);
    setStartTime(null);
    setSessionResult(null);
    // Reset problems
    initializedSession?.problems.forEach(p => {
      p.userAnswer = undefined;
      p.isCorrect = undefined;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="session-modal-overlay">
      <div className="session-modal">
        {sessionState === 'start' && (
          <div className="start-screen">
            <h2>{t('sessionTitle', { number: session.id })}</h2>
            <p>{t('problemsCount', { count: TOTAL_PROBLEMS })}</p>
            <div className="timer-select-group">
              <label className="timer-select-label" htmlFor="timer-select">
                {t('timerSelectLabel')}
              </label>
              <select
                id="timer-select"
                className="timer-select"
                value={selectedMinutes}
                onChange={(e) => setSelectedMinutes(Number(e.target.value))}
              >
                {TIMER_OPTIONS.map((min) => (
                  <option key={min} value={min}>
                    {t('timerMinutesOption', { minutes: min })}
                  </option>
                ))}
              </select>
            </div>
            <button className="start-button" onClick={handleStartSession}>
              {t('startButton')}
            </button>
            <button className="close-modal-button" onClick={onClose}>
              ✕
            </button>
          </div>
        )}

        {sessionState === 'solving' && (
          <>
            <Timer
              duration={selectedMinutes * 60}
              onTimeUp={handleTimeUp}
              isActive={true}
              onTimeUpdate={handleTimeUpdate}
            />
            <ProblemSolver
              problems={initializedSession?.problems || []}
              onProblemAnswered={handleProblemAnswered}
              currentProblemIndex={currentProblemIndex}
              onNextProblem={handleNextProblem}
              onSkipProblem={handleSkipProblem}
              timeLeft={timeLeft}
            />
          </>
        )}

        {sessionState === 'finished' && sessionResult && (
          <>
            <button className="modal-close-button" onClick={handleCloseResults}>
              ✕
            </button>
            <Results
              result={sessionResult}
              onClose={handleCloseResults}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SessionModal;
