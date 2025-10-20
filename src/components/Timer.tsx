import React, { useEffect, useState } from 'react';
import { TimerState } from '../types';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
  onTimeUpdate?: (timeLeft: number) => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive, onTimeUpdate }) => {
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
          const newTime = prev - 1;
          if (newTime <= 0) {
            setState('finished');
            onTimeUp();
            onTimeUpdate?.(0);
            return 0;
          }
          onTimeUpdate?.(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state, timeLeft, onTimeUp, onTimeUpdate]);

  // Timer is hidden, only used for internal logic
  return null;
};

export default Timer;
