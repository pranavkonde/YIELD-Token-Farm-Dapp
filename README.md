# YIELD Token Farm - DeFi Staking Platform

A decentralized finance (DeFi) application built on the Rootstock (RSK) Testnet that allows users to stake YIELD tokens and earn rewards. This project implements a complete yield farming system with token minting, staking, and reward distribution mechanisms.

![Image](https://github.com/user-attachments/assets/1725e126-725c-4745-aabd-ecbd12aff8e9)

![Image](https://github.com/user-attachments/assets/45233878-8d04-4757-a41d-ee20b462e36d)


## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/YIELD-Token-Farm-Dapp.git
cd YIELD-Token-Farm-Dapp
```

2. Install dependencies:
```bash
npm ci
```

3. Set up environment variables:
```bash
cp .env.sample .env
```
Then edit `.env` file with your:
- `PRIVATE_KEY`: Your wallet private key
- `ROOTSTOCK_TESTNET_RPC`: Rootstock testnet RPC URL

4. Deploy smart contracts:
```bash
npx hardhat run scripts/deploy.js --network rootstock_testnet
```

5. Start the frontend application:
```bash
cd frontend
npm ci
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
PRIVATE_KEY=your_wallet_private_key
ROOTSTOCK_TESTNET_RPC=your_rootstock_testnet_rpc_url
```

## Project Structure

- `contracts/`: Smart contract source files
- `frontend/`: React frontend application
- `scripts/`: Deployment and other utility scripts
- `test/`: Smart contract test files
## 🌟 Features

- **Token Management**
  - Mint YIELD tokens
  - View token balances
  - Transfer tokens
  - ERC20 standard compliance

- **Staking System**
  - Stake YIELD tokens
  - View staked amounts
  - Track pending rewards
  - Harvest rewards

- **User Interface**
  - Modern, responsive design
  - Real-time balance updates
  - Transaction status feedback
  - MetaMask integration

## 🏗 Architecture

### Smart Contracts

1. **YIELD Token (ERC20)**
   - Standard ERC20 implementation
   - Minting functionality
   - Transfer and approval mechanisms
   - 18 decimal places precision

2. **Yield Farm**
   - Staking pool management
   - Reward distribution algorithm
   - User position tracking
   - Emergency withdrawal functionality

### Frontend

- React-based single-page application
- Web3.js for blockchain interaction
- MetaMask wallet integration
- Responsive UI with modern design

## 🔄 Workflow

1. **Token Minting**
   ```mermaid
   graph LR
   A[User] -->|Request Mint| B[YIELD Token Contract]
   B -->|Mint Tokens| C[User's Wallet]
   ```

2. **Staking Process**
   ```mermaid
   graph LR
   A[User] -->|Approve| B[YIELD Token Contract]
   B -->|Transfer| C[Farm Contract]
   C -->|Stake| D[Staking Pool]
   ```

3. **Reward Distribution**
   ```mermaid
   graph LR
   A[Farm Contract] -->|Calculate Rewards| B[Reward Pool]
   B -->|Distribute| C[User's Wallet]
   ```

## 💻 Technical Implementation

### Smart Contract Standards

- **ERC20 Standard**
  - `transfer(address to, uint256 amount)`
  - `approve(address spender, uint256 amount)`
  - `transferFrom(address from, address to, uint256 amount)`
  - `balanceOf(address account)`

- **Yield Farm Contract**
  - `deposit(uint256 amount)`
  - `withdraw(uint256 amount)`
  - `harvest()`
  - `pendingReward(address user)`

### Reward Algorithm

The reward distribution follows a time-based algorithm:

```solidity
rewards = (user.amount * accRewardPerShare) - user.rewardDebt
```

Where:
- `user.amount`: Amount of tokens staked by user
- `accRewardPerShare`: Accumulated rewards per share
- `user.rewardDebt`: User's reward debt

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MetaMask wallet
- RSK Testnet configured in MetaMask

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd yield-token-farm
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. Configure environment:
   - Add RSK Testnet to MetaMask
   - Ensure you have test RBTC for gas fees

### Running the Application

1. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

2. Access the application:
   - Open http://localhost:3000
   - Connect your MetaMask wallet
   - Ensure you're on RSK Testnet

## 🔒 Security Features

- Reentrancy protection
- Access control for minting
- Safe math operations
- Emergency withdrawal functionality
- Rate limiting for minting

## 📊 Contract Addresses (RSK Testnet)

- YIELD Token: `0xFdE7918866801491099881a7c65E1fEE9f311B9c`
- Yield Farm: `0x12B515526CD071F6a096fE2642f713A78334c3B0`

## 🛠 Development

### Testing

```bash
# Run smart contract tests
npx hardhat test

# Run frontend tests
cd frontend
npm test
```

### Deployment

1. Configure network in `hardhat.config.js`
2. Set up environment variables
3. Run deployment script:
   ```bash
   npx hardhat run scripts/deploy.js --network rskTestnet
   ```

## 🔍 Detailed Functionality & Algorithms

### Smart Contract Functions

#### YIELD Token Contract
```solidity
// Core ERC20 Functions
function mint(address to, uint256 amount) external
function transfer(address to, uint256 amount) external returns (bool)
function approve(address spender, uint256 amount) external returns (bool)
function transferFrom(address from, address to, uint256 amount) external returns (bool)
function balanceOf(address account) external view returns (uint256)

// Additional Functions
function allowance(address owner, address spender) external view returns (uint256)
function increaseAllowance(address spender, uint256 addedValue) external returns (bool)
function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool)
```

#### Yield Farm Contract
```solidity
// Staking Functions
function deposit(uint256 amount) external
function withdraw(uint256 amount) external
function emergencyWithdraw() external

// Reward Functions
function harvest() external
function pendingReward(address user) external view returns (uint256)

// View Functions
function userInfo(address user) external view returns (uint256 amount, uint256 rewardDebt, uint256 lastDepositTime)
function totalStaked() external view returns (uint256)
function rewardPerSecond() external view returns (uint256)
```

### Core Algorithms

#### 1. Reward Calculation Algorithm
```solidity
// Time-based reward calculation
function calculateRewards(uint256 userAmount, uint256 accRewardPerShare, uint256 userRewardDebt) internal pure returns (uint256) {
    return (userAmount * accRewardPerShare) - userRewardDebt;
}

// Reward per share update
function updateRewardPerShare() internal {
    if (totalStaked == 0) return;
    
    uint256 timeElapsed = block.timestamp - lastRewardTime;
    uint256 reward = timeElapsed * rewardPerSecond;
    accRewardPerShare = accRewardPerShare + (reward * PRECISION_FACTOR / totalStaked);
}
```

#### 2. Staking Position Management
```solidity
// User position update
function updateUserPosition(address user, uint256 amount, bool isDeposit) internal {
    UserInfo storage user = userInfo[user];
    
    // Update reward debt
    user.rewardDebt = user.amount * accRewardPerShare / PRECISION_FACTOR;
    
    // Update user amount
    if (isDeposit) {
        user.amount += amount;
        totalStaked += amount;
    } else {
        user.amount -= amount;
        totalStaked -= amount;
    }
}
```

### Frontend Functions


#### 2. Token Operations
```javascript
async function mintTokens() {
    const amount = web3.utils.toWei('10000', 'ether');
    await yieldToken.methods.mint(accounts[0], amount).send({
        from: accounts[0],
        gas: 200000
    });
}

async function stakeTokens() {
    const amount = web3.utils.toWei('1000', 'ether');
    // Approve farm to spend tokens
    await yieldToken.methods.approve(farmAddress, amount).send({
        from: accounts[0],
        gas: 100000
    });
    // Stake tokens
    await yieldFarm.methods.deposit(amount).send({
        from: accounts[0],
        gas: 200000
    });
}
```

#### 3. Reward Management
```javascript
async function harvestRewards() {
    // Check pending rewards
    const pendingReward = await yieldFarm.methods.pendingReward(accounts[0]).call();
    if (parseFloat(web3.utils.fromWei(pendingReward, 'ether')) <= 0) {
        throw new Error('No rewards available to harvest');
    }
    
    // Harvest rewards
    await yieldFarm.methods.harvest().send({
        from: accounts[0],
        gas: 200000
    });
}
```

### State Management

#### 1. User State
```javascript
const [web3, setWeb3] = useState(null);
const [accounts, setAccounts] = useState([]);
const [balance, setBalance] = useState(0);
const [stakedAmount, setStakedAmount] = useState(0);
const [pendingRewards, setPendingRewards] = useState(0);
```

#### 2. Contract State
```javascript
const [yieldToken, setYieldToken] = useState(null);
const [yieldFarm, setYieldFarm] = useState(null);
const [isConnected, setIsConnected] = useState(false);
```

### Key Algorithms Explained

1. **Reward Distribution Algorithm**
   - Uses a time-weighted reward calculation
   - Rewards are distributed based on:
     - Amount staked
     - Time staked
     - Total pool size
   - Formula: `rewards = (user.amount * accRewardPerShare) - user.rewardDebt`

2. **Staking Position Algorithm**
   - Tracks user positions using a struct
   - Updates reward debt on each interaction
   - Maintains total staked amount
   - Handles emergency withdrawals

3. **Token Approval Flow**
   - Two-step process for staking:
     1. Approve farm contract to spend tokens
     2. Deposit approved tokens into farm
   - Uses ERC20 approval mechanism
   - Includes allowance checks

4. **Network Management**
   - Automatic network detection
   - RSK Testnet configuration
   - Network switching capability
   - Error handling for network issues

## 📚 Theoretical Framework

### 1. Yield Farming Algorithm Theory

#### Time-Weighted Reward Distribution
The yield farming system implements a time-weighted reward distribution mechanism that ensures fair and proportional distribution of rewards based on:
- **Staking Duration**: Longer staking periods receive proportionally more rewards
- **Staking Amount**: Larger stakes receive proportionally more rewards
- **Total Pool Size**: Rewards are distributed relative to the total staked amount

The mathematical model follows:
```
Reward = (User's Stake / Total Pool) × (Reward Rate × Time)
```
