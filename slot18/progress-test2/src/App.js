import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { UserProvider } from './contexts/UserContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <PaymentProvider>
          <AppRoutes />
        </PaymentProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;