import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (user === null) {
    return <Navigate to="/login" />;
  }
  
  return isAuthenticated ? <Outlet /> : < Navigate to="/login" />;
};

export default PrivateRoute;
