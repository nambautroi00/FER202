import React, { useReducer, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import Toast from './Toast';

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
  const [showResetModal, setShowResetModal] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '', variant: 'info' });

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
      setToast({
        show: true,
        title: 'Đăng ký thành công',
        message: `Chào mừng ${state.firstName} ${state.lastName} đã tham gia hệ thống!`,
        variant: 'success'
      });
    }, 2000);
  };

  const handleReset = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    dispatch({ type: 'RESET_FORM' });
    setShowResetModal(false);
    setToast({
      show: true,
      title: 'Form đã được reset',
      message: 'Tất cả thông tin đã được xóa',
      variant: 'info'
    });
  };

  if (state.success) {
    return (
      <>
        <Card className="p-4">
          <div className="text-center">
            <h3 className="text-success">Đăng ký thành công!</h3>
            <p>Chào mừng {state.firstName} {state.lastName} đã tham gia hệ thống.</p>
            <Button variant="primary" onClick={handleReset}>
              Đăng ký tài khoản mới
            </Button>
          </div>
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
    <Card className="p-4">
      <h2>Đăng Ký Tài Khoản</h2>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <Form.Label className="mb-0">Họ *</Form.Label>
                </div>
                <div className="col-md-8">
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
                </div>
              </div>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <Form.Label className="mb-0">Tên *</Form.Label>
                </div>
                <div className="col-md-8">
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
                </div>
              </div>
            </Form.Group>
          </div>
        </div>

        <Form.Group className="mb-3">
          <div className="row align-items-center">
            <div className="col-md-3">
              <Form.Label className="mb-0">Email *</Form.Label>
            </div>
            <div className="col-md-9">
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
            </div>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="row align-items-center">
            <div className="col-md-3">
              <Form.Label className="mb-0">Mật khẩu *</Form.Label>
            </div>
            <div className="col-md-9">
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
            </div>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="row align-items-center">
            <div className="col-md-3">
              <Form.Label className="mb-0">Xác nhận mật khẩu *</Form.Label>
            </div>
            <div className="col-md-9">
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
            </div>
          </div>
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

        <div className="d-flex gap-2">
          <Button 
            variant="primary" 
            type="submit" 
            disabled={state.isLoading}
            className="flex-fill"
          >
            {state.isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
          </Button>
          
          <Button 
            variant="secondary" 
            type="button"
            onClick={handleReset}
            disabled={state.isLoading}
            className="flex-fill"
          >
            Reset
          </Button>
        </div>
      </Form>

      <ConfirmModal
        show={showResetModal}
        onHide={() => setShowResetModal(false)}
        onConfirm={confirmReset}
        title="Xác nhận reset form"
        message="Bạn có chắc chắn muốn xóa tất cả thông tin đã nhập?"
        confirmText="Xóa"
        cancelText="Hủy"
        variant="warning"
      />

      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        title={toast.title}
        message={toast.message}
        variant={toast.variant}
      />
    </Card>
  );
}

export default SignUpForm;
