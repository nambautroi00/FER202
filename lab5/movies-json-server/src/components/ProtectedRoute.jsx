import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthState();
  const { checkAuth } = useAuthDispatch();

  useEffect(() => {
    // Kiểm tra đăng nhập từ localStorage khi component mount
    if (!isAuthenticated && !user) {
      checkAuth();
    }
  }, [isAuthenticated, user, checkAuth]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

