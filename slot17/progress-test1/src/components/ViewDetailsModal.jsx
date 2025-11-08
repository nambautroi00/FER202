/**
 * FILE: ViewDetailsModal.jsx
 * MỤC ĐÍCH: Modal hiển thị chi tiết payment
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Modal hiển thị thông tin chi tiết của payment
 * - Lấy state từ PaymentContext (showViewModal, selectedPayment)
 * - Có nút "Edit Payment" để chuyển sang modal sửa
 * - Có nút "Close" để đóng modal
 * 
 * SỬ DỤNG:
 * - Được gọi từ PaymentTable khi user click "View Details"
 * - State được quản lý bởi PaymentContext
 */

import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';

const ViewDetailsModal = () => {
  // Lấy state và functions từ PaymentContext
  const { showViewModal, selectedPayment, closeViewModal, openEditModal } = usePayments();

  /**
   * Format số tiền theo định dạng Việt Nam
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  /**
   * Format ngày theo định dạng Việt Nam
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Handler khi click "Edit Payment"
   * - Đóng modal xem chi tiết
   * - Mở modal sửa với payment hiện tại
   */
  const handleEdit = () => {
    closeViewModal();
    openEditModal(selectedPayment);
  };

  // Nếu không có payment được chọn → không render
  if (!selectedPayment) return null;

  return (
    <Modal show={showViewModal} onHide={closeViewModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <div className="mb-3">
              <strong>Payment ID:</strong>
              <p className="text-muted">{selectedPayment.id}</p>
            </div>

            <div className="mb-3">
              <strong>Semester:</strong>
              <p className="text-muted">{selectedPayment.semester}</p>
            </div>

            <div className="mb-3">
              <strong>Course Name:</strong>
              <p className="text-muted">{selectedPayment.courseName}</p>
            </div>
          </Col>

          <Col md={6}>
            <div className="mb-3">
              <strong>Amount:</strong>
              <p className="text-primary fs-5">{formatCurrency(selectedPayment.amount)}</p>
            </div>

            <div className="mb-3">
              <strong>Payment Date:</strong>
              <p className="text-muted">{formatDate(selectedPayment.date)}</p>
            </div>

            <div className="mb-3">
              <strong>User ID:</strong>
              <p className="text-muted">{selectedPayment.userId}</p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleEdit}>
          Edit Payment
        </Button>
        <Button variant="secondary" onClick={closeViewModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewDetailsModal;


