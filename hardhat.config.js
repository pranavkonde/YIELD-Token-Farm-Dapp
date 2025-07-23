require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

if (!process.env.PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

if (!process.env.ROOTSTOCK_TESTNET_RPC) {
  throw new Error("Please set your ROOTSTOCK_TESTNET_RPC in a .env file");
}

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    rootstock_testnet: {
      url: process.env.ROOTSTOCK_TESTNET_RPC || "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: [process.env.PRIVATE_KEY],
      gasMultiplier: 1.25
    }
  }
};