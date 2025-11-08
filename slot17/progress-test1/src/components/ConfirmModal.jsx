/**
 * FILE: ConfirmModal.jsx
 * MỤC ĐÍCH: Component modal xác nhận - hiển thị thông báo và nút xác nhận
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Modal đơn giản để hiển thị thông báo và xác nhận
 * - Có thể dùng cho nhiều mục đích: login success, delete confirmation, etc.
 * - Có nút đóng (X) và nút xác nhận
 * 
 * PROPS:
 * - show: boolean - Hiển thị modal hay không
 * - title: string - Tiêu đề modal
 * - message: string - Nội dung thông báo
 * - onConfirm: function - Callback khi click "Xác nhận"
 * - onHide: function - Callback khi đóng modal (click X hoặc backdrop)
 * 
 * SỬ DỤNG:
 * - LoginForm: Hiển thị "Login Successful" sau khi đăng nhập thành công
 * - PaymentTable: Hiển thị xác nhận trước khi xóa payment
 */

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
 * Component modal xác nhận
 * @param {boolean} show - Hiển thị modal
 * @param {string} title - Tiêu đề modal
 * @param {string} message - Nội dung thông báo
 * @param {function} onConfirm - Callback khi xác nhận
 * @param {function} onHide - Callback khi đóng modal
 */
const ConfirmModal = ({ show, title, message, onConfirm, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      {/* Header với tiêu đề và nút đóng (X) */}
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      
      {/* Body với nội dung thông báo */}
      <Modal.Body>{message}</Modal.Body>
      
      {/* Footer với nút xác nhận */}
      <Modal.Footer>
        {/* Nút xác nhận: gọi onConfirm nếu có, không thì gọi onHide */}
        <Button variant="primary" onClick={onConfirm || onHide}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;