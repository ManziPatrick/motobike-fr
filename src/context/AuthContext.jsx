import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate user authentication based on token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Assume user is logged in if a token exists
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://motobikebn-2c6r.vercel.app/api/v1/login', {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async ({ username, email, password, phoneNumber }) => {
    try {
      const response = await axios.post('https://motobikebn-2c6r.vercel.app/api/v1/register', {
        username,
        email,
        password,
        phoneNumber,
      });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
