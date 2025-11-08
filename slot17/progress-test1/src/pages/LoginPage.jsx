/**
 * FILE: LoginPage.jsx
 * MỤC ĐÍCH: Trang đăng nhập - route /login
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Component đơn giản, chỉ render LoginForm component
 * - Không cần navigation header vì chưa đăng nhập
 * - Sau khi đăng nhập thành công → redirect đến /home
 * 
 * ROUTE: /login (public, không cần authentication)
 */

import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  // Chỉ render LoginForm component
  // LoginForm sẽ xử lý toàn bộ logic đăng nhập
  return <LoginForm />;
};

export default LoginPage;