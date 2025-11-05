import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthDispatch } from './contexts/AuthContext';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import MovieManager from './pages/MovieManager';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Component để khởi tạo auth check
const AppContent = () => {
  const { checkAuth } = useAuthDispatch();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/movies" 
          element={
            <ProtectedRoute>
              <MovieManager />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/movies" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
