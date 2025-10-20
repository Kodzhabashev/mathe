import React, { useEffect, useState } from 'react';
import { TimerState } from '../types';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [state, setState] = useState<TimerState>('idle');

  useEffect(() => {
    if (isActive && state !== 'running') {
      setState('running');
      setTimeLeft(duration);
    } else if (!isActive) {
      setState('idle');
    }
  }, [isActive, duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state === 'running' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setState('finished');
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeLeft, onTimeUp]);

  // Timer is hidden, only used for internal logic
  return null;
};

export default Timer;
