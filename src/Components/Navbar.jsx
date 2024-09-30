import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const Navbar = ({ isAuthenticated, handleSignOut }) => {
  return (
    <Nav>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        {isAuthenticated && (
          <Link to="/user-registrations" style={{ color: 'white', textDecoration: 'none', paddingLeft: '30px' }}>Registrations</Link>
        )}
        {isAuthenticated && (
          <Link to="/add-event" style={{ color: 'white', textDecoration: 'none', paddingLeft: '30px' }}>Add Event</Link>
        )}
      </div>
      <NavLinks>
        {isAuthenticated ? (
          <button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: 'white' }}>Sign Out</button>
        ) : (
          <Link to="/signin" style={{ color: 'white', textDecoration: 'none' }}>Sign In</Link>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
