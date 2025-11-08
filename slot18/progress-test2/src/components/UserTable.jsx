import React, { useState } from 'react';
import { Table, Card, Spinner, Alert, Button, Badge, Image } from 'react-bootstrap';
import { useUsers } from '../contexts/UserContext';
import ConfirmModal from './ConfirmModal';
import ViewUserDetailsModal from './ViewUserDetailsModal';

const UserTable = () => {
  const {
    users,
    loading,
    error,
    banUser,
    openViewModal,
  } = useUsers();

  const [showBanModal, setShowBanModal] = useState(false);
  const [userToBan, setUserToBan] = useState(null);

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

  const handleBanClick = (user) => {
    setUserToBan(user);
    setShowBanModal(true);
  };

  const handleConfirmBan = async () => {
    if (userToBan) {
      await banUser(userToBan.id);
      setShowBanModal(false);
      setUserToBan(null);
    }
  };

  // Hàm render avatar với fallback
  const renderAvatar = (user) => {
    if (user.avatar) {
      return (
        <Image
          src={user.avatar}
          alt={`${user.username} avatar`}
          roundedCircle
          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          onError={(e) => {
            // Fallback nếu ảnh không load được
            e.target.src = 'https://via.placeholder.com/40?text=' + user.username.charAt(0).toUpperCase();
          }}
        />
      );
    }
    // Nếu không có avatar, hiển thị placeholder với chữ cái đầu
    return (
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#6c757d',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        {user.username.charAt(0).toUpperCase()}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <Card className="shadow-sm">
        <Card.Header as="h5">User List</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>               
                <th>ID</th>
                <th>Avatar</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>              
                    <td>{user.id}</td>
                    <td className="text-center">{renderAvatar(user)}</td>
                    <td>{user.username}</td>
                    <td>{user.fullName}</td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>{getStatusBadge(user.status)}</td>
                    <td>
                      <div className="d-flex gap-2">    
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => openViewModal(user)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant={user.status === 'active' ? 'danger' : 'success'}
                          size="sm"
                          onClick={() => handleBanClick(user)}
                        >
                          {user.status === 'active' ? 'Ban Account' : 'Unban Account'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <ViewUserDetailsModal />

      <ConfirmModal
        show={showBanModal}
        title={userToBan?.status === 'active' ? 'Ban Account' : 'Unban Account'}
        message={`Are you sure you want to ${
          userToBan?.status === 'active' ? 'ban' : 'unban'
        } account "${userToBan?.username}"?`}
        onConfirm={handleConfirmBan}
        onHide={() => {
          setShowBanModal(false);
          setUserToBan(null);
        }}
      />
    </>
  );
};

export default UserTable;