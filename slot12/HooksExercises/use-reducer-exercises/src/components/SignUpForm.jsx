import React, { useReducer } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

// Initial state for signup form
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
  isLoading: false,
  errors: {},
  success: false
};

// Reducer function to handle form actions
function signupReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' } // Clear field error
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
        isLoading: false
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        success: true,
        isLoading: false,
        errors: {}
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

function SignUpForm() {
  const [state, dispatch] = useReducer(signupReducer, initialState);

  const handleInputChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const validateForm = () => {
    const errors = {};

    if (!state.firstName.trim()) {
      errors.firstName = 'Họ không được để trống';
    }

    if (!state.lastName.trim()) {
      errors.lastName = 'Tên không được để trống';
    }

    if (!state.email.trim()) {
      errors.email = 'Email không được để trống';
    } else if (!state.email.includes('@')) {
      errors.email = 'Email không hợp lệ';
    }

    if (!state.password) {
      errors.password = 'Mật khẩu không được để trống';
    } else if (state.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!state.confirmPassword) {
      errors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
    } else if (state.password !== state.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!state.agreeToTerms) {
      errors.agreeToTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }

    dispatch({ type: 'SET_LOADING', isLoading: true });

    // Simulate API call
    setTimeout(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }, 2000);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  if (state.success) {
    return (
      <Card className="p-4">
        <div className="text-center">
          <h3 className="text-success">Đăng ký thành công!</h3>
          <p>Chào mừng {state.firstName} {state.lastName} đã tham gia hệ thống.</p>
          <Button variant="primary" onClick={handleReset}>
            Đăng ký tài khoản mới
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h2>Đăng Ký Tài Khoản</h2>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Họ *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ"
                value={state.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={state.isLoading}
                isInvalid={!!state.errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Tên *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên"
                value={state.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={state.isLoading}
                isInvalid={!!state.errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={state.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={state.isLoading}
            isInvalid={!!state.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu *</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={state.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            disabled={state.isLoading}
            isInvalid={!!state.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Xác nhận mật khẩu *</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={state.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            disabled={state.isLoading}
            isInvalid={!!state.errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Tôi đồng ý với điều khoản sử dụng"
            checked={state.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            disabled={state.isLoading}
            isInvalid={!!state.errors.agreeToTerms}
          />
          {state.errors.agreeToTerms && (
            <div className="text-danger small mt-1">
              {state.errors.agreeToTerms}
            </div>
          )}
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          disabled={state.isLoading}
          className="w-100"
        >
          {state.isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </Button>
      </Form>
    </Card>
  );
}

export default SignUpForm;
