/**
 * FILE: AddPaymentPage.jsx
 * MỤC ĐÍCH: Trang thêm payment mới
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Trang để user thêm payment mới
 * - Sử dụng AddPaymentForm component
 * - AddPaymentForm sẽ tự động set userId từ user hiện tại
 * - Sau khi submit thành công → redirect về /home
 * 
 * ROUTE: /payment/add (protected, cần authentication)
 * 
 * COMPONENTS:
 * - NavigationHeader: Header với thông tin user
 * - AddPaymentForm: Form thêm payment (không có paymentId prop = add mode)
 */

import React from 'react';
import NavigationHeader from '../components/NavigationHeader';
import AddPaymentForm from '../components/AddPaymentForm';

const AddPaymentPage = () => {
  return (
    <>
      {/* Header với thông tin user và nút logout */}
      <NavigationHeader />
      
      {/* Form thêm payment mới */}
      {/* Không truyền paymentId → AddPaymentForm sẽ ở chế độ "Add" */}
      <AddPaymentForm />
    </>
  );
};

export default AddPaymentPage;