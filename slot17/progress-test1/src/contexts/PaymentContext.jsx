/**
 * FILE: PaymentContext.jsx
 * MỤC ĐÍCH: Quản lý payment state toàn cục - CRUD, filter, sort
 * 
 * KIẾN TRÚC:
 * - Context API: Share payment state giữa components
 * - useReducer: Quản lý state phức tạp với reducer
 * - useAuth: Lấy user từ AuthContext để filter payments
 * 
 * LUỒNG XỬ LÝ CHÍNH:
 * 1. Khi user đăng nhập → fetch payments của user đó
 * 2. Filter payments theo userId (mỗi user chỉ thấy payments của mình)
 * 3. Apply filters (search, semester, course, sort) → filteredPayments
 * 4. CRUD operations: add, update, delete payments
 * 5. Modal state: quản lý view/edit modals
 * 
 * STATE STRUCTURE:
 * {
 *   payments: Array,              // Tất cả payments của user hiện tại
 *   filteredPayments: Array,       // Payments sau khi filter/sort
 *   loading: boolean,
 *   error: string | null,
 *   filters: { searchTerm, semester, course, sortBy },
 *   totalAmount: number,           // Tổng tiền của filteredPayments
 *   currentUserId: string,
 *   showViewModal: boolean,
 *   showEditModal: boolean,
 *   selectedPayment: Object | null
 * }
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext'; // Import để lấy user hiện tại

// Tạo Context cho Payment state
const PaymentContext = createContext();

// State khởi tạo - tất cả đều rỗng/null
const initialPaymentState = {
  payments: [],              // Danh sách payments gốc (chưa filter)
  filteredPayments: [],      // Danh sách payments sau khi filter/sort (hiển thị trong UI)
  loading: false,            // Đang tải dữ liệu
  error: null,               // Lỗi nếu có
  filters: {
    searchTerm: '',          // Từ khóa tìm kiếm (semester hoặc course)
    semester: '',            // Filter theo semester cụ thể
    course: '',              // Filter theo course cụ thể
    sortBy: 'course_asc',    // Sắp xếp: course_asc, course_desc, date_asc, date_desc, amount_asc, amount_desc
  },
  totalAmount: 0,            // Tổng số tiền của filteredPayments
  currentUserId: null,       // ID của user hiện tại
  // State cho modals
  showViewModal: false,      // Hiển thị modal xem chi tiết
  showEditModal: false,      // Hiển thị modal sửa
  selectedPayment: null,     // Payment được chọn để xem/sửa
};

/**
 * Reducer function - xử lý tất cả actions liên quan đến payments
 * 
 * @param {Object} state - State hiện tại
 * @param {Object} action - Action object { type, payload }
 * @returns {Object} State mới
 */
const paymentReducer = (state, action) => {
  switch (action.type) {
    // Bắt đầu fetch payments → set loading = true
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    
    // Đã fetch xong payments → lưu vào state.payments
    case 'SET_PAYMENTS':
      return { ...state, payments: action.payload, loading: false };
    
    // Đã filter/sort xong → lưu vào filteredPayments và tính totalAmount
    case 'SET_FILTERED_PAYMENTS':
      return {
        ...state,
        filteredPayments: action.payload,
        // Tính tổng tiền từ filteredPayments
        totalAmount: action.payload.reduce((sum, p) => sum + p.amount, 0),
      };
    
    // Có lỗi xảy ra
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    
    // Cập nhật userId hiện tại
    case 'SET_USER_ID':
      return { ...state, currentUserId: action.payload };
    
    // Cập nhật search term (tìm kiếm)
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        filters: { ...state.filters, searchTerm: action.payload },
      };
    
    // Cập nhật filter theo semester
    case 'SET_SEMESTER_FILTER':
      return {
        ...state,
        filters: { ...state.filters, semester: action.payload },
      };
    
    // Cập nhật filter theo course
    case 'SET_COURSE_FILTER':
      return {
        ...state,
        filters: { ...state.filters, course: action.payload },
      };
    
    // Cập nhật cách sắp xếp
    case 'SET_SORT':
      return {
        ...state,
        filters: { ...state.filters, sortBy: action.payload },
      };
    
    // Reset tất cả filters về mặc định
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {
          searchTerm: '',
          semester: '',
          course: '',
          sortBy: 'course_asc',
        },
      };
    
    // Thêm payment mới vào danh sách
    case 'ADD_PAYMENT':
      return {
        ...state,
        payments: [...state.payments, action.payload], // Thêm vào cuối mảng
      };
    
    // Cập nhật payment đã tồn tại
    case 'UPDATE_PAYMENT':
      return {
        ...state,
        // Map qua payments, thay thế payment có id khớp
        payments: state.payments.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    
    // Xóa payment khỏi danh sách
    case 'DELETE_PAYMENT':
      return {
        ...state,
        // Filter ra payment có id khác với id cần xóa
        payments: state.payments.filter((p) => p.id !== action.payload),
      };
    
    // Mở modal xem chi tiết
    case 'OPEN_VIEW_MODAL':
      return {
        ...state,
        showViewModal: true,
        selectedPayment: action.payload, // Payment được chọn
      };
    
    // Đóng modal xem chi tiết
    case 'CLOSE_VIEW_MODAL':
      return {
        ...state,
        showViewModal: false,
        selectedPayment: null,
      };
    
    // Mở modal sửa
    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        showEditModal: true,
        selectedPayment: action.payload, // Payment được chọn
      };
    
    // Đóng modal sửa
    case 'CLOSE_EDIT_MODAL':
      return {
        ...state,
        showEditModal: false,
        selectedPayment: null,
      };
    
    default:
      return state; // Không có action nào khớp → giữ nguyên state
  }
};

/**
 * PaymentProvider Component
 * 
 * MỤC ĐÍCH: Cung cấp payment state và functions cho toàn bộ app
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Sử dụng useReducer để quản lý state
 * - Lấy user từ AuthContext để filter payments
 * - Tự động fetch payments khi user đăng nhập
 * - Tự động apply filters khi có thay đổi
 * 
 * @param {ReactNode} children - Components con cần access payment context
 */
export const PaymentProvider = ({ children }) => {
  // useReducer: Quản lý payment state
  const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);
  
  // Lấy user từ AuthContext - cần để filter payments theo userId
  const { user } = useAuth();

  /**
   * useEffect 1: Cập nhật currentUserId khi user thay đổi
   * 
   * LUỒNG:
   * - Khi user đăng nhập/logout → user object thay đổi
   * - Cập nhật currentUserId trong state
   * - Dùng để filter payments
   * 
   * DEPENDENCY: [user] → chạy khi user thay đổi
   */
  useEffect(() => {
    if (user?.id) {
      dispatch({ type: 'SET_USER_ID', payload: user.id });
    }
  }, [user]);

  /**
   * useEffect 2: Fetch payments khi user đăng nhập
   * 
   * LUỒNG:
   * - Khi user.id thay đổi (đăng nhập) → gọi fetchPayments()
   * - fetchPayments() sẽ lấy tất cả payments từ API
   * - Filter theo userId → chỉ lấy payments của user hiện tại
   * - Lưu vào state.payments
   * 
   * DEPENDENCY: [user?.id] → chạy khi user đăng nhập hoặc đổi user
   */
  useEffect(() => {
    if (user?.id) {
      fetchPayments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  /**
   * useEffect 3: Tự động apply filters khi có thay đổi
   * 
   * LUỒNG:
   * - Khi payments thay đổi (fetch, add, update, delete)
   * - Khi filters thay đổi (search, semester, course, sort)
   * - Khi userId thay đổi
   * → Gọi applyFilters() để filter và sort lại
   * → Cập nhật filteredPayments và totalAmount
   * 
   * DEPENDENCY: [state.payments, state.filters, state.currentUserId]
   * → Chạy mỗi khi một trong các giá trị này thay đổi
   */
  useEffect(() => {
    if (user?.id && state.payments.length >= 0) {
      applyFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.payments, state.filters, state.currentUserId]);

  /**
   * Function: Fetch payments từ server
   * 
   * LUỒNG XỬ LÝ:
   * 1. Check user.id có tồn tại không
   * 2. Set loading = true
   * 3. Gọi API lấy TẤT CẢ payments
   * 4. Filter payments theo userId của user hiện tại
   * 5. Lưu vào state.payments
   * 6. useEffect 3 sẽ tự động gọi applyFilters()
   * 
   * LƯU Ý:
   * - API trả về TẤT CẢ payments của TẤT CẢ users
   * - Cần filter ở client để chỉ lấy payments của user hiện tại
   * - So sánh string để đảm bảo type matching (id có thể là string hoặc number)
   */
  const fetchPayments = async () => {
    if (!user?.id) return; // Không có user → không fetch
    
    dispatch({ type: 'SET_LOADING' }); // Bắt đầu loading
    try {
      // Lấy tất cả payments từ API
      const allPayments = await api.getPayments();
      
      // Filter payments theo userId của user hiện tại
      // So sánh string để đảm bảo đúng (vì id có thể là "1" hoặc 1)
      const userPayments = allPayments.filter(
        p => String(p.userId) === String(user.id)
      );
      
      // Lưu payments của user vào state
      dispatch({ type: 'SET_PAYMENTS', payload: userPayments });
    } catch (error) {
      // Có lỗi → lưu error message
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  /**
   * Function: Áp dụng filters và sort cho payments
   * 
   * LUỒNG XỬ LÝ:
   * 1. Bắt đầu với payments của user hiện tại
   * 2. Apply search filter (tìm trong semester và courseName)
   * 3. Apply semester filter (exact match)
   * 4. Apply course filter (exact match)
   * 5. Sort theo field và order được chọn
   * 6. Dispatch SET_FILTERED_PAYMENTS → cập nhật filteredPayments và totalAmount
   * 
   * FILTER LOGIC:
   * - Search: Tìm kiếm không phân biệt hoa thường trong semester và courseName
   * - Semester: Filter exact match
   * - Course: Filter exact match
   * - Sort: Sắp xếp theo course/date/amount, tăng dần hoặc giảm dần
   * 
   * KHI NÀO CHẠY:
   * - Tự động chạy khi payments, filters, hoặc userId thay đổi (useEffect 3)
   */
  const applyFilters = () => {
    // Bắt đầu với payments của user hiện tại
    // Filter lại theo userId để đảm bảo khi user thay đổi
    let filtered = [...state.payments].filter(
      p => String(p.userId) === String(state.currentUserId)
    );

    // 1. SEARCH FILTER: Tìm kiếm trong semester và courseName
    if (state.filters.searchTerm) {
      const search = state.filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.semester.toLowerCase().includes(search) ||  // Tìm trong semester
          p.courseName.toLowerCase().includes(search)    // Tìm trong courseName
      );
    }

    // 2. SEMESTER FILTER: Filter theo semester cụ thể
    if (state.filters.semester) {
      filtered = filtered.filter((p) => p.semester === state.filters.semester);
    }

    // 3. COURSE FILTER: Filter theo course cụ thể
    if (state.filters.course) {
      filtered = filtered.filter((p) => p.courseName === state.filters.course);
    }

    // 4. SORT: Sắp xếp theo field và order
    // sortBy format: "course_asc", "date_desc", "amount_asc", etc.
    const [field, order] = state.filters.sortBy.split('_'); // Tách "course_asc" → ["course", "asc"]
    
    filtered.sort((a, b) => {
      let aVal, bVal; // Giá trị để so sánh
      
      // Xác định field cần sort
      if (field === 'course') {
        aVal = a.courseName;
        bVal = b.courseName;
      } else if (field === 'date') {
        aVal = new Date(a.date);  // Convert string → Date object
        bVal = new Date(b.date);
      } else if (field === 'amount') {
        aVal = a.amount;
        bVal = b.amount;
      }

      // So sánh theo order (asc hoặc desc)
      if (order === 'asc') {
        // Tăng dần: a > b → 1, a < b → -1
        return aVal > bVal ? 1 : -1;
      } else {
        // Giảm dần: a < b → 1, a > b → -1
        return aVal < bVal ? 1 : -1;
      }
    });

    // Cập nhật filteredPayments và tính totalAmount
    dispatch({ type: 'SET_FILTERED_PAYMENTS', payload: filtered });
  };

  /**
   * Function: Thêm payment mới
   * 
   * LUỒNG XỬ LÝ:
   * 1. Gọi API addPayment() → tạo payment mới trên server
   * 2. Server trả về payment mới (có id)
   * 3. Check payment.userId === user.id
   * 4. Nếu đúng → dispatch ADD_PAYMENT → thêm vào state.payments
   * 5. useEffect 3 tự động gọi applyFilters() → cập nhật filteredPayments
   * 
   * @param {Object} paymentData - { userId, semester, courseName, amount, date }
   * @returns {Promise<Object>} { success: boolean, error?: string }
   */
  const addPayment = async (paymentData) => {
    try {
      const newPayment = await api.addPayment(paymentData);
      // Chỉ thêm vào state nếu payment thuộc về user hiện tại
      if (String(newPayment.userId) === String(user?.id)) {
        dispatch({ type: 'ADD_PAYMENT', payload: newPayment });
      }
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  /**
   * Function: Cập nhật payment
   * 
   * LUỒNG XỬ LÝ:
   * 1. Gọi API updatePayment() → cập nhật trên server
   * 2. Server trả về payment đã update
   * 3. Check payment.userId === user.id
   * 4. Nếu đúng → dispatch UPDATE_PAYMENT → cập nhật trong state.payments
   * 5. useEffect 3 tự động gọi applyFilters() → cập nhật filteredPayments
   * 
   * @param {string} id - ID của payment cần update
   * @param {Object} paymentData - Dữ liệu mới
   * @returns {Promise<Object>} { success: boolean, error?: string }
   */
  const updatePayment = async (id, paymentData) => {
    try {
      const updated = await api.updatePayment(id, paymentData);
      // Chỉ update nếu payment thuộc về user hiện tại
      if (String(updated.userId) === String(user?.id)) {
        dispatch({ type: 'UPDATE_PAYMENT', payload: updated });
      }
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  /**
   * Function: Xóa payment
   * 
   * LUỒNG XỬ LÝ:
   * 1. Gọi API deletePayment() → xóa trên server
   * 2. Nếu thành công → dispatch DELETE_PAYMENT → xóa khỏi state.payments
   * 3. useEffect 3 tự động gọi applyFilters() → cập nhật filteredPayments
   * 
   * @param {string} id - ID của payment cần xóa
   * @returns {Promise<Object>} { success: boolean, error?: string }
   */
  const deletePayment = async (id) => {
    try {
      await api.deletePayment(id);
      dispatch({ type: 'DELETE_PAYMENT', payload: id });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // ========== FILTER FUNCTIONS ==========
  // Các functions này cập nhật filters trong state
  // useEffect 3 sẽ tự động gọi applyFilters() khi filters thay đổi

  /**
   * Cập nhật search term (từ khóa tìm kiếm)
   * @param {string} term - Từ khóa tìm kiếm
   */
  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  /**
   * Cập nhật filter theo semester
   * @param {string} semester - Semester cần filter
   */
  const setSemesterFilter = (semester) => {
    dispatch({ type: 'SET_SEMESTER_FILTER', payload: semester });
  };

  /**
   * Cập nhật filter theo course
   * @param {string} course - Course cần filter
   */
  const setCourseFilter = (course) => {
    dispatch({ type: 'SET_COURSE_FILTER', payload: course });
  };

  /**
   * Cập nhật cách sắp xếp
   * @param {string} sortBy - Format: "field_order" (ví dụ: "course_asc", "date_desc")
   */
  const setSort = (sortBy) => {
    dispatch({ type: 'SET_SORT', payload: sortBy });
  };

  /**
   * Reset tất cả filters về mặc định
   */
  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  // ========== MODAL FUNCTIONS ==========
  // Các functions này quản lý state của modals (view/edit)

  /**
   * Mở modal xem chi tiết payment
   * @param {Object} payment - Payment cần xem
   */
  const openViewModal = (payment) => {
    dispatch({ type: 'OPEN_VIEW_MODAL', payload: payment });
  };

  /**
   * Đóng modal xem chi tiết
   */
  const closeViewModal = () => {
    dispatch({ type: 'CLOSE_VIEW_MODAL' });
  };

  /**
   * Mở modal sửa payment
   * @param {Object} payment - Payment cần sửa
   */
  const openEditModal = (payment) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: payment });
  };

  /**
   * Đóng modal sửa
   */
  const closeEditModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
  };

  /**
   * Context value: Tất cả data và functions được expose cho components
   * 
   * DATA:
   * - payments: filteredPayments (đã filter/sort) - dùng để hiển thị
   * - allPayments: payments gốc (chưa filter) - dùng để filter/edit
   * - loading, error: trạng thái loading và lỗi
   * - filters: các filter hiện tại
   * - totalAmount: tổng tiền của filteredPayments
   * - showViewModal, showEditModal: trạng thái modals
   * - selectedPayment: payment được chọn
   * 
   * FUNCTIONS:
   * - CRUD: fetchPayments, addPayment, updatePayment, deletePayment
   * - Filters: setSearchTerm, setSemesterFilter, setCourseFilter, setSort, resetFilters
   * - Modals: openViewModal, closeViewModal, openEditModal, closeEditModal
   */
  const contextValue = {
    payments: state.filteredPayments,      // Payments đã filter/sort (hiển thị trong UI)
    allPayments: state.payments,            // Payments gốc của user (dùng để filter/edit)
    loading: state.loading,                 // Đang loading
    error: state.error,                     // Lỗi nếu có
    filters: state.filters,                 // Filters hiện tại
    totalAmount: state.totalAmount,         // Tổng tiền
    showViewModal: state.showViewModal,     // Modal xem chi tiết
    showEditModal: state.showEditModal,     // Modal sửa
    selectedPayment: state.selectedPayment, // Payment được chọn
    // CRUD functions
    fetchPayments,
    addPayment,
    updatePayment,
    deletePayment,
    // Filter functions
    setSearchTerm,
    setSemesterFilter,
    setCourseFilter,
    setSort,
    resetFilters,
    // Modal functions
    openViewModal,
    closeViewModal,
    openEditModal,
    closeEditModal,
  };

  // Provider: Cung cấp context value cho tất cả children
  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

/**
 * Custom Hook: usePayments
 * 
 * MỤC ĐÍCH: Hook để components access PaymentContext
 * 
 * CÁCH SỬ DỤNG:
 * const { payments, addPayment, setSearchTerm } = usePayments();
 * 
 * LƯU Ý:
 * - Phải được gọi bên trong PaymentProvider
 * - Nếu gọi ngoài → throw error
 * 
 * @returns {Object} Context value từ PaymentProvider
 */
export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayments must be used within PaymentProvider');
  }
  return context;
};