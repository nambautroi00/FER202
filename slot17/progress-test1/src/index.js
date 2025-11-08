/**
 * FILE: index.js
 * MỤC ĐÍCH: Entry point của ứng dụng React
 * 
 * LUỒNG XỬ LÝ:
 * 1. Tạo React root từ element có id="root" trong public/index.html
 * 2. Render App component vào root đó
 * 3. StrictMode giúp phát hiện lỗi tiềm ẩn trong development
 * 
 * KHI NÀO CHẠY:
 * - Khi ứng dụng khởi động (npm start)
 * - File này là điểm bắt đầu của toàn bộ ứng dụng
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Tạo root element từ div#root trong HTML
// createRoot là API mới của React 18, thay thế ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App component vào DOM
// StrictMode: chế độ nghiêm ngặt, giúp phát hiện lỗi trong development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
