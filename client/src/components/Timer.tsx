import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createStudySession, updateStudySession } from '../services/api';

interface TimerProps {}

const Timer: React.FC<TimerProps> = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timerType, setTimerType] = useState<'work' | 'break'>('work');
  const [isActive, setActive] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && (minutes > 0 || seconds > 0)) {
        interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } 
        else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } 
        else {
          setActive(false);
          handleTimerComplete();
          if (timerType === 'work') {
              alert('Work period completed');
          } 
          else {
              alert('Break period finished');
          }
        }
      }, 1000);
    }
  
    return () => {
        if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, timerType]);

  const handleTimerComplete = async () => {
    if (currentSessionId && startTime && isAuthenticated) {
      const actualDuration = Math.floor((Date.now() - startTime.getTime()) / 1000);
      try {
        await updateStudySession(currentSessionId, {
          actual_duration_seconds: actualDuration,
          completed: true
        });
        console.log('Session completed and saved');
      } catch (error) {
        console.error('Failed to update session:', error);
      }
      setCurrentSessionId(null);
      setStartTime(null);
    }
  };

  const switchMode = (mode: 'work' | 'break') => {
    if (isActive) {
      pauseTimer(); 
    }
    setTimerType(mode);
    setActive(false);
    if (mode === 'work') {
      setMinutes(25);
      setSeconds(0);
    } 
    else {
      setMinutes(5);
      setSeconds(0);
    }
  };

  const startTimer = async () => {
    setActive(true);
    setStartTime(new Date());
    if (isAuthenticated) {
      try {
        const response = await createStudySession({
          session_type: timerType,
          duration_minutes: timerType === 'work' ? 25 : 5
        });
        setCurrentSessionId(response.session.id);
        console.log('Study session started:', response.session);
      } 
      catch (error) {
        console.error('Failed to create session:', error);
      }
    }
  };

  const pauseTimer = async () => {
    setActive(false);
    if (currentSessionId && startTime && isAuthenticated) {
      const actualDuration = Math.floor((Date.now() - startTime.getTime()) / 1000);
      try {
        await updateStudySession(currentSessionId, {
          actual_duration_seconds: actualDuration,
          completed: false
        });
        console.log('Session paused and saved');
      } 
      catch (error) {
        console.error('Failed to update session:', error);
      }
    }
  };

  const resetTimer = () => {
    setActive(false);
    setCurrentSessionId(null);
    setStartTime(null);
    if (timerType === 'work') {
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

  const getStartButton = () => {
    if (isActive) {
        return {
            margin: '0 10px', 
            padding: '10px 20px',
            backgroundColor: '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
        };
    } 
    else {
        return {
            margin: '0 10px', 
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
        };
    }
    };
  
  const getPauseButton = () => {
    if (!isActive) {
        return {
            margin: '0 10px', 
            padding: '10px 20px',
            backgroundColor: '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
        };
    } 
    else {
        return {
            margin: '0 10px', 
            padding: '10px 20px',
            backgroundColor: '#ffc107',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
        };
    }
  };
  
  const getResetButton = () => {
    return {
        margin: '0 10px', 
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px'
        };
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
      <div>
        <button 
            onClick={startTimer} 
            disabled={isActive}
            style={getStartButton()}
        >
        Start
        </button>
        <button 
            onClick={pauseTimer} 
            disabled={!isActive}
            style={getPauseButton()}
        >
        Pause
        </button>
        <button 
            onClick={resetTimer}
            style={getResetButton()}
        >
        Reset
        </button>
        </div>
    </div>
  );
};

export default Timer;