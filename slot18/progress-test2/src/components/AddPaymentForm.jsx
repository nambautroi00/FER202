import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Alert, Spinner } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddPaymentForm = ({ paymentId = null }) => {
  const { addPayment, updatePayment, allPayments } = usePayments();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userId: user?.id || '',
    semester: '',
    courseName: '',
    amount: '',
    date: '',
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = !!paymentId;

  useEffect(() => {
    if (isEditMode) {
      const payment = allPayments.find(p => p.id === paymentId);
      if (payment) {
        setFormData({
          userId: payment.userId,
          semester: payment.semester,
          courseName: payment.courseName,
          amount: payment.amount.toString(),
          date: payment.date,
        });
      }
    } else {
      setFormData({
        userId: user?.id || '',
        semester: '',
        courseName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [paymentId, allPayments, user, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.semester.trim()) {
      newErrors.semester = 'Semester is required';
    }

    if (!formData.courseName.trim()) {
      newErrors.courseName = 'Course name is required';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const paymentData = {
      userId: user?.id || formData.userId,
      semester: formData.semester.trim(),
      courseName: formData.courseName.trim(),
      amount: parseFloat(formData.amount),
      date: formData.date,
    };

    try {
      let result;
      if (isEditMode) {
        result = await updatePayment(paymentId, paymentData);
      } else {
        result = await addPayment(paymentData);
      }

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

