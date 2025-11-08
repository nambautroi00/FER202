import axios from 'axios';

// Cấu hình Base URL cho JSON Server
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Lấy danh sách users
export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// 2. Lấy danh sách payments
export const getPayments = async () => {
  try {
    const response = await API.get('/payments');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch payments');
  }
};

// 3. Thêm payment mới
export const addPayment = async (paymentData) => {
  try {
    const response = await API.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add payment');
  }
};

// 4. Cập nhật payment
export const updatePayment = async (id, paymentData) => {
  try {
    const response = await API.put(`/payments/${id}`, paymentData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update payment');
  }
};

// 5. Xóa payment
export const deletePayment = async (id) => {
  try {
    await API.delete(`/payments/${id}`);
    return true;
  } catch (error) {
    throw new Error('Failed to delete payment');
  }
};

// 6. lấy user theo id
export const getUserById = async () =>{
  try{
    const response = await API.get('/users/$(id)');
    return response.data;
  }catch(error){
    throw new Error('Failed to fetch useruser')
  }
}

// 7. Cập nhật user (ban/unban account)
export const updateUser = async (id, userData) => {
  try {
    const response = await API.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};