import React, { useEffect, useState } from "react";
import Web3 from "web3";
import DeFiNavbar from "./Navbar"; // Import Navbar component
import Tether from "./truffle_abis/Tether.json";
import RWD from "./truffle_abis/RWD.json";
import DecentralBank from "./truffle_abis/DecentralBank.json";

function App() {
  const [account, setAccount] = useState("");

  const [defiData, setDefiData] = useState({
    tether: {},
    rwd: {},
    decentralBank: {},
    tetherBalance: "0",
    rwdBalance: "0",
    stakingBalance: "0",
    loading: true,
  });

  const loadBlockChainData = async () => {
    try {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();

      // Load Tether Contract
      const tetherData = Tether.networks[networkId];
      if (tetherData) {
        const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
        // Fetch Tether balance
        const tetherBalance = await tether.methods
          .balanceOf(accounts[0])
          .call();

        // Update defiData
        setDefiData((prevData) => ({
          ...prevData,
          tether,
          tetherBalance: tetherBalance,
          loading: false,
        }));
      } else {
        alert("Tether contract not deployed on the detected network.");
        setDefiData((prevData) => ({ ...prevData, loading: false }));
      }

      // Load RWD Contract
      const rwdData = RWD.networks[networkId];
      if (rwdData) {
        const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
        console.log({rwd: rwdData.address})
        // Fetch Rwd balance
        const rwdBalance = await rwd.methods.balanceOf(accounts[0]).call();

        // Update defiData
        setDefiData((prevData) => ({
          ...prevData,
          rwd,
          rwdBalance: rwdBalance,
          loading: false,
        }));
      } else {
        alert("Rwd contract not deployed on the detected network.");
        setDefiData((prevData) => ({ ...prevData, loading: false }));
      }

      // Load DecentralBank Contract
      const decentralBankData = DecentralBank.networks[networkId];
      if (decentralBankData) {
        const decentralBank = new web3.eth.Contract(
          DecentralBank.abi,
          decentralBankData.address
        );

        console.log({dec:decentralBankData.address})
        // Fetch Rwd balance
        const stakingBalance = await decentralBank.methods
          .stakingBalance(accounts[0])
          .call();

        // Update defiData
        setDefiData((prevData) => ({
          ...prevData,
          decentralBank,
          stakingBalance: stakingBalance,
          loading: false,
        }));
      } else {
        alert("DecentralBank contract not deployed on the detected network.");
        setDefiData((prevData) => ({ ...prevData, loading: false }));
      }
    } catch (error) {
      console.error("Error loading blockchain data:", error.message);
      alert("Failed to load blockchain data. Please try again.");
      setDefiData((prevData) => ({ ...prevData, loading: false }));
    }
  };

  const loadWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        const accounts = await window.web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        alert("No Ethereum browser detected. Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error loading Web3:", error.message);
      alert("Failed to connect to Ethereum. Please try again.");
    }
  };

  useEffect(() => {
    loadWeb3();
    loadBlockChainData();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <DeFiNavbar account={account} onConnect={loadWeb3} />

      <div className="container mt-4">
        <h1>Welcome to the DeFi Web3 App</h1>
        {account ? (
          <p>Connected Account: {account}</p>
        ) : (
          <p>Please connect your wallet to interact with the app.</p>
        )}

        {defiData.loading ? (
          <p>Loading blockchain data...</p>
        ) : (
          <div>
            <h3>Account Balances</h3>
            <p>
              Tether Balance:{" "}
              {Web3.utils.fromWei(defiData.tetherBalance, "ether")} ETH
            </p>
            <p>
              RWD Balance: {Web3.utils.fromWei(defiData.rwdBalance, "ether")}{" "}
              ETH
            </p>
            <p>
              Staking Balance:{" "}
              {Web3.utils.fromWei(defiData.stakingBalance, "ether")} ETH
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
