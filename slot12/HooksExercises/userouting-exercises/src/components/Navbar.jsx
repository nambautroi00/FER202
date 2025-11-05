import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';

function Navbar() {
  return (
    <BSNavbar bg="primary" variant="dark" expand="lg" className="shadow">
      <Container>
        {/* Logo/Brand */}
        <BSNavbar.Brand as={NavLink} to="/" className="fw-bold">
          🚀 React Router App
        </BSNavbar.Brand>
        
        {/* Mobile toggle button */}
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Navigation links */}
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              🏠 Trang Chủ
            </Nav.Link>
            <Nav.Link as={NavLink} to="/san-pham">
              🛍️ Sản Phẩm
            </Nav.Link>
            <Nav.Link as={NavLink} to="/lien-he">
              📞 Liên Hệ
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
