const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleYieldFarm", function () {
  async function deployYieldFarmFixture() {
    const [owner, staker] = await ethers.getSigners();

    // Deploy YieldToken
    const YieldToken = await ethers.getContractFactory("YieldToken");
    const yieldToken = await YieldToken.deploy();
    await yieldToken.waitForDeployment();

    // Deploy SimpleYieldFarm
    const SimpleYieldFarm = await ethers.getContractFactory("SimpleYieldFarm");
    const simpleYieldFarm = await SimpleYieldFarm.deploy(yieldToken.target);
    await simpleYieldFarm.waitForDeployment();

    // Grant MINTER_ROLE to SimpleYieldFarm
    const MINTER_ROLE = await yieldToken.MINTER_ROLE();
    await yieldToken.grantRole(MINTER_ROLE, simpleYieldFarm.target);

    // Mint some tokens for testing
    const mintAmount = ethers.parseEther("1000");
    await yieldToken.mint(staker.address, mintAmount);

    return { yieldToken, simpleYieldFarm, owner, staker, mintAmount };
  }

  describe("Staking and Harvesting", function () {
    it("Should allow staking tokens and harvesting rewards", async function () {
      const { yieldToken, simpleYieldFarm, staker } = await loadFixture(deployYieldFarmFixture);
      
      // Amount to stake
      const stakeAmount = ethers.parseEther("100");
      
      // Approve tokens for staking
      await yieldToken.connect(staker).approve(simpleYieldFarm.target, stakeAmount);
      
      // Stake tokens
      await expect(simpleYieldFarm.connect(staker).stake(stakeAmount))
        .to.emit(simpleYieldFarm, "Staked")
        .withArgs(staker.address, stakeAmount);
      
      // Verify staked amount
      expect(await simpleYieldFarm.stakedBalance(staker.address)).to.equal(stakeAmount);
      
      // Wait for some blocks to accumulate rewards
      await ethers.provider.send("evm_mine", []);
      await ethers.provider.send("evm_mine", []);
      
      // Check pending rewards
      const pendingRewards = await simpleYieldFarm.calculateRewards(staker.address);
      expect(pendingRewards).to.be.gt(0);
      
      // Harvest rewards
      await expect(simpleYieldFarm.connect(staker).harvestRewards())
        .to.emit(simpleYieldFarm, "RewardsHarvested")
        .withArgs(staker.address, pendingRewards);
      
      // Verify rewards were received
      expect(await yieldToken.balanceOf(staker.address)).to.be.gt(ethers.parseEther("900")); // Initial 1000 - 100 staked + rewards
    });
  });
}); 