/**
 * FILE: AppRoutes.js
 * MỤC ĐÍCH: Định tuyến (routing) và bảo vệ các route
 * 
 * LUỒNG XỬ LÝ:
 * 1. BrowserRouter: Bọc toàn bộ routes, quản lý history
 * 2. Routes: Container chứa các Route definitions
 * 3. PrivateRoute: Component bảo vệ route, check authentication
 * 4. Navigate: Redirect đến route khác
 * 
 * ROUTES:
 * - / → Redirect đến /home
 * - /login → Trang đăng nhập (public)
 * - /home → Dashboard (protected)
 * - /payment/add → Thêm payment (protected)
 * - /payment/edit/:id → Sửa payment (protected)
 * - /payment/:id → Xem chi tiết payment (protected)
 * - * → Catch-all, redirect đến /home
 * 
 * PRIVATE ROUTE:
 * - Check isAuthenticated từ AuthContext
 * - Nếu chưa đăng nhập → redirect /login
 * - Nếu đã đăng nhập → render children
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddPaymentPage from '../pages/AddPaymentPage';
import EditPaymentPage from '../pages/EditPaymentPage';
import ViewDetailsPage from '../pages/ViewDetailsPage';

/**
 * Component bảo vệ route - chỉ cho phép truy cập khi đã đăng nhập
 * @param {ReactNode} children - Component cần được bảo vệ
 * @returns {ReactNode} children nếu đã đăng nhập, hoặc redirect đến /login
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Lấy isAuthenticated từ AuthContext
 * - Nếu true → render children (cho phép truy cập)
 * - Nếu false → Navigate đến /login (chuyển hướng)
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // Nếu chưa đăng nhập, redirect đến trang login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

/**
 * Component chính định nghĩa tất cả routes của ứng dụng
 */
const AppRoutes = () => {
  return (
    // BrowserRouter: Quản lý routing với HTML5 History API
    <Router>
      <Routes>
        {/* Route gốc: redirect đến /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Route đăng nhập: public, không cần authentication */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Route dashboard: protected, cần đăng nhập */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        
        {/* Route thêm payment: protected */}
        <Route
          path="/payment/add"
          element={
            <PrivateRoute>
              <AddPaymentPage />
            </PrivateRoute>
          }
        />
        
        {/* Route sửa payment: protected, có dynamic param :id */}
        <Route
          path="/payment/edit/:id"
          element={
            <PrivateRoute>
              <EditPaymentPage />
            </PrivateRoute>
          }
        />
        
        {/* Route xem chi tiết payment: protected, có dynamic param :id */}
        <Route
          path="/payment/:id"
          element={
            <PrivateRoute>
              <ViewDetailsPage />
            </PrivateRoute>
          }
        />
        
        {/* Catch-all route: bắt mọi route không khớp, redirect đến /home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;