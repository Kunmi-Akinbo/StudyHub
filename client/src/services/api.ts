import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

export const createStudySession = async (sessionData: {
  session_type: 'work' | 'break';
  duration_minutes: number;
  notes?: string;
}) => {
  const token = localStorage.getItem('authToken');
  const response = await api.post('/api/sessions', sessionData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateStudySession = async (sessionId: number, updates: {
  actual_duration_seconds?: number;
  completed?: boolean;
  notes?: string;
}) => {
  const token = localStorage.getItem('authToken');
  const response = await api.put(`/api/sessions/${sessionId}`, updates, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getUserSessions = async () => {
  const token = localStorage.getItem('authToken');
  const response = await api.get('/api/sessions', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default api;