import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const API_BASE = '/api/v1/users';

  const getCurrentUser = async () => {
    try {
      const response = await fetch(`${API_BASE}/current-user`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
          localStorage.setItem('user', JSON.stringify(data.data));
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      getCurrentUser();
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        await getCurrentUser();
        setMessage({ type: 'success', text: 'Login successful!' });
        return true;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password, role = 'admin') => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, password, role }),
      });
      const data = await response.json();
      if (data.success) {
        await getCurrentUser();
        setMessage({ type: 'success', text: 'Registration successful!' });
        return true;
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setUser(null);
        localStorage.removeItem('user');
        setMessage({ type: 'success', text: 'Logged out successfully!' });
      } else {
        throw new Error(data.message || 'Logout failed');
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, message, setMessage }}>
      {children}
    </AuthContext.Provider>
  );
};