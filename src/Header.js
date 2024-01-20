import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { useAuth } from './AuthContext';

function Header({ openSidebar }) {
  const { user } = useAuth();

  return (
    <header className='header'>
      <div className='menu-icon' onClick={openSidebar}>
        <CgProfile style={{ fontSize: '40px' }} />
      </div>
      <div className='header-left'>
        {user && user.isAuthenticated && (
          <span>Welcome, {user.username}!</span>
        )}
      </div>
   
    </header>
  );
}

export default Header;
