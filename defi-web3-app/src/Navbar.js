import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';

const DeFiNavbar = ({ account, onConnect }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">DeFi Web3 App</Navbar.Brand>
        <Button onClick={onConnect} variant="outline-light">
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
        </Button>
      </Container>
    </Navbar>
  );
};

export default DeFiNavbar;
