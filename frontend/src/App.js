import React, { useState } from 'react';
import Web3 from 'web3';
import './App.css';


const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [yieldToken, setYieldToken] = useState(null);
  const [yieldFarm, setYieldFarm] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [pendingRewards, setPendingRewards] = useState(0);

  // YIELD Token ABI
  const yieldTokenABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  // SimpleYieldFarm ABI
  const yieldFarmABI = [
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "_stakingToken",
          "type": "address"
        },
        {
          "internalType": "contract IERC20",
          "name": "_rewardToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_rewardPerSecond",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Harvest",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "accRewardPerShare",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "emergencyWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "harvest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastRewardTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "pendingReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardPerSecond",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_rewardPerSecond",
          "type": "uint256"
        }
      ],
      "name": "setRewardPerSecond",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stakingToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalStaked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rewardDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastDepositTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const connectWallet = async () => {
    try {
      setLoading(true);
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const networkId = await web3Instance.eth.net.getId();
        console.log('Connected to network ID:', networkId);
        
        if (networkId !== 31) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x1F' }],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    chainId: '0x1F',
                    chainName: 'Rootstock Testnet',
                    nativeCurrency: {
                      name: 'tRBTC',
                      symbol: 'tRBTC',
                      decimals: 18
                    },
                    rpcUrls: ['https://public-node.testnet.rsk.co'],
                    blockExplorerUrls: ['https://explorer.testnet.rsk.co']
                  }]
                });
              } catch (addError) {
                setError('Failed to add Rootstock Testnet to MetaMask');
                return;
              }
            } else {
              setError('Failed to switch to Rootstock Testnet');
              return;
            }
          }
        }
        
        const accs = await web3Instance.eth.getAccounts();
        
        setWeb3(web3Instance);
        setAccounts(accs);
        setIsConnected(true);
        setError('');

        const yieldTokenAddress = '0xFdE7918866801491099881a7c65E1fEE9f311B9c';
        const yieldFarmAddress = '0x12B515526CD071F6a096fE2642f713A78334c3B0';

        const yieldTokenContract = new web3Instance.eth.Contract(yieldTokenABI, yieldTokenAddress);
        const yieldFarmContract = new web3Instance.eth.Contract(yieldFarmABI, yieldFarmAddress);
        
        setYieldToken(yieldTokenContract);
        setYieldFarm(yieldFarmContract);

        const balance = await yieldTokenContract.methods.balanceOf(accs[0]).call();
        setBalance(web3Instance.utils.fromWei(balance, 'ether'));

        // Get staked amount and pending rewards
        const userInfo = await yieldFarmContract.methods.userInfo(accs[0]).call();
        setStakedAmount(web3Instance.utils.fromWei(userInfo.amount, 'ether'));
        
        const rewards = await yieldFarmContract.methods.pendingReward(accs[0]).call();
        setPendingRewards(web3Instance.utils.fromWei(rewards, 'ether'));
      } else {
        setError('Please install MetaMask!');
      }
    } catch (err) {
      console.error('Connection error:', err);
      setError('Error connecting to wallet: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
    setAccounts([]);
    setYieldToken(null);
    setYieldFarm(null);
    setBalance(0);
    setStakedAmount(0);
    setPendingRewards(0);
    setIsConnected(false);
  };

  const mintTokens = async () => {
    try {
      setLoading(true);
      if (yieldToken) {
        const gasPrice = await web3.eth.getGasPrice();
        await yieldToken.methods.mint(accounts[0], web3.utils.toWei('10000', 'ether')).send({ 
          from: accounts[0],
          gas: 200000,
          gasPrice: gasPrice
        });
        const newBalance = await yieldToken.methods.balanceOf(accounts[0]).call();
        setBalance(web3.utils.fromWei(newBalance, 'ether'));
        setError('');
      }
    } catch (err) {
      setError('Error minting tokens: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const stakeTokens = async () => {
    try {
      setLoading(true);
      if (yieldToken && yieldFarm) {
        const amount = web3.utils.toWei('1000', 'ether');
        
        // First approve the farm to spend tokens
        const gasPrice = await web3.eth.getGasPrice();
        await yieldToken.methods.approve(yieldFarm._address, amount).send({
          from: accounts[0],
          gas: 100000,
          gasPrice: gasPrice
        });

        // Then stake the tokens
        await yieldFarm.methods.deposit(amount).send({
          from: accounts[0],
          gas: 200000,
          gasPrice: gasPrice
        });

        // Update balances
        const newBalance = await yieldToken.methods.balanceOf(accounts[0]).call();
        setBalance(web3.utils.fromWei(newBalance, 'ether'));

        const userInfo = await yieldFarm.methods.userInfo(accounts[0]).call();
        setStakedAmount(web3.utils.fromWei(userInfo.amount, 'ether'));
        
        setError('');
      }
    } catch (err) {
      setError('Error staking tokens: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const harvestRewards = async () => {
    try {
      setLoading(true);
      if (yieldFarm) {
        // Check pending rewards first
        const pendingReward = await yieldFarm.methods.pendingReward(accounts[0]).call();
        const pendingRewardInEther = web3.utils.fromWei(pendingReward, 'ether');
        
        if (parseFloat(pendingRewardInEther) <= 0) {
          setError('No rewards available to harvest');
          return;
        }

        const gasPrice = await web3.eth.getGasPrice();
        await yieldFarm.methods.harvest().send({
          from: accounts[0],
          gas: 200000,
          gasPrice: gasPrice
        });

        // Update pending rewards after successful harvest
        const newPendingRewards = await yieldFarm.methods.pendingReward(accounts[0]).call();
        setPendingRewards(web3.utils.fromWei(newPendingRewards, 'ether'));
        
        setError('');
      }
    } catch (err) {
      setError('Error harvesting rewards: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>YIELD Token Farm</h1>
          {!isConnected ? (
            <button 
              onClick={connectWallet} 
              className="connect-button"
              disabled={loading}
            >
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <button 
              onClick={disconnectWallet} 
              className="disconnect-button"
              disabled={loading}
            >
              Disconnect Wallet
            </button>
          )}
        </header>

        {isConnected && (
          <div className="dashboard">
            <div className="account-info">
              <h2>Account Information</h2>
              <p className="address">Connected Account: {accounts[0]}</p>
              <div className="balance-card">
                <h3>YIELD Balance</h3>
                <p className="balance">{parseFloat(balance).toFixed(2)} YIELD</p>
              </div>
            </div>

            <div className="farming-info">
              <h2>Farming Information</h2>
              <div className="info-card">
                <h3>Staked Amount</h3>
                <p className="amount">{parseFloat(stakedAmount).toFixed(2)} YIELD</p>
              </div>
              <div className="info-card">
                <h3>Pending Rewards</h3>
                <p className="amount">{parseFloat(pendingRewards).toFixed(2)} YIELD</p>
              </div>
            </div>

            <div className="actions">
              <h2>Actions</h2>
              <div className="button-grid">
                <button 
                  onClick={mintTokens} 
                  className="action-button"
                  disabled={loading}
                >
                  {loading ? 'Minting...' : 'Mint 10,000 YIELD'}
                </button>
                <button 
                  onClick={stakeTokens} 
                  className="action-button"
                  disabled={loading}
                >
                  {loading ? 'Staking...' : 'Stake 1,000 YIELD'}
                </button>
                <button 
                  onClick={harvestRewards} 
                  className="action-button"
                  disabled={loading}
                >
                  {loading ? 'Harvesting...' : 'Harvest Rewards'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
