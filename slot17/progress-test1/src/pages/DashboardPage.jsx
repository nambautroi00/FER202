/**
 * FILE: DashboardPage.jsx
 * MỤC ĐÍCH: Trang chính - hiển thị danh sách payments
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Trang dashboard hiển thị danh sách payments của user
 * - Có NavigationHeader: hiển thị thông tin user và nút logout
 * - FilterBar: cho phép filter và sort payments
 * - PaymentTable: hiển thị bảng payments với các actions (view, edit, delete)
 * 
 * ROUTE: /home (protected, cần authentication)
 * 
 * COMPONENTS:
 * - NavigationHeader: Header với thông tin user
 * - FilterBar: Bộ lọc và tìm kiếm
 * - PaymentTable: Bảng hiển thị payments
 */

import React from 'react';
import { Container } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';

const DashboardPage = () => {
  return (
    <>
      {/* Header với thông tin user và nút logout */}
      <NavigationHeader />
      
      {/* Container chứa filter và table */}
      <Container>
        {/* Bộ lọc: search, filter theo semester/course, sort */}
        <FilterBar />
        
        {/* Bảng hiển thị payments với các actions */}
        <PaymentTable />
      </Container>
    </>
  );
};

export default DashboardPage;