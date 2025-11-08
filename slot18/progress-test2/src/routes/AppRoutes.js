import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddPaymentPage from '../pages/AddPaymentPage';
import EditPaymentPage from '../pages/EditPaymentPage';
import ViewDetailsPage from '../pages/ViewDetailsPage';
import UserListPage from '../pages/UserListPage';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (user?.role !== 'admin') {
    return <Navigate to="/home" />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment/add"
          element={
            <PrivateRoute>
              <AddPaymentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment/edit/:id"
          element={
            <PrivateRoute>
              <EditPaymentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment/:id"
          element={
            <PrivateRoute>
              <ViewDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AdminRoute>
              <UserListPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;