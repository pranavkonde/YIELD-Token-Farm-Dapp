const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy YIELD token
  const YieldToken = await ethers.getContractFactory("YieldToken");
  const yieldToken = await YieldToken.deploy();
  // await yieldToken.deployed();
  console.log("YIELD Token deployed to:", yieldToken.target);

  // Deploy staking contract
  const SimpleYieldFarm = await ethers.getContractFactory("SimpleYieldFarm");
  const rewardPerSecond = ethers.parseEther("0.1"); // 0.1 YIELD per second
  
  const yieldFarm = await SimpleYieldFarm.deploy(
    yieldToken.target, // staking token
    yieldToken.target, // reward token (same for simplicity)
    rewardPerSecond
  );
  // await yieldFarm.deployed();
  console.log("SimpleYieldFarm deployed to:", yieldFarm.target);

  // Transfer some tokens to the farm for rewards
  const rewardAmount = ethers.parseEther("100000");
  await yieldToken.transfer(yieldFarm.target, rewardAmount);
  console.log("Transferred", ethers.formatEther(rewardAmount), "YIELD to farm");

  // Mint some tokens to deployer for testing
  const mintAmount = ethers.parseEther("10000");
  await yieldToken.mint(deployer.address, mintAmount);
  console.log("Minted", ethers.formatEther(mintAmount), "YIELD for testing");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });