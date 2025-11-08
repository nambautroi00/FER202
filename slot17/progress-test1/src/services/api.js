/**
 * FILE: api.js
 * MỤC ĐÍCH: Service layer - xử lý tất cả API calls đến JSON Server
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Sử dụng axios để tạo HTTP client với baseURL cố định
 * - Tất cả requests đều gửi đến http://localhost:3001
 * - JSON Server tự động tạo REST API từ db.json
 * 
 * ENDPOINTS:
 * GET    /users          → Lấy danh sách users
 * GET    /payments       → Lấy danh sách payments
 * POST   /payments       → Tạo payment mới
 * PUT    /payments/:id   → Cập nhật payment
 * DELETE /payments/:id    → Xóa payment
 * 
 * LƯU Ý:
 * - Cần chạy JSON Server: npx json-server --watch db.json --port 3001
 * - Tất cả functions đều async và throw error nếu thất bại
 */

import axios from 'axios';

// Tạo axios instance với cấu hình mặc định
// baseURL: tất cả requests sẽ gửi đến localhost:3001
// headers: định dạng JSON cho request/response
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Lấy danh sách tất cả users từ server
 * @returns {Promise<Array>} Mảng các user objects
 * @throws {Error} Nếu request thất bại
 * 
 * SỬ DỤNG: AuthContext.login() để tìm user đăng nhập
 */
export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data; // JSON Server trả về mảng users
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

/**
 * Lấy danh sách tất cả payments từ server
 * @returns {Promise<Array>} Mảng các payment objects
 * @throws {Error} Nếu request thất bại
 * 
 * SỬ DỤNG: PaymentContext.fetchPayments() để load payments
 * LƯU Ý: Trả về TẤT CẢ payments, cần filter theo userId ở client
 */
export const getPayments = async () => {
  try {
    const response = await API.get('/payments');
    return response.data; // JSON Server trả về mảng payments
  } catch (error) {
    throw new Error('Failed to fetch payments');
  }
};

/**
 * Tạo payment mới
 * @param {Object} paymentData - Object chứa: userId, semester, courseName, amount, date
 * @returns {Promise<Object>} Payment object mới được tạo (có id từ server)
 * @throws {Error} Nếu request thất bại
 * 
 * SỬ DỤNG: PaymentContext.addPayment() khi user submit form thêm payment
 * JSON Server tự động tạo id mới cho payment
 */
export const addPayment = async (paymentData) => {
  try {
    const response = await API.post('/payments', paymentData);
    return response.data; // Server trả về payment mới với id
  } catch (error) {
    throw new Error('Failed to add payment');
  }
};

/**
 * Cập nhật payment đã tồn tại
 * @param {string} id - ID của payment cần update
 * @param {Object} paymentData - Object chứa dữ liệu mới
 * @returns {Promise<Object>} Payment object đã được cập nhật
 * @throws {Error} Nếu request thất bại
 * 
 * SỬ DỤNG: PaymentContext.updatePayment() khi user sửa payment
 * PUT request sẽ thay thế toàn bộ object, không phải merge
 */
export const updatePayment = async (id, paymentData) => {
  try {
    const response = await API.put(`/payments/${id}`, paymentData);
    return response.data; // Server trả về payment đã update
  } catch (error) {
    throw new Error('Failed to update payment');
  }
};

/**
 * Xóa payment
 * @param {string} id - ID của payment cần xóa
 * @returns {Promise<boolean>} true nếu xóa thành công
 * @throws {Error} Nếu request thất bại
 * 
 * SỬ DỤNG: PaymentContext.deletePayment() khi user xác nhận xóa
 * DELETE request không trả về data, chỉ cần biết thành công hay không
 */
export const deletePayment = async (id) => {
  try {
    await API.delete(`/payments/${id}`);
    return true; // Xóa thành công
  } catch (error) {
    throw new Error('Failed to delete payment');
  }
};