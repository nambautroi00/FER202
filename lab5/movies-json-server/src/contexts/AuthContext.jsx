import React, { createContext, useReducer, useContext, useCallback } from 'react';
import { authReducer, initialAuthState } from '../reducers/authReducers';
import movieApi from '../api/movieAPI';

// Contexts
export const AuthStateContext = createContext(initialAuthState);
export const AuthDispatchContext = createContext(null);

// Custom Hooks
export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Hàm login: Tìm account trong db.json
  const login = useCallback(async (username, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Lấy danh sách accounts từ json-server
      const response = await movieApi.get('/accounts');
      const accounts = response.data;
      
      // Tìm account khớp với username và password
      const account = accounts.find(
        acc => acc.username === username && acc.password === password
      );
      
      if (account) {
        // Loại bỏ password trước khi lưu vào state
        const { password: _, ...userWithoutPassword } = account;
        dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
        
        // Lưu vào localStorage để giữ trạng thái đăng nhập
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('isAuthenticated', 'true');
        
        return { success: true };
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' };
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Có lỗi xảy ra khi đăng nhập' });
      return { success: false, error: 'Có lỗi xảy ra khi đăng nhập' };
    }
  }, []);

  // Hàm logout
  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }, []);

  // Hàm kiểm tra đăng nhập từ localStorage (khi refresh trang)
  const checkAuth = useCallback(() => {
    const storedUser = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (storedUser && isAuthenticated === 'true') {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        console.error("Lỗi khi đọc thông tin đăng nhập:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Giá trị của Dispatch Context
  const dispatchValue = {
    dispatch,
    login,
    logout,
    checkAuth,
    clearError
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatchValue}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

