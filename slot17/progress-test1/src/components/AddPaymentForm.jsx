/**
 * FILE: AddPaymentForm.jsx
 * MỤC ĐÍCH: Component form thêm/sửa payment (2-in-1)
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Component này có thể hoạt động ở 2 mode: Add hoặc Edit
 * - Nếu có paymentId prop → Edit mode (sửa payment)
 * - Nếu không có paymentId → Add mode (thêm payment mới)
 * - Sử dụng trong AddPaymentPage và EditPaymentPage
 * 
 * PROPS:
 * - paymentId: string | null - ID của payment cần sửa (null = add mode)
 * 
 * VALIDATION:
 * - semester: Required
 * - courseName: Required
 * - amount: Required, phải là số dương
 * - date: Required
 * 
 * LUỒNG:
 * 1. Load data: Nếu edit mode → load payment data từ allPayments
 * 2. User điền form → validation real-time
 * 3. Submit → validate → gọi addPayment hoặc updatePayment
 * 4. Thành công → navigate về /home
 */

import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Alert, Spinner } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddPaymentForm = ({ paymentId = null }) => {
  // Lấy functions từ PaymentContext
  const { addPayment, updatePayment, allPayments } = usePayments();
  
  // Lấy user từ AuthContext (để lấy userId)
  const { user } = useAuth();
  
  // Hook để navigate
  const navigate = useNavigate();
  
  // Form data state
  const [formData, setFormData] = useState({
    userId: user?.id || '',
    semester: '',
    courseName: '',
    amount: '',
    date: '',
  });
  
  // Validation errors
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // Error message
  const [error, setError] = useState('');

  // Xác định mode: có paymentId → Edit mode, không có → Add mode
  const isEditMode = !!paymentId;

  /**
   * useEffect: Load data khi component mount hoặc paymentId/user thay đổi
   * 
   * LUỒNG:
   * - Edit mode: Tìm payment trong allPayments → load data vào form
   * - Add mode: Reset form về trạng thái ban đầu (date = today)
   */
  useEffect(() => {
    if (isEditMode) {
      // Edit mode: Load payment data
      const payment = allPayments.find(p => p.id === paymentId);
      if (payment) {
        setFormData({
          userId: payment.userId,
          semester: payment.semester,
          courseName: payment.courseName,
          amount: payment.amount.toString(), // Convert number → string
          date: payment.date,
        });
      }
    } else {
      // Add mode: Reset form với date = today
      setFormData({
        userId: user?.id || '',
        semester: '',
        courseName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      });
    }
  }, [paymentId, allPayments, user, isEditMode]);

  /**
   * Handler khi user thay đổi giá trị input
   * - Cập nhật formData
   * - Clear error của field đó
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error của field này
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * Validate form trước khi submit
   * @returns {boolean} true nếu không có lỗi
   */
  const validateForm = () => {
    const newErrors = {};

    // Validate semester
    if (!formData.semester.trim()) {
      newErrors.semester = 'Semester is required';
    }

    // Validate courseName
    if (!formData.courseName.trim()) {
      newErrors.courseName = 'Course name is required';
    }

    // Validate amount
    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    // Validate date
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handler khi submit form
   * 
   * LUỒNG:
   * 1. Validate form
   * 2. Nếu có lỗi → dừng
   * 3. Gọi addPayment hoặc updatePayment tùy mode
   * 4. Thành công → navigate về /home
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Chuẩn bị data để gửi
    const paymentData = {
      userId: user?.id || formData.userId,
      semester: formData.semester.trim(),
      courseName: formData.courseName.trim(),
      amount: parseFloat(formData.amount), // Convert string → number
      date: formData.date,
    };

    try {
      let result;
      // Gọi function tùy mode
      if (isEditMode) {
        result = await updatePayment(paymentId, paymentData);
      } else {
        result = await addPayment(paymentData);
      }

      // Nếu thành công → navigate về home
      if (result.success) {
        navigate('/home');
      } else {
        setError(result.error || 'Failed to save payment');
      }
    } catch (err) {
      setError('An error occurred while saving the payment');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handler khi click Cancel
   * - Navigate về /home
   */
  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h3 className="mb-0">{isEditMode ? 'Edit Payment' : 'Add New Payment'}</h3>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Semester *</Form.Label>
              <Form.Control
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                isInvalid={!!errors.semester}
                placeholder="e.g., Fall 2025"
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.semester}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Name *</Form.Label>
              <Form.Control
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                isInvalid={!!errors.courseName}
                placeholder="e.g., Web Development"
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.courseName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount (VNĐ) *</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                isInvalid={!!errors.amount}
                placeholder="e.g., 3500000"
                min="0"
                step="1000"
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date *</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                isInvalid={!!errors.date}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.date}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" animation="border" className="me-2" />
                    Saving...
                  </>
                ) : (
                  isEditMode ? 'Update Payment' : 'Add Payment'
                )}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={handleCancel}
                disabled={loading}
                style={{ flex: 1 }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddPaymentForm;

