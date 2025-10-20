import React, { useState } from 'react';
import { SessionData, SessionResult } from '../types';
import SessionModal from './SessionModal';
import { useLanguage } from '../contexts/LanguageContext';
import { updateSession, initializeSession, TOTAL_PROBLEMS, TIMER_DURATION_SECONDS } from '../utils/storage';

interface SessionListProps {
  sessions: SessionData[];
  onSessionUpdate: () => void;
}

const SessionList: React.FC<SessionListProps> = ({ sessions, onSessionUpdate }) => {
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleSessionClick = (session: SessionData) => {
    // Always open the session modal - it will handle completed sessions
    setSelectedSession(session);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedSession(null);
  };

  const handleSessionComplete = (result: SessionResult, problems?: any[]) => {
    // Update session as completed
    updateSession(result.sessionId, {
      completed: true,
      score: result.accuracy,
      timeSpent: result.timeSpent,
      endTime: new Date(),
      problems: problems, // Save the problems with answers
    });
    onSessionUpdate();
  };

  const timerMinutes = Math.floor(TIMER_DURATION_SECONDS / 60);

  return (
    <div className="session-list">
      <p className="session-description">
        {t('sessionDescription', { problems: TOTAL_PROBLEMS, minutes: timerMinutes })}
      </p>

      <div className="sessions-grid">
        {sessions.map(session => (
          <div
            key={session.id}
            className={`session-card ${session.completed ? 'completed' : 'available'} ${session.completed ? 'clickable-completed' : ''}`}
            onClick={() => handleSessionClick(session)}
          >
            <div className="session-number">{t('sessionNumber', { number: session.id })}</div>
            <div className="session-status">
              {session.completed ? (
                <span className="completed-badge">{t('completedBadge')}</span>
              ) : (
                <span className="available-badge">{t('availableBadge')}</span>
              )}
            </div>
            {session.score !== undefined && (
              <div className="session-score">
                {t('sessionScoreLabel', { score: session.score.toFixed(1) })}
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
