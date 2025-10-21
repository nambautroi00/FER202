import React, { useReducer } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';

// 1. Khởi tạo trạng thái ban đầu
const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false
};

// 2. Định nghĩa hàm reducer
function loginReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        error: '' // Clear error when user types
      };
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: ''
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        password: ''
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

function LoginForm() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(loginReducer, initialState);

  // Action handlers
  const handleInputChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!state.username || !state.password) {
      dispatch({ type: 'LOGIN_FAILURE', error: 'Vui lòng nhập đầy đủ thông tin' });
      return;
    }

    dispatch({ type: 'LOGIN_START' });

    // Simulate API call
    setTimeout(() => {
      if (state.username === 'admin' && state.password === 'password') {
        dispatch({ type: 'LOGIN_SUCCESS' });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
      }
    }, 1000);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  if (state.isLoggedIn) {
    return (
      <Card className="p-4">
        <h2>Đăng Nhập Thành Công!</h2>
        <p>Chào mừng, {state.username}!</p>
        <Button variant="danger" onClick={handleLogout}>
          Đăng Xuất
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h2>Form Đăng Nhập</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Tên đăng nhập:</Form.Label>
          <Form.Control
            type="text"
            value={state.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            placeholder="Nhập tên đăng nhập"
            disabled={state.isLoading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu:</Form.Label>
          <Form.Control
            type="password"
            value={state.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Nhập mật khẩu"
            disabled={state.isLoading}
          />
        </Form.Group>

        {state.error && (
          <Alert variant="danger">
            {state.error}
          </Alert>
        )}

        <div className="d-flex gap-2">
          <Button 
            type="submit" 
            variant="primary"
            disabled={state.isLoading}
          >
            {state.isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </Button>
          
          <Button 
            type="button" 
            variant="secondary"
            onClick={handleReset}
            disabled={state.isLoading}
          >
            Reset
          </Button>
        </div>
      </Form>
      
      <div className="mt-3">
        <small className="text-muted">
          Demo: username = "admin", password = "password"
        </small>
      </div>
    </Card>
  );
}

export default LoginForm;
