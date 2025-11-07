import React, { useState } from 'react';
import { Table, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import ViewDetailsModal from './ViewDetailsModal';
import EditPaymentModal from './EditPaymentModal';

const PaymentTable = () => {
  const { 
    payments, 
    loading, 
    error, 
    totalAmount, 
    deletePayment,
    openViewModal,
    openEditModal,
  } = usePayments();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  const handleViewDetails = (payment) => {
    openViewModal(payment);
  };

  const handleEdit = (payment) => {
    openEditModal(payment);
  };

  const handleDeleteClick = (payment) => {
    setPaymentToDelete(payment);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (paymentToDelete) {
      await deletePayment(paymentToDelete.id);
      setShowDeleteModal(false);
      setPaymentToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <Card className="shadow-sm">
        <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
          <span>Payment List</span>
          <Button 
            variant="success" 
            size="sm"
            onClick={() => navigate('/payment/add')}
          >
            + Add Payment
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.semester}</td>
                    <td>{payment.courseName}</td>
                    <td>{formatCurrency(payment.amount)}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleViewDetails(payment)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(payment)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteClick(payment)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                  <strong>Total Amount:</strong>
                </td>
                <td colSpan="2">
                  <strong>{formatCurrency(totalAmount)}</strong>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Card.Body>
      </Card>

      {/* View Details Modal */}
      <ViewDetailsModal />

      {/* Edit Payment Modal */}
      <EditPaymentModal />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={showDeleteModal}
        title="Confirm Delete"
        message={`Are you sure you want to delete payment for "${paymentToDelete?.courseName}"?`}
        onConfirm={handleConfirmDelete}
        onHide={() => {
          setShowDeleteModal(false);
          setPaymentToDelete(null);
        }}
      />
    </>
  );
};

export default PaymentTable;