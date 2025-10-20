import { AppData, SessionData } from '../types';
import { generateSessionProblems } from './mathGenerator';

const STORAGE_KEY = 'math_exercise_app_data';

// Configuration constants
export const TOTAL_PROBLEMS = 100; // 100 math problems per session
export const TIMER_DURATION_SECONDS = 11 * 60; // 11 minutes per session

export const getAppData = (): AppData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Convert date strings back to Date objects
      parsed.sessions = parsed.sessions.map((session: any) => ({
        ...session,
        startTime: session.startTime ? new Date(session.startTime) : undefined,
        endTime: session.endTime ? new Date(session.endTime) : undefined,
      }));
      return parsed;
    }
  } catch (error) {
    console.error('Error loading app data:', error);
  }

  // Return default data
  return {
    sessions: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      problems: [],
      completed: false,
    })),
  };
};

export const saveAppData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving app data:', error);
  }
};

export const updateSession = (sessionId: number, updates: Partial<SessionData>): void => {
  const appData = getAppData();
  const sessionIndex = appData.sessions.findIndex(s => s.id === sessionId);

  if (sessionIndex !== -1) {
    appData.sessions[sessionIndex] = { ...appData.sessions[sessionIndex], ...updates };
    saveAppData(appData);
  }
};

export const initializeSession = (sessionId: number): SessionData | null => {
  const appData = getAppData();
  const session = appData.sessions.find(s => s.id === sessionId);

  if (!session || session.completed) {
    return null;
  }

  // Initialize with problems if not already done
  if (session.problems.length === 0) {
    session.problems = generateSessionProblems(TOTAL_PROBLEMS);
    saveAppData(appData);
  }

  return session;
};
