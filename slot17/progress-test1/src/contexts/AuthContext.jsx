/**
 * FILE: AuthContext.jsx
 * MỤC ĐÍCH: Quản lý authentication state toàn cục cho ứng dụng
 * 
 * KIẾN TRÚC:
 * - Context API: Tạo context để share state giữa các components
 * - useReducer: Quản lý state phức tạp với reducer pattern
 * - localStorage: Lưu user để persist qua refresh
 * 
 * LUỒNG XỬ LÝ:
 * 1. Khởi tạo: State ban đầu = chưa đăng nhập
 * 2. Restore: Khi mount, check localStorage để khôi phục session
 * 3. Login: Validate credentials → lưu user → update state
 * 4. Logout: Xóa user khỏi localStorage và state
 * 
 * STATE STRUCTURE:
 * {
 *   isAuthenticated: boolean,
 *   user: { id, username, password, fullName } | null,
 *   isLoading: boolean,
 *   error: string | null
 * }
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

// 1. Tạo Context - nơi lưu trữ authentication state
// Context này sẽ được cung cấp bởi AuthProvider và sử dụng bởi useAuth hook
const AuthConText = createContext();

// 2. Trạng thái khởi tạo khi app chạy lần đầu
// Tất cả đều false/null vì chưa có user đăng nhập
const initialAuthState = {
  isAuthenticated: false,  // Chưa đăng nhập
  user: null,               // Chưa có user
  isLoading: false,        // Không đang loading
  error: null,             // Không có lỗi
};

/**
 * 3. Reducer function - xử lý tất cả actions liên quan đến authentication
 * 
 * REDUCER PATTERN:
 * - Nhận state hiện tại và action
 * - Trả về state mới dựa trên action type
 * - Không mutate state cũ, luôn return state mới
 * 
 * @param {Object} state - State hiện tại
 * @param {Object} action - Action object có type và payload
 * @returns {Object} State mới
 */
const authReducer = (state, action) => {
  switch (action.type) {
    // Bắt đầu quá trình login - set loading = true
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    
    // Login thành công - lưu user vào localStorage và state
    case 'LOGIN_SUCCESS':
      // Lưu user vào localStorage để persist qua refresh
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,  // Đánh dấu đã đăng nhập
        user: action.payload,    // Lưu thông tin user
        error: null,
      };
    
    // Login thất bại - hiển thị lỗi
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        isLoading: false, 
        error: action.payload  // Lưu thông báo lỗi
      };
    
    // Đăng xuất - xóa tất cả thông tin
    case 'LOGOUT':
      localStorage.removeItem('user');  // Xóa khỏi localStorage
      return { ...initialAuthState };    // Reset về state ban đầu
    
    // Xóa thông báo lỗi
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    // Khôi phục user từ localStorage (khi app refresh)
    case 'RESTORE_USER':
      return {
        ...state,
        isAuthenticated: true,  // Đánh dấu đã đăng nhập
        user: action.payload,    // Restore user data
      };
    
    default:
      return state;  // Không có action nào khớp → giữ nguyên state
  }
};

/**
 * 4. AuthProvider Component
 * 
 * MỤC ĐÍCH: Cung cấp authentication state và functions cho toàn bộ app
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Sử dụng useReducer để quản lý state
 * - Cung cấp context value cho tất cả children components
 * - Tự động restore user từ localStorage khi mount
 * 
 * @param {ReactNode} children - Tất cả components con cần access auth context
 */
export const AuthProvider = ({ children }) => {
  // useReducer: Quản lý state phức tạp với reducer pattern
  // state: State hiện tại
  // dispatch: Function để gửi actions đến reducer
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  /**
   * useEffect: Khôi phục user từ localStorage khi component mount
   * 
   * LUỒNG:
   * 1. App refresh → AuthProvider mount lại
   * 2. Check localStorage có user không
   * 3. Nếu có → parse JSON → dispatch RESTORE_USER
   * 4. State được update → user vẫn đăng nhập sau refresh
   * 
   * DEPENDENCY: [] → chỉ chạy 1 lần khi mount
   */
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        // Khôi phục session - user vẫn đăng nhập
        dispatch({ type: 'RESTORE_USER', payload: user });
      } catch (error) {
        // Nếu parse lỗi → xóa data lỗi
        localStorage.removeItem('user');
      }
    }
  }, []);

  /**
   * Xóa thông báo lỗi
   */
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  /**
   * Function đăng nhập
   * 
   * LUỒNG XỬ LÝ:
   * 1. Dispatch LOGIN_START → set loading = true
   * 2. Gọi API lấy danh sách users
   * 3. Tìm user khớp username/email và password
   * 4. Nếu tìm thấy:
   *    - Dispatch LOGIN_SUCCESS → lưu user, set authenticated = true
   *    - Return { success: true, user }
   * 5. Nếu không tìm thấy:
   *    - Dispatch LOGIN_FAILURE → set error message
   *    - Return { success: false, error }
   * 
   * @param {Object} credentials - { usernameOrEmail, password }
   * @returns {Promise<Object>} { success: boolean, user?: Object, error?: string }
   */
  const login = async ({ usernameOrEmail, password }) => {
    // Bắt đầu login → hiển thị loading
    dispatch({ type: 'LOGIN_START' });

    try {
      // Lấy tất cả users từ server
      const accounts = await api.getUsers();
      
      // Tìm user khớp với credentials
      // Có thể đăng nhập bằng username HOẶC email
      const user = accounts.find(
        (acc) =>
          (acc.username === usernameOrEmail || acc.email === usernameOrEmail) &&
          acc.password === password
      );

      if (user) {
        // Tìm thấy user → login thành công
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true, user };
      } else {
        // Không tìm thấy → sai thông tin đăng nhập
        const errorMessage = 'Invalid username/email or password!';
        dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      // Lỗi network hoặc API
      const errorMessage = error.message || 'Login failed due to a network error.';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Function đăng xuất
   * 
   * LUỒNG:
   * 1. Dispatch LOGOUT action
   * 2. Reducer xóa user khỏi localStorage
   * 3. Reset state về initial (isAuthenticated = false, user = null)
   */
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Context value: Tất cả data và functions được expose cho components
  const contextValue = {
    isAuthenticated: state.isAuthenticated,  // Boolean: đã đăng nhập chưa
    user: state.user,                         // Object: thông tin user
    loading: state.isLoading,                // Boolean: đang loading
    error: state.error,                       // String: thông báo lỗi
    login,                                    // Function: đăng nhập
    logout,                                   // Function: đăng xuất
    clearError,                               // Function: xóa lỗi
  };

  // Provider: Cung cấp context value cho tất cả children
  return (
    <AuthConText.Provider value={contextValue}>
      {children}
    </AuthConText.Provider>
  );
};

/**
 * 5. Custom Hook: useAuth
 * 
 * MỤC ĐÍCH: Hook để components access AuthContext
 * 
 * CÁCH SỬ DỤNG:
 * const { user, isAuthenticated, login, logout } = useAuth();
 * 
 * LƯU Ý:
 * - Phải được gọi bên trong AuthProvider
 * - Nếu gọi ngoài → throw error
 * 
 * @returns {Object} Context value từ AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthConText);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};