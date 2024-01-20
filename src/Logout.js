import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/login');
    setShowModal(false);
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleLogout} style={{alignItems:'center',justifyContent:'center',margin:'200px 300px 400px '}}>Logout</button>

      <Modal show={showModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            No
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutButton;
