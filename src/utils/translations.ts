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
  scoreLabel: string;

  // Session modal
  sessionTitle: string;
  startButton: string;
  closeButton: string;

  // Problem solving
  problemLabel: string;
  submitAnswer: string;
  skipProblem: string;

  // Results
  resultsTitle: string;
  scoreText: string;
  accuracyText: string;
  timeSpentText: string;
  incorrectAnswersTitle: string;
  yourAnswerText: string;
  closeResults: string;

  // Timer
  timerLabel: string;

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
    sessionDescription: 'Select a session to begin. Each session contains {problems} problems with a {minutes}-minute time limit.',
    sessionNumber: 'Session {number}',
    completedBadge: '✓ Completed',
    availableBadge: 'Available',
    scoreLabel: 'Score: {score}%',

    // Session modal
    sessionTitle: 'Session {number}',
    startButton: 'Start Session',
    closeButton: 'Close',

    // Problem solving
    problemLabel: 'Problem {current} of {total}',
    submitAnswer: 'Submit Answer',
    skipProblem: 'Skip Problem',

    // Results
    resultsTitle: 'Session {number} Results',
    scoreText: '{correct}/{total}',
    accuracyText: '{accuracy}%',
    timeSpentText: '{minutes}:{seconds}',
    incorrectAnswersTitle: 'Incorrect Answers ({count})',
    yourAnswerText: 'Your answer: {answer}',
    closeResults: 'Close',

    // Timer
    timerLabel: '{minutes}:{seconds}',

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
    sessionDescription: 'Wähle eine Sitzung zum Starten. Jede Sitzung enthält {problems} Aufgaben mit einem {minutes}-minütigen Zeitlimit.',
    sessionNumber: 'Sitzung {number}',
    completedBadge: '✓ Abgeschlossen',
    availableBadge: 'Verfügbar',
    scoreLabel: 'Punktestand: {score}%',

    // Session modal
    sessionTitle: 'Sitzung {number}',
    startButton: 'Sitzung starten',
    closeButton: 'Schließen',

    // Problem solving
    problemLabel: 'Aufgabe {current} von {total}',
    submitAnswer: 'Antwort einreichen',
    skipProblem: 'Aufgabe überspringen',

    // Results
    resultsTitle: 'Sitzung {number} Ergebnisse',
    scoreText: '{correct}/{total}',
    accuracyText: '{accuracy}%',
    timeSpentText: '{minutes}:{seconds}',
    incorrectAnswersTitle: 'Falsche Antworten ({count})',
    yourAnswerText: 'Deine Antwort: {answer}',
    closeResults: 'Schließen',

    // Timer
    timerLabel: '{minutes}:{seconds}',

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
