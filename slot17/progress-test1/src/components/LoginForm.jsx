/**
 * FILE: LoginForm.jsx
 * MỤC ĐÍCH: Component form đăng nhập
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Form đăng nhập với username/email và password
 * - Sử dụng useReducer để quản lý form state phức tạp
 * - Validation real-time khi user nhập
 * - Validation khi submit
 * - Hiển thị modal thành công sau khi đăng nhập
 * - Redirect đến /home sau khi đăng nhập thành công
 * 
 * VALIDATION:
 * - identifier: Required, nếu là email thì phải đúng format
 * - password: Required, tối thiểu 6 ký tự
 * 
 * LUỒNG ĐĂNG NHẬP:
 * 1. User nhập thông tin → validation real-time
 * 2. User submit form → validate lại toàn bộ
 * 3. Gọi login() từ AuthContext
 * 4. Nếu thành công → hiển thị modal "Login Successful"
 * 5. User click "Xác nhận" → reset form và navigate đến /home
 */

import React, { useReducer, useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router-dom';

// State khởi tạo của form
const initialFormState = {
  formData: {
    identifier: '',  // Username hoặc email
    password: '',    // Mật khẩu
  },
  errors: {},                // Lỗi validation cho từng field
  showSuccessModal: false,   // Hiển thị modal thành công
};

/**
 * Reducer function - xử lý tất cả actions liên quan đến form
 * 
 * ACTIONS:
 * - SET_FIELD: Cập nhật giá trị của một field
 * - SET_ERROR: Set lỗi cho một field
 * - CLEAR_ERROR: Xóa lỗi của một field
 * - SET_ERRORS: Set nhiều lỗi cùng lúc
 * - SHOW_SUCCESS_MODAL: Hiển thị modal thành công
 * - HIDE_SUCCESS_MODAL: Ẩn modal thành công
 * - RESET_FORM: Reset form về trạng thái ban đầu
 */
function formReducer(state, action) {
  switch (action.type) {
    // Cập nhật giá trị của một field
    case 'SET_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    
    // Set lỗi cho một field
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    
    // Xóa lỗi của một field
    case 'CLEAR_ERROR':
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors,
      };
    
    // Set nhiều lỗi cùng lúc (khi validate form)
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    
    // Hiển thị modal thành công
    case 'SHOW_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: true,
      };
    
    // Ẩn modal thành công
    case 'HIDE_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: false,
      };
    
    // Reset form về trạng thái ban đầu
    case 'RESET_FORM':
      return initialFormState;
    
    default:
      return state;
  } 
}

function LoginForm() {
  // Hook để navigate
  const navigate = useNavigate();
  
  // useReducer để quản lý form state
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  
  // Lấy functions và state từ AuthContext
  const { login, loading, error, clearError, user } = useAuth();

  // Regex để validate email format
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Helper function: check xem value có phải email không (có chứa @)
  const isEmail = (v) => v.includes('@');

  /**
   * Handler khi user thay đổi giá trị input
   * 
   * LUỒNG:
   * 1. Cập nhật giá trị field trong formData
   * 2. Xóa error từ AuthContext nếu có
   * 3. Validate field đó (real-time validation)
   * 4. Set error hoặc clear error tùy kết quả validation
   * 
   * VALIDATION RULES:
   * - identifier: Required, nếu là email thì phải đúng format
   * - password: Required, tối thiểu 6 ký tự
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Cập nhật giá trị field
    dispatch({ type: 'SET_FIELD', field: name, value });

    // Xóa error từ AuthContext nếu có
    if (error) clearError();

    // Validate field
    let message = '';
    
    // Validation cho identifier (username/email)
    if (name === 'identifier') {
      if (!value.trim()) {
        message = 'Username or Email is required.';
      } else if (isEmail(value) && !emailRe.test(value)) {
        // Nếu có @ nhưng format không đúng
        message = 'Email is invalid format.';
      }
    }

    // Validation cho password
    if (name === 'password') {
      if (!value.trim()) {
        message = 'Password is required.';
      } else if (value.length < 6) {
        message = 'Password must be at least 6 characters.';
      }
    }

    // Set error hoặc clear error
    if (message) {
      dispatch({ type: 'SET_ERROR', field: name, message });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  /**
   * Validate toàn bộ form trước khi submit
   * 
   * @returns {Object} Object chứa các lỗi (key = field name, value = error message)
   *                   Nếu không có lỗi → return {}
   */
  const validateForm = () => {
    const errors = {};
    const { identifier, password } = formState.formData;

    // Validate identifier
    if (!identifier.trim()) {
      errors.identifier = 'Username or Email is required.';
    } else if (isEmail(identifier) && !emailRe.test(identifier)) {
      errors.identifier = 'Email is invalid format.';
    }

    // Validate password
    if (!password.trim()) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    return errors;
  };

  /**
   * Handler khi user submit form
   * 
   * LUỒNG:
   * 1. Prevent default form submission
   * 2. Clear error từ AuthContext nếu có
   * 3. Validate toàn bộ form
   * 4. Nếu có lỗi → hiển thị lỗi và dừng
   * 5. Nếu không có lỗi → gọi login() từ AuthContext
   * 6. Nếu login thành công → hiển thị modal thành công
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) clearError();

    // Validate form
    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });

    // Nếu có lỗi → dừng lại
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // Gọi login từ AuthContext
      const result = await login({
        usernameOrEmail: formState.formData.identifier.trim(),
        password: formState.formData.password,
      });

      // Nếu login thành công → hiển thị modal
      if (result && result.success) {
        dispatch({ type: 'SHOW_SUCCESS_MODAL' });
      }
      // Nếu login thất bại → error sẽ được set trong AuthContext
      // và hiển thị trong Alert component
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  /**
   * Handler khi user click nút Cancel
   * - Reset form về trạng thái ban đầu
   * - Clear error từ AuthContext
   */
  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
    if (error) clearError();
  };

  /**
   * Handler khi đóng modal thành công
   * - Ẩn modal
   * - Reset form
   * - Navigate đến /home
   */
  const handleCloseSuccessModal = () => {
    dispatch({ type: 'HIDE_SUCCESS_MODAL' });
    dispatch({ type: 'RESET_FORM' });
    navigate('/home');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center mb-0">Login</h3>
            </Card.Header>
            <Card.Body>
              {/* Hiển thị error từ AuthContext (nếu login thất bại) */}
              {error && (
                <Alert variant="danger" className="mb-3" onClose={clearError} dismissible>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                {/* Input: Username or Email */}
                <Form.Group controlId="identifier" className="mb-3">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    value={formState.formData.identifier}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.identifier}
                    placeholder="Enter username or email"
                    disabled={loading}
                  />
                  {/* Hiển thị lỗi validation */}
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.identifier}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Input: Password */}
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formState.formData.password}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.password}
                    placeholder="Enter password"
                    disabled={loading}
                  />
                  {/* Hiển thị lỗi validation */}
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons: Login và Cancel */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {/* Nút Login */}
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ flex: 1 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" animation="border" role="status" className="me-2" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  
                  {/* Nút Cancel */}
                  <Button
                    variant="secondary"
                    type="button"
                    style={{ flex: 1 }}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal hiển thị khi đăng nhập thành công */}
      <ConfirmModal
        show={formState.showSuccessModal}
        title="Login Successful!"
        message={`Welcome, ${user?.username}!, login successful.`}
        onConfirm={handleCloseSuccessModal}
        onHide={handleCloseSuccessModal}
      />
    </Container>
  );
}

export default LoginForm;