import React, { useReducer, useState } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import Toast from './Toast';

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '', variant: 'info' });

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
        setToast({
          show: true,
          title: 'Đăng nhập thành công',
          message: `Chào mừng ${state.username} đã đăng nhập!`,
          variant: 'success'
        });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        setToast({
          show: true,
          title: 'Đăng nhập thất bại',
          message: 'Tên đăng nhập hoặc mật khẩu không đúng',
          variant: 'danger'
        });
      }
    }, 1000);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setShowLogoutModal(false);
    setToast({
      show: true,
      title: 'Đăng xuất thành công',
      message: 'Bạn đã đăng xuất khỏi hệ thống',
      variant: 'info'
    });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
    setToast({
      show: true,
      title: 'Form đã được reset',
      message: 'Tất cả thông tin đã được xóa',
      variant: 'info'
    });
  };


  if (state.isLoggedIn) {
    return (
      <>
        <Card className="p-4">
          <h2>Đăng Nhập Thành Công!</h2>
          <p>Chào mừng, {state.username}!</p>
          <Button variant="danger" onClick={handleLogout}>
            Đăng Xuất
          </Button>
        </Card>
        
        <Toast
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          title={toast.title}
          message={toast.message}
          variant={toast.variant}
        />
      </>
    );
  }

  return (
    <>
      <Card className="p-4">
      <h2>Form Đăng Nhập</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <div className="row align-items-center">
            <div className="col-md-3">
              <Form.Label className="mb-0">Tên đăng nhập:</Form.Label>
            </div>
            <div className="col-md-9">
              <Form.Control
                type="text"
                value={state.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Nhập tên đăng nhập"
                disabled={state.isLoading}
              />
            </div>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="row align-items-center">
            <div className="col-md-3">
              <Form.Label className="mb-0">Mật khẩu:</Form.Label>
            </div>
            <div className="col-md-9">
              <Form.Control
                type="password"
                value={state.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Nhập mật khẩu"
                disabled={state.isLoading}
              />
            </div>
          </div>
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

    <ConfirmModal
      show={showLogoutModal}
      onHide={() => setShowLogoutModal(false)}
      onConfirm={confirmLogout}
      title="Xác nhận đăng xuất"
      message="Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?"
      confirmText="Đăng xuất"
      cancelText="Hủy"
      variant="danger"
    />

    <Toast
      show={toast.show}
      onClose={() => setToast({ ...toast, show: false })}
      title={toast.title}
      message={toast.message}
      variant={toast.variant}
    />
    </>
  );
}

export default LoginForm;
