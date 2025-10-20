import React, { useState } from 'react';
import { SessionData, SessionResult } from '../types';
import SessionModal from './SessionModal';
import Results from './Results';
import { updateSession, initializeSession } from '../utils/storage';

interface SessionListProps {
  sessions: SessionData[];
  onSessionUpdate: () => void;
}

const SessionList: React.FC<SessionListProps> = ({ sessions, onSessionUpdate }) => {
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showResults, setShowResults] = useState<SessionResult | null>(null);

  const handleSessionClick = (session: SessionData) => {
    if (session.completed) {
      // Show results for completed session
      const sessionData = initializeSession(session.id);
      if (sessionData && sessionData.problems.length > 0) {
        const answeredProblems = sessionData.problems;
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

        setShowResults(result);
      }
    } else {
      // Start new session
      setSelectedSession(session);
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedSession(null);
  };

  const handleResultsClose = () => {
    setShowResults(null);
  };

  const handleSessionComplete = (result: SessionResult) => {
    // Update session as completed
    updateSession(result.sessionId, {
      completed: true,
      score: result.accuracy,
      timeSpent: result.timeSpent,
      endTime: new Date(),
    });
    onSessionUpdate();
  };

  return (
    <div className="session-list">
      <h1>Mathematical Exercises</h1>
      <p>Select a session to begin. Each session contains 100 problems with an 11-minute time limit.</p>

      <div className="sessions-grid">
        {sessions.map(session => (
          <div
            key={session.id}
            className={`session-card ${session.completed ? 'completed' : 'available'} ${session.completed ? 'clickable-completed' : ''}`}
            onClick={() => handleSessionClick(session)}
          >
            <div className="session-number">Session {session.id}</div>
            <div className="session-status">
              {session.completed ? (
                <span className="completed-badge">✓ Completed</span>
              ) : (
                <span className="available-badge">Available</span>
              )}
            </div>
            {session.score !== undefined && (
              <div className="session-score">
                Score: {session.score.toFixed(1)}%
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedSession && (
        <SessionModal
          session={selectedSession}
          isOpen={modalOpen}
          onClose={handleModalClose}
          onSessionComplete={handleSessionComplete}
        />
      )}

      {showResults && (
        <div className="session-modal-overlay">
          <div className="session-modal results-modal-size">
            <button className="modal-close-button" onClick={handleResultsClose}>
              ✕
            </button>
            <Results
              result={showResults}
              onClose={handleResultsClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionList;
