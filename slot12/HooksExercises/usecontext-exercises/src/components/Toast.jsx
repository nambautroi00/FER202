import React, { useEffect } from 'react';
import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap';
import './Toast.css';

const Toast = ({
  show,
  onClose,
  title,
  message,
  variant = 'info',
  delay = 5000,
  position = 'top-end',
  autohide = true
}) => {
  useEffect(() => {
    if (show && autohide) {
      const timer = setTimeout(() => {
        onClose();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [show, delay, autohide, onClose]);

  if (!show) return null;

  return (
    <ToastContainer 
      position={position} 
      className="p-3"
      style={{ zIndex: 9999 }}
    >
      <BootstrapToast
        show={show}
        onClose={onClose}
        bg={variant}
        autohide={autohide}
        delay={delay}
        style={{ minWidth: '300px' }}
      >
        <BootstrapToast.Header closeButton>
          <strong className="me-auto">{title}</strong>
        </BootstrapToast.Header>
        <BootstrapToast.Body className={variant === 'dark' ? 'text-white' : ''}>
          {message}
        </BootstrapToast.Body>
      </BootstrapToast>
    </ToastContainer>
  );
};

export default Toast;