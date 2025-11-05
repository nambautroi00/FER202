import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      {/* Navigation bar - hiển thị trên tất cả các trang */}
      <Navbar />
      
      {/* Main content area */}
      <main>
        <Routes>
          {/* Route cơ bản */}
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />
          
          {/* Route 404 - Không tìm thấy trang */}
          <Route path="*" element={
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                  <div className="card shadow">
                    <div className="card-body">
                      <h1 className="display-1">😵</h1>
                      <h2 className="card-title">404 - Không tìm thấy trang</h2>
                      <p className="card-text">
                        Trang bạn đang tìm kiếm không tồn tại.
                      </p>
                      <a href="/" className="btn btn-primary btn-lg">
                        Về trang chủ
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
