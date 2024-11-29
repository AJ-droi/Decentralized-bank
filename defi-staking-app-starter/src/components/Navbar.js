import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';

const DeFiNavbar = () => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Logo/Brand */}
        <Navbar.Brand href="/">DeFi App</Navbar.Brand>
        
        {/* Toggle for Mobile View */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/staking">Staking</Nav.Link>
            <Nav.Link href="/swap">Swap</Nav.Link>
            <Nav.Link href="/portfolio">Portfolio</Nav.Link>
          </Nav>

          {/* User Profile and Wallet */}
          <Nav>
            <NavDropdown title="Account" id="account-dropdown" align="end">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
            <Button variant="outline-light" className="ms-2">
              Connect Wallet
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DeFiNavbar;
