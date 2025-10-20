import React, { useState, useEffect } from 'react';
import SessionList from './components/SessionList';
import LanguageSelector from './components/LanguageSelector';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { getAppData } from './utils/storage';
import { AppData } from './types';
import './App.css';

function AppContent() {
  const [appData, setAppData] = useState<AppData>({ sessions: [] });
  const { t } = useLanguage();

  useEffect(() => {
    // Load app data on component mount
    const data = getAppData();
    setAppData(data);
  }, []);

  const handleSessionUpdate = () => {
    // Reload app data after session updates
    const data = getAppData();
    setAppData(data);
  };

  return (
    <div className="App">
      <LanguageSelector />
      <header className="app-header">
        <h1 className="app-title">
          <span className="math-icon">🧮</span>
          {t('appTitle')}
          <span className="math-icon">🧮</span>
        </h1>
        <p className="app-subtitle">{t('appSubtitle')}</p>
      </header>
      <SessionList
        sessions={appData.sessions}
        onSessionUpdate={handleSessionUpdate}
      />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
