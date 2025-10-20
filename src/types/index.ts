export interface MathProblem {
  id: number;
  operation: '+' | '-' | '*' | '/';
  operand1: number;
  operand2: number;
  correctAnswer: number;
  userAnswer?: number;
  isCorrect?: boolean;
}

export interface SessionData {
  id: number;
  problems: MathProblem[];
  startTime?: Date;
  endTime?: Date;
  completed: boolean;
  score?: number;
  timeSpent?: number; // in seconds
}

export interface SessionResult {
  sessionId: number;
  correctAnswers: number;
  totalProblems: number;
  timeSpent: number;
  errors: MathProblem[];
  accuracy: number;
}

export interface AppData {
  sessions: SessionData[];
  currentSession?: number;
}

export type TimerState = 'idle' | 'running' | 'paused' | 'finished';
