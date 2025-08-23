import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';

interface AuthFormProps {}

const AuthForm: React.FC<AuthFormProps> = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      if (isLogin) {
        const response = await loginUser({ email, password });
        console.log('Login successful:', response);
      } 
      else {
        const response = await registerUser({ 
          email, 
          password, 
          firstName, 
          lastName 
        });
        console.log('Registration successful:', response);
      }
    } 
    catch (error: any) {
      console.error('Auth error:', error);
      setError(error.response?.data?.error || 'Authentication failed');
    } 
    finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  const getSubmitButtonStyle = () => {
    if (loading) {
      return {
        width: '100%',
        padding: '12px',
        backgroundColor: '#ccc',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px'
      };
    } 
    else {
      return {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px'
      };
    }
  };

  const getFormTitle = () => {
    if (isLogin) {
      return 'Login';
    } 
    else {
      return 'Register';
    }
  };

  const getButtonText = () => {
    if (loading) {
      return 'Please wait...';
    } 
    else {
      if (isLogin) {
        return 'Login';
      } 
      else {
        return 'Register';
      }
    }
  };

  const getToggleText = () => {
    if (isLogin) {
      return 'Register here';
    } 
    else {
      return 'Login here';
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {getFormTitle()}
      </h2>

      {error && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
          />
        </div>

        {!isLogin && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          style={getSubmitButtonStyle()}
        >
          {getButtonText()}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <button
          onClick={toggleMode}
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '14px' }}
        >
          {getToggleText()}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;