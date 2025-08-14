import React, { useEffect, useState } from 'react';
import { healthCheck } from './services/api';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const health = await healthCheck();
        setBackendStatus(`Connected. ${health.message}`);
      } catch (error) {
        setBackendStatus('Backend connection failed');
      }
    };
    testConnection();
  }, []);

  return (
    <div className="App">
      <h1>StudyHub</h1>
      <p>Frontend is running</p>
      <p>Backend status: {backendStatus}</p>
    </div>
  );
}

export default App;