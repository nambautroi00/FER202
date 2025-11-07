import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Khai báo Trạng thái khởi tạo
const initialAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

// 3. Tạo hàm reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...initialAuthState, isAuthenticated: false, user: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'RESTORE_USER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

// 4. Tạo AuthProvider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Khôi phục user từ localStorage khi component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'RESTORE_USER', payload: user });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const accounts = await api.getUsers();
      const user = accounts.find(
        (acc) =>
          (acc.username === usernameOrEmail || acc.email === usernameOrEmail) &&
          acc.password === password
      );

      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true, user };
      } else {
        const errorMessage = 'Invalid username/email or password!';
        dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed due to a network error.';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const contextValue = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.isLoading,
    error: state.error,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};