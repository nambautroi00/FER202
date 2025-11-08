/**
 * FILE: NavigationHeader.jsx
 * MỤC ĐÍCH: Component header hiển thị thông tin user và nút logout
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Hiển thị tên ứng dụng "TuitionTracker"
 * - Hiển thị tên user đang đăng nhập (fullName hoặc username)
 * - Có nút Logout để đăng xuất
 * - Sử dụng Bootstrap Navbar component
 * 
 * SỬ DỤNG:
 * - Được dùng trong tất cả các trang protected (Dashboard, Add, Edit, View)
 * - Không dùng trong LoginPage vì chưa có user
 * 
 * LUỒNG LOGOUT:
 * 1. User click "Logout"
 * 2. Gọi logout() từ AuthContext → xóa user khỏi state và localStorage
 * 3. Navigate đến /login
 */

import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavigationHeader = () => {
  // Lấy user và logout function từ AuthContext
  const { user, logout } = useAuth();
  
  // Hook để navigate
  const navigate = useNavigate();
  
  // Lấy tên hiển thị: ưu tiên fullName → username → "Student"
  const fullName = user?.fullName || user?.username || 'Student';

  /**
   * Handler khi user click nút Logout
   * 
   * LUỒNG:
   * 1. Gọi logout() từ AuthContext → xóa user, set isAuthenticated = false
   * 2. Navigate đến /login → chuyển hướng về trang đăng nhập
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        {/* Brand/Logo - click để về trang chủ */}
        <Navbar.Brand href="/home">TuitionTracker</Navbar.Brand>
        
        {/* Toggle button cho mobile (hamburger menu) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Collapsible content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Hiển thị tên user đang đăng nhập */}
            <Navbar.Text className="me-3">
              Signed in as: <strong>{fullName}</strong>
            </Navbar.Text>
            
            {/* Nút Logout */}
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationHeader;