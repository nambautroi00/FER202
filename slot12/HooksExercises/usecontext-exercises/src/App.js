//áp dụng ThemeProvider và AuthProvider để bao bọc toàn bộ ứng dụng
import React from 'react';
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import LightSwitch from "./components/LightSwitch";
import CounterComponent from "./components/CounterComponent";
import LoginForm from "./components/LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12">
                <h1 className="text-center mb-4">useContext Hook Exercises</h1>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-6 mb-4">
                <CounterComponent />
              </div>
              <div className="col-lg-6 mb-4">
                <LightSwitch />
              </div>
            </div>
            
            <div className="row">
              <div className="col-12 mb-4">
                <h2 className="text-center mb-3">Exercise 2: AuthContext with LoginForm</h2>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
