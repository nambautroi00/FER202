//LoginForm.jsx is a functional component that uses useReducer hook and AuthContext for authentication
import React, { useReducer } from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

// 1. Khởi tạo trạng thái ban đầu cho form
const initialFormState = {
  username: '',
  password: '',
  errors: {},
  touched: {}
};

// 2. Định nghĩa hàm reducer cho form
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: '' // Clear error when user types
        }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true
        }
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

// 3. Hàm validation
const validateForm = (formData) => {
  const errors = {};

  // Validation cho username
  if (!formData.username.trim()) {
    errors.username = 'Tên đăng nhập là bắt buộc';
  } else if (formData.username.length < 3) {
    errors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
  }

  // Validation cho password
  if (!formData.password.trim()) {
    errors.password = 'Mật khẩu là bắt buộc';
  } else if (formData.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
  }

  return errors;
};

function LoginForm() {
  // 3. Sử dụng useReducer để quản lý trạng thái form
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  
  // Sử dụng AuthContext
  const { login, loading, error, clearError } = useAuth();

  // Xử lý thay đổi input
  const handleInputChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  // Xử lý blur (khi user rời khỏi field)
  const handleBlur = (field) => {
    dispatch({ type: 'SET_TOUCHED', field });
    
    // Validate field khi blur
    const fieldErrors = validateForm({ [field]: formState[field] });
    if (fieldErrors[field]) {
      dispatch({ type: 'SET_ERROR', field, error: fieldErrors[field] });
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate toàn bộ form
    const errors = validateForm(formState);
    
    if (Object.keys(errors).length > 0) {
      // Set errors cho tất cả fields
      Object.keys(errors).forEach(field => {
        dispatch({ type: 'SET_ERROR', field, error: errors[field] });
        dispatch({ type: 'SET_TOUCHED', field });
      });
      return;
    }

    // Gọi hàm login từ AuthContext
    await login(formState.username, formState.password);
  };

  return (
    <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Card.Header>
        <h3 className="text-center mb-0">Đăng Nhập</h3>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger" onClose={clearError} dismissible>
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              value={formState.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              onBlur={() => handleBlur('username')}
              isInvalid={formState.touched.username && !!formState.errors.username}
              placeholder="Nhập tên đăng nhập"
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={formState.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              isInvalid={formState.touched.password && !!formState.errors.password}
              placeholder="Nhập mật khẩu"
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid">
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
              size="lg"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </Button>
          </div>
        </Form>
        
        <div className="mt-3">
          <small className="text-muted">
            <strong>Thông tin đăng nhập:</strong><br/>
            Username: admin, Password: 123456
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LoginForm;