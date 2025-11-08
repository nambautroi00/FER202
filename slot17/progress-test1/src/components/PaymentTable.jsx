/**
 * FILE: PaymentTable.jsx
 * MỤC ĐÍCH: Component hiển thị bảng danh sách payments với các actions
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Hiển thị bảng payments (đã được filter/sort từ PaymentContext)
 * - Mỗi payment có 3 actions: View Details, Edit, Delete
 * - Có nút "Add Payment" để thêm payment mới
 * - Hiển thị tổng số tiền (totalAmount) ở footer
 * - Sử dụng modals để view/edit/delete payments
 * 
 * MODALS:
 * - ViewDetailsModal: Xem chi tiết payment
 * - EditPaymentModal: Sửa payment
 * - ConfirmModal: Xác nhận xóa payment
 * 
 * STATE:
 * - showDeleteModal: boolean - Hiển thị modal xác nhận xóa
 * - paymentToDelete: Object - Payment cần xóa
 */

import React, { useState } from 'react';
import { Table, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import ViewDetailsModal from './ViewDetailsModal';
import EditPaymentModal from './EditPaymentModal';

const PaymentTable = () => {
  // Lấy data và functions từ PaymentContext
  const { 
    payments,          // Danh sách payments đã filter/sort (hiển thị trong table)
    loading,           // Đang loading
    error,             // Lỗi nếu có
    totalAmount,       // Tổng số tiền của payments
    deletePayment,     // Function xóa payment
    openViewModal,     // Function mở modal xem chi tiết
    openEditModal,     // Function mở modal sửa
  } = usePayments();
  
  // Hook để navigate
  const navigate = useNavigate();
  
  // Local state cho modal xóa
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  /**
   * Format số tiền theo định dạng Việt Nam
   * @param {number} amount - Số tiền
   * @returns {string} Số tiền đã format (ví dụ: "3.000.000 VNĐ")
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  /**
   * Handler khi click "View Details"
   * @param {Object} payment - Payment cần xem
   */
  const handleViewDetails = (payment) => {
    openViewModal(payment);
  };

  /**
   * Handler khi click "Edit"
   * @param {Object} payment - Payment cần sửa
   */
  const handleEdit = (payment) => {
    openEditModal(payment);
  };

  /**
   * Handler khi click "Delete"
   * - Lưu payment cần xóa vào state
   * - Hiển thị modal xác nhận
   * @param {Object} payment - Payment cần xóa
   */
  const handleDeleteClick = (payment) => {
    setPaymentToDelete(payment);
    setShowDeleteModal(true);
  };

  /**
   * Handler khi xác nhận xóa payment
   * - Gọi deletePayment() từ PaymentContext
   * - Đóng modal và reset state
   */
  const handleConfirmDelete = async () => {
    if (paymentToDelete) {
      await deletePayment(paymentToDelete.id);
      setShowDeleteModal(false);
      setPaymentToDelete(null);
    }
  };

  // Hiển thị loading spinner khi đang tải dữ liệu
  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <Card className="shadow-sm">
        {/* Header với tiêu đề và nút Add Payment */}
        <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
          <span>Payment List</span>
          {/* Nút thêm payment mới → navigate đến /payment/add */}
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
            {/* Header của bảng */}
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Nếu không có payments → hiển thị thông báo */}
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No payments found
                  </td>
                </tr>
              ) : (
                /* Render từng payment trong bảng */
                payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.semester}</td>
                    <td>{payment.courseName}</td>
                    <td>{formatCurrency(payment.amount)}</td>
                    <td>
                      {/* Các nút actions cho mỗi payment */}
                      <div className="d-flex gap-2">
                        {/* Nút xem chi tiết → mở ViewDetailsModal */}
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleViewDetails(payment)}
                        >
                          View Details
                        </Button>
                        {/* Nút sửa → mở EditPaymentModal */}
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(payment)}
                        >
                          Edit
                        </Button>
                        {/* Nút xóa → hiển thị ConfirmModal */}
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
            {/* Footer hiển thị tổng số tiền */}
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

      {/* Modal xem chi tiết payment */}
      <ViewDetailsModal />

      {/* Modal sửa payment */}
      <EditPaymentModal />

      {/* Modal xác nhận xóa payment */}
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