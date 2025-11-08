import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext'; // Thêm import useAuth

const PaymentContext = createContext();

const initialPaymentState = {
  payments: [],
  filteredPayments: [],
  loading: false,
  error: null,
  filters: {
    searchTerm: '',
    semester: '',
    course: '',
    sortBy: 'course_asc',
  },
  totalAmount: 0,
  currentUserId: null,
  // State cho modals
  showViewModal: false,
  showEditModal: false,
  selectedPayment: null,
};

const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_PAYMENTS':
      return { ...state, payments: action.payload, loading: false };
    case 'SET_FILTERED_PAYMENTS':
      return {
        ...state,
        filteredPayments: action.payload,
        totalAmount: action.payload.reduce((sum, p) => sum + p.amount, 0),
      };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_USER_ID':
      return { ...state, currentUserId: action.payload };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        filters: { ...state.filters, searchTerm: action.payload },
      };
    case 'SET_SEMESTER_FILTER':
      return {
        ...state,
        filters: { ...state.filters, semester: action.payload },
      };
    case 'SET_COURSE_FILTER':
      return {
        ...state,
        filters: { ...state.filters, course: action.payload },
      };
    case 'SET_SORT':
      return {
        ...state,
        filters: { ...state.filters, sortBy: action.payload },
      };
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
    case 'ADD_PAYMENT':
      return {
        ...state,
        payments: [...state.payments, action.payload],
      };
    case 'UPDATE_PAYMENT':
      return {
        ...state,
        payments: state.payments.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PAYMENT':
      return {
        ...state,
        payments: state.payments.filter((p) => p.id !== action.payload),
      };
    case 'OPEN_VIEW_MODAL':
      return {
        ...state,
        showViewModal: true,
        selectedPayment: action.payload,
      };
    case 'CLOSE_VIEW_MODAL':
      return {
        ...state,
        showViewModal: false,
        selectedPayment: null,
      };
    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        showEditModal: true,
        selectedPayment: action.payload,
      };
    case 'CLOSE_EDIT_MODAL':
      return {
        ...state,
        showEditModal: false,
        selectedPayment: null,
      };
    default:
      return state;
  }
};

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);
  const { user } = useAuth(); // Lấy user từ AuthContext

  // Cập nhật userId khi user thay đổi
  useEffect(() => {
    if (user?.id) {
      dispatch({ type: 'SET_USER_ID', payload: user.id });
    }
  }, [user]);

  // Fetch payments khi component mount hoặc userId thay đổi
  useEffect(() => {
    if (user?.id) {
      fetchPayments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Áp dụng filters khi payments, filters hoặc userId thay đổi
  useEffect(() => {
    if (user?.id && state.payments.length >= 0) {
      applyFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.payments, state.filters, state.currentUserId]);

  const fetchPayments = async () => {
    if (!user?.id) return;
    
    dispatch({ type: 'SET_LOADING' });
    try {
      // Lấy tất cả payments từ API
      const allPayments = await api.getPayments();
      
      // Filter payments theo userId của user hiện tại (so sánh string để đảm bảo đúng)
      const userPayments = allPayments.filter(p => String(p.userId) === String(user.id));
      
      dispatch({ type: 'SET_PAYMENTS', payload: userPayments });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const applyFilters = () => {
    // Bắt đầu với payments của user hiện tại (đã được filter trong fetchPayments)
    // Nhưng filter lại để đảm bảo khi user thay đổi
    let filtered = [...state.payments].filter(
      p => String(p.userId) === String(state.currentUserId)
    );

    // Search filter
    if (state.filters.searchTerm) {
      const search = state.filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.semester.toLowerCase().includes(search) ||
          p.courseName.toLowerCase().includes(search)
      );
    }

    // Semester filter
    if (state.filters.semester) {
      filtered = filtered.filter((p) => p.semester === state.filters.semester);
    }

    // Course filter
    if (state.filters.course) {
      filtered = filtered.filter((p) => p.courseName === state.filters.course);
    }

    // Sort
    const [field, order] = state.filters.sortBy.split('_');
    filtered.sort((a, b) => {
      let aVal, bVal;
      if (field === 'course') {
        aVal = a.courseName;
        bVal = b.courseName;
      } else if (field === 'date') {
        aVal = new Date(a.date);
        bVal = new Date(b.date);
      } else if (field === 'amount') {
        aVal = a.amount;
        bVal = b.amount;
      }

      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    dispatch({ type: 'SET_FILTERED_PAYMENTS', payload: filtered });
  };

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

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const setSemesterFilter = (semester) => {
    dispatch({ type: 'SET_SEMESTER_FILTER', payload: semester });
  };

  const setCourseFilter = (course) => {
    dispatch({ type: 'SET_COURSE_FILTER', payload: course });
  };

  const setSort = (sortBy) => {
    dispatch({ type: 'SET_SORT', payload: sortBy });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const openViewModal = (payment) => {
    dispatch({ type: 'OPEN_VIEW_MODAL', payload: payment });
  };

  const closeViewModal = () => {
    dispatch({ type: 'CLOSE_VIEW_MODAL' });
  };

  const openEditModal = (payment) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: payment });
  };

  const closeEditModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
  };

  const contextValue = {
    payments: state.filteredPayments,
    allPayments: state.payments, // Payments của user hiện tại
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    totalAmount: state.totalAmount,
    showViewModal: state.showViewModal,
    showEditModal: state.showEditModal,
    selectedPayment: state.selectedPayment,
    fetchPayments,
    addPayment,
    updatePayment,
    deletePayment,
    setSearchTerm,
    setSemesterFilter,
    setCourseFilter,
    setSort,
    resetFilters,
    openViewModal,
    closeViewModal,
    openEditModal,
    closeEditModal,
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayments must be used within PaymentProvider');
  }
  return context;
};