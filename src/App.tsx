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
      <SessionList
        sessions={appData.sessions}
        onSessionUpdate={handleSessionUpdate}
      />
    </div>
  );
}

export default App;
