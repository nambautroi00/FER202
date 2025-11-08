/**
 * FILE: App.js
 * MỤC ĐÍCH: Component gốc của ứng dụng, thiết lập Context Providers
 * 
 * LUỒNG XỬ LÝ:
 * 1. Import các Provider (AuthProvider, PaymentProvider)
 * 2. Bọc AppRoutes bằng các Provider theo thứ tự:
 *    - AuthProvider (ngoài cùng) → quản lý authentication
 *    - PaymentProvider (bên trong) → quản lý payments, cần AuthContext
 *    - AppRoutes (trong cùng) → định tuyến các trang
 * 
 * TẠI SAO THỨ TỰ NÀY:
 * - PaymentProvider cần dùng useAuth() từ AuthProvider
 * - Nên AuthProvider phải bọc ngoài PaymentProvider
 * - AppRoutes cần cả 2 context nên ở trong cùng
 * 
 * KHI NÀO CHẠY:
 * - Khi App component được render từ index.js
 * - Chạy một lần khi ứng dụng khởi động
 */

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS của Bootstrap
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    // AuthProvider: Cung cấp authentication state cho toàn bộ app
    <AuthProvider>
      {/* PaymentProvider: Cung cấp payment state, cần AuthContext bên trong */}
      <PaymentProvider>
        {/* AppRoutes: Định tuyến các trang, cần cả Auth và Payment context */}
        <AppRoutes />
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;