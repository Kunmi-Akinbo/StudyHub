import React, { useEffect, useState } from 'react';
import { healthCheck } from './services/api';
import Timer from './components/Timer';
import AuthForm from './components/AuthForm';

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
      <p>Backend status: {backendStatus}</p>
      <hr />
      <AuthForm />
      <hr />
      <Timer />
    </div>
  );
}

export default App;