import React, { useEffect, useState } from 'react';
import DeFiNavbar from './Navbar';
import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState('');

  const loadWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        const accounts = await window.web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        alert('No Ethereum browser detected. Consider installing MetaMask!');
      }
    } catch (error) {
      console.error('Error loading Web3:', error.message);
      alert('Failed to connect to Ethereum. Please try again.');
    }
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <div>
      <DeFiNavbar />
      <div className="container mt-4">
        <h1>Welcome to the DeFi App</h1>
        {account ? (
          <p>Connected Account: {account}</p>
        ) : (
          <button className="btn btn-primary" onClick={loadWeb3}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

