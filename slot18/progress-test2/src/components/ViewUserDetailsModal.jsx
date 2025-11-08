import React from 'react';
import { Modal, Table, Image, Badge } from 'react-bootstrap';
import { useUsers } from '../contexts/UserContext';

const ViewUserDetailsModal = () => {
  const { showViewModal, selectedUser, closeViewModal } = useUsers();

  if (!selectedUser) return null;

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      blocked: 'danger',
      locked: 'warning',
    };
    return (
      <Badge bg={variants[status] || 'secondary'}>
        {status}
      </Badge>
    );
  };

  const getRoleBadge = (role) => {
    return (
      <Badge bg={role === 'admin' ? 'primary' : 'info'}>
        {role}
      </Badge>
    );
  };

  const renderAvatar = () => {
    if (selectedUser.avatar) {
      return (
        <div className="d-flex align-items-center gap-3">
          <Image
            src={selectedUser.avatar}
            alt={`${selectedUser.username} avatar`}
            roundedCircle
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            onError={(e) => {
              // Fallback nếu ảnh không load được
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#6c757d',
              color: 'white',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '32px',
            }}
          >
            {selectedUser.username.charAt(0).toUpperCase()}
          </div>
        </div>
      );
    }
    // Nếu không có avatar, hiển thị placeholder
    return (
      <div  
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#6c757d',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '32px',
        }}
      >
        {selectedUser.username.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <Modal show={showViewModal} onHide={closeViewModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered>
          <tbody>
            <tr>
              <th style={{ width: '30%' }}>ID</th>
              <td>{selectedUser.id}</td>
            </tr>
            <tr>
              <th>Avatar</th>
              <td>{renderAvatar()}</td>
            </tr>
            <tr>
              <th>Username</th>
              <td>{selectedUser.username}</td>
            </tr>
            <tr>
              <th>Full Name</th>
              <td>{selectedUser.fullName}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{getRoleBadge(selectedUser.role)}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{getStatusBadge(selectedUser.status)}</td>
            </tr>  
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default ViewUserDetailsModal;