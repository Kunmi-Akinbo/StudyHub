import React, { useState } from 'react';

interface TimerProps {}

const Timer: React.FC<TimerProps> = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timerType, setTimerType] = useState<'work' | 'break'>('work');

  const switchMode = (mode: 'work' | 'break') => {
    setTimerType(mode);
    if (mode === 'work') {
      setMinutes(25);
      setSeconds(0);
    } 
    else {
      setMinutes(5);
      setSeconds(0);
    }
  };

  const getWorkButton = () => {
    if (timerType === 'work') {
      return {
        margin: '0 10px', 
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: '1px solid #ccc',
        borderRadius: '5px'
      };
    } 
    else {
      return {
        margin: '0 10px', 
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        color: 'black',
        border: '1px solid #ccc',
        borderRadius: '5px'
      };
    }
  };

  const getBreakButton = () => {
    if (timerType === 'break') {
      return {
        margin: '0 10px', 
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: '1px solid #ccc',
        borderRadius: '5px'
      };
    } 
    else {
      return {
        margin: '0 10px', 
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        color: 'black',
        border: '1px solid #ccc',
        borderRadius: '5px'
      };
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Timer</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => switchMode('work')}
          style={getWorkButton()}
        >
          Work (25min)
        </button>
        <button 
          onClick={() => switchMode('break')}
          style={getBreakButton()}
        >
          Break (5min)
        </button>
      </div>

      <div style={{ fontSize: '48px', margin: '20px 0', fontFamily: 'monospace' }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <p>Timer controls coming next...</p>
    </div>
  );
};

export default Timer;