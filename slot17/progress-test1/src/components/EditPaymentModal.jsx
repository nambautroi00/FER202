import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';

const EditPaymentModal = () => {
  const { showEditModal, selectedPayment, closeEditModal, updatePayment } = usePayments();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    semester: '',
    courseName: '',
    amount: '',
    date: '',
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedPayment) {
      setFormData({
        semester: selectedPayment.semester,
        courseName: selectedPayment.courseName,
        amount: selectedPayment.amount.toString(),
        date: selectedPayment.date,
      });
      setErrors({});
      setError('');
    }
  }, [selectedPayment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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
      userId: user?.id || selectedPayment.userId,
      semester: formData.semester.trim(),
      courseName: formData.courseName.trim(),
      amount: parseFloat(formData.amount),
      date: formData.date,
    };

    try {
      const result = await updatePayment(selectedPayment.id, paymentData);

      if (result.success) {
        closeEditModal();
      } else {
        setError(result.error || 'Failed to update payment');
      }
    } catch (err) {
      setError('An error occurred while updating the payment');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPayment) return null;

  return (
    <Modal show={showEditModal} onHide={closeEditModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Payment</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Updating...
              </>
            ) : (
              'Update Payment'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditPaymentModal;


