export type Language = 'en' | 'de';

export interface Translations {
  // App title and description
  appTitle: string;
  appSubtitle: string;

  // Session list
  sessionDescription: string;
  sessionNumber: string;
  completedBadge: string;
  availableBadge: string;
  sessionScoreLabel: string;

  // Session modal
  sessionTitle: string;
  startButton: string;
  closeButton: string;
  problemsCount: string;
  timerDuration: string;

  // Problem solving
  problemLabel: string;
  submitAnswer: string;
  skipProblem: string;

  // Results
  resultsTitle: string;
  scoreLabel: string;
  accuracyLabel: string;
  timeSpentLabel: string;
  scoreText: string;
  accuracyText: string;
  timeSpentText: string;
  incorrectAnswersTitle: string;
  yourAnswerText: string;
  closeResults: string;

  // Timer
  timerLabel: string;
  timerSelectLabel: string;
  timerMinutesOption: string;

  // Language selector
  selectLanguage: string;
  english: string;
  german: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // App title and description
    appTitle: 'Mathematical Exercises',
    appSubtitle: 'Practice your math skills with timed exercises',

    // Session list
    sessionDescription: 'Select a session to begin. Each session contains {problems} problems with a selectable time limit ({minMinutes}–{maxMinutes} minutes).',
    sessionNumber: 'Session {number}',
    completedBadge: '✓ Completed',
    availableBadge: 'Available',
    sessionScoreLabel: 'Score: {score}%',

    // Session modal
    sessionTitle: 'Session {number}',
    startButton: 'Start Session',
    closeButton: 'Close',
    problemsCount: '{count} Mathematical Problems',
    timerDuration: '{minutes}-Minute Timer',

    // Problem solving
    problemLabel: 'Problem {current} of {total}',
    submitAnswer: 'Submit Answer',
    skipProblem: 'Skip Problem',

    // Results
    resultsTitle: 'Session {number} Results',
    scoreLabel: 'Score',
    accuracyLabel: 'Accuracy',
    timeSpentLabel: 'Time Spent',
    scoreText: '{correct}/{total}',
    accuracyText: '{accuracy}%',
    timeSpentText: '{minutes}:{seconds}',
    incorrectAnswersTitle: 'Incorrect Answers ({count})',
    yourAnswerText: 'Your answer: {answer}',
    closeResults: 'Close',

    // Timer
    timerLabel: '{minutes}:{seconds}',
    timerSelectLabel: 'Time Limit',
    timerMinutesOption: '{minutes} Minutes',

    // Language selector
    selectLanguage: 'Choose Language / Sprache wählen',
    english: 'English',
    german: 'Deutsch',
  },

  de: {
    // App title and description
    appTitle: 'Mathematische Übungen',
    appSubtitle: 'Übe deine Mathematik-Fähigkeiten mit zeitlich begrenzten Aufgaben',

    // Session list
    sessionDescription: 'Wähle eine Sitzung zum Starten. Jede Sitzung enthält {problems} Aufgaben mit einem wählbaren Zeitlimit ({minMinutes}–{maxMinutes} Minuten).',
    sessionNumber: 'Sitzung {number}',
    completedBadge: '✓ Abgeschlossen',
    availableBadge: 'Verfügbar',
    sessionScoreLabel: 'Punktestand: {score}%',

    // Session modal
    sessionTitle: 'Sitzung {number}',
    startButton: 'Sitzung starten',
    closeButton: 'Schließen',
    problemsCount: '{count} Mathematische Aufgaben',
    timerDuration: '{minutes}-Minütiger Timer',

    // Problem solving
    problemLabel: 'Aufgabe {current} von {total}',
    submitAnswer: 'Antwort einreichen',
    skipProblem: 'Aufgabe überspringen',

    // Results
    resultsTitle: 'Sitzung {number} Ergebnisse',
    scoreLabel: 'Punktestand',
    accuracyLabel: 'Genauigkeit',
    timeSpentLabel: 'Benötigte Zeit',
    scoreText: '{correct}/{total}',
    accuracyText: '{accuracy}%',
    timeSpentText: '{minutes}:{seconds}',
    incorrectAnswersTitle: 'Falsche Antworten ({count})',
    yourAnswerText: 'Deine Antwort: {answer}',
    closeResults: 'Schließen',

    // Timer
    timerLabel: '{minutes}:{seconds}',
    timerSelectLabel: 'Zeitlimit',
    timerMinutesOption: '{minutes} Minuten',

    // Language selector
    selectLanguage: 'Choose Language / Sprache wählen',
    english: 'English',
    german: 'Deutsch',
  },
};

export const getTranslation = (key: keyof Translations, language: Language): string => {
  return translations[language][key];
};

export const formatTranslation = (
  key: keyof Translations,
  language: Language,
  params: Record<string, string | number> = {}
): string => {
  let text = translations[language][key];

  // Replace placeholders like {problems}, {minutes}, etc.
  Object.entries(params).forEach(([param, value]) => {
    text = text.replace(`{${param}}`, String(value));
  });

  return text;
};

export default translations;
