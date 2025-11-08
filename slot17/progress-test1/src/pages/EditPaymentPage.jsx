/**
 * FILE: EditPaymentPage.jsx
 * MỤC ĐÍCH: Trang sửa payment
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Trang để user sửa payment đã tồn tại
 * - Lấy payment ID từ URL params (:id)
 * - Truyền paymentId vào AddPaymentForm
 * - AddPaymentForm sẽ detect có paymentId → chuyển sang chế độ "Edit"
 * - Load payment data từ allPayments và điền vào form
 * - Sau khi submit thành công → redirect về /home
 * 
 * ROUTE: /payment/edit/:id (protected, cần authentication)
 * 
 * COMPONENTS:
 * - NavigationHeader: Header với thông tin user
 * - AddPaymentForm: Form sửa payment (có paymentId prop = edit mode)
 * 
 * LƯU Ý:
 * - Sử dụng cùng AddPaymentForm component như AddPaymentPage
 * - AddPaymentForm tự động detect mode dựa trên paymentId prop
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import AddPaymentForm from '../components/AddPaymentForm';

const EditPaymentPage = () => {
  // Lấy payment ID từ URL params
  // Ví dụ: /payment/edit/123 → id = "123"
  const { id } = useParams();
  
  return (
    <>
      {/* Header với thông tin user và nút logout */}
      <NavigationHeader />
      
      {/* Form sửa payment */}
      {/* Có paymentId → AddPaymentForm sẽ ở chế độ "Edit" */}
      <AddPaymentForm paymentId={id} />
    </>
  );
};

export default EditPaymentPage;

