//1. Khởi tạo auth context
import React, { createContext, useReducer } from "react";

// Dữ liệu mẫu thay thế cho API call
const mockAccounts = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin',
    status: 'active'
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    password: '123456',
    role: 'user',
    status: 'active'
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    password: '123456',
    role: 'user',
    status: 'locked'
  }
];

//1. Khởi tạo context với giá trị mặc định
export const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    error: null
});

//2. Định nghĩa reducer cho authentication
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

//3. Tạo provider để bao bọc ứng dụng
export const AuthProvider = ({ children }) => {
  // State quản lý authentication
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  });

  // Hàm đăng nhập
  const login = async (username, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Tìm user trong mock data
      const user = mockAccounts.find(account => 
        account.username === username && 
        account.password === password &&
        account.status === 'active'
      );

      if (!user) {
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          payload: 'Tên đăng nhập hoặc mật khẩu không đúng' 
        });
        return;
      }

      // Chỉ admin mới được phép đăng nhập
      if (user.role !== 'admin') {
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          payload: 'Chỉ admin mới được phép đăng nhập' 
        });
        return;
      }

      // Đăng nhập thành công
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: user 
      });
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: 'Có lỗi xảy ra khi đăng nhập' 
      });
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Hàm xóa lỗi
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  //Tạo object context chứa giá trị và hàm
  const contextValue = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    clearError
  };

  //4. Cung cấp giá trị context cho các component con
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

//5. Custom hook để sử dụng context dễ dàng hơn
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
