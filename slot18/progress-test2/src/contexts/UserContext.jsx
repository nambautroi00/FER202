import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

const UserContext = createContext();

const initialUserState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  filters: {
    searchTerm: '',
    role: '',
    status: '',
    sortBy: 'username_asc',
  },
  showViewModal: false,
  selectedUser: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_USERS':
      return { ...state, users: action.payload, loading: false };
    case 'SET_FILTERED_USERS':
      return { ...state, filteredUsers: action.payload };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        filters: { ...state.filters, searchTerm: action.payload },
      };
    case 'SET_ROLE_FILTER':
      return {
        ...state,
        filters: { ...state.filters, role: action.payload },
      };
    case 'SET_STATUS_FILTER':
      return {
        ...state,
        filters: { ...state.filters, status: action.payload },
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
          role: '',
          status: '',
          sortBy: 'username_asc',
        },
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
      };
    case 'OPEN_VIEW_MODAL':
      return {
        ...state,
        showViewModal: true,
        selectedUser: action.payload,
      };
    case 'CLOSE_VIEW_MODAL':
      return {
        ...state,
        showViewModal: false,
        selectedUser: null,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [state.users, state.filters]);

  const fetchUsers = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const users = await api.getUsers();
      dispatch({ type: 'SET_USERS', payload: users });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const applyFilters = () => {
    let filtered = [...state.users];

    // Search filter
    if (state.filters.searchTerm) {
      const search = state.filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.username.toLowerCase().includes(search) ||
          u.fullName.toLowerCase().includes(search) ||
          (u.id && u.id.toString().includes(search))
      );
    }

    // Role filter
    if (state.filters.role) {
      filtered = filtered.filter((u) => u.role === state.filters.role);
    }

    // Status filter
    if (state.filters.status) {
      filtered = filtered.filter((u) => u.status === state.filters.status);
    }

    // Sort
    const [field, order] = state.filters.sortBy.split('_');
    filtered.sort((a, b) => {
      let aVal, bVal;
      if (field === 'username') {
        aVal = a.username;
        bVal = b.username;
      } else if (field === 'fullName') {
        aVal = a.fullName;
        bVal = b.fullName;
      } else if (field === 'role') {
        aVal = a.role;
        bVal = b.role;
      } else if (field === 'status') {
        aVal = a.status;
        bVal = b.status;
      }

      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    dispatch({ type: 'SET_FILTERED_USERS', payload: filtered });
  };

  const banUser = async (id) => {
    try {
      const user = state.users.find((u) => u.id === id);
      if (!user) throw new Error('User not found');

      const updatedUser = {
        ...user,
        status: user.status === 'active' ? 'blocked' : 'active',
      };

      const result = await api.updateUser(id, updatedUser);
      dispatch({ type: 'UPDATE_USER', payload: result });
      await fetchUsers(); // Refresh users
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const setRoleFilter = (role) => {
    dispatch({ type: 'SET_ROLE_FILTER', payload: role });
  };

  const setStatusFilter = (status) => {
    dispatch({ type: 'SET_STATUS_FILTER', payload: status });
  };

  const setSort = (sortBy) => {
    dispatch({ type: 'SET_SORT', payload: sortBy });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const openViewModal = (user) => {
    dispatch({ type: 'OPEN_VIEW_MODAL', payload: user });
  };

  const closeViewModal = () => {
    dispatch({ type: 'CLOSE_VIEW_MODAL' });
  };

  const contextValue = {
    users: state.filteredUsers,
    allUsers: state.users,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    showViewModal: state.showViewModal,
    selectedUser: state.selectedUser,
    fetchUsers,
    banUser,
    setSearchTerm,
    setRoleFilter,
    setStatusFilter,
    setSort,
    resetFilters,
    openViewModal,
    closeViewModal,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within UserProvider');
  }
  return context;
};