import React, { useState } from 'react';
import { SessionData, SessionResult } from '../types';
import SessionModal from './SessionModal';
import { updateSession } from '../utils/storage';

interface SessionListProps {
  sessions: SessionData[];
  onSessionUpdate: () => void;
}

const SessionList: React.FC<SessionListProps> = ({ sessions, onSessionUpdate }) => {
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSessionClick = (session: SessionData) => {
    setSelectedSession(session);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedSession(null);
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
            className={`session-card ${session.completed ? 'completed' : 'available'}`}
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
    </div>
  );
};

export default SessionList;
