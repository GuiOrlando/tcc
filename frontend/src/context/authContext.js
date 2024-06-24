import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, login, logout } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !window.location.pathname.startsWith('/cadastro')) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (email, password) => {
    await login(email, password);
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};