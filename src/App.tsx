import React, { useState, useEffect } from 'react';
import SessionList from './components/SessionList';
import { getAppData } from './utils/storage';
import { AppData } from './types';
import './App.css';

function App() {
  const [appData, setAppData] = useState<AppData>({ sessions: [] });

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
      <header className="app-header">
        <h1 className="app-title">
          <span className="math-icon">🧮</span>
          Mathematical Exercises
          <span className="math-icon">🧮</span>
        </h1>
        <p className="app-subtitle">Practice your math skills with timed exercises</p>
      </header>
      <SessionList
        sessions={appData.sessions}
        onSessionUpdate={handleSessionUpdate}
      />
    </div>
  );
}

export default App;
