const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying FeeReceiver contract...");
  const [deployer] = await ethers.getSigners();

  const address = await deployer.getAddress();
  console.log('Deployer Address: ', address);
  console.log('Deployer Balance: ', await ethers.provider.getBalance(address));

  const FeeReceiver = await ethers.getContractFactory("FeeReceiver");
  const feeReceiver = await FeeReceiver.deploy();

  await feeReceiver.waitForDeployment();

  console.log("FeeReceiver deployed to:", await feeReceiver.getAddress());
  console.log("Default service fee:", ethers.formatEther(await feeReceiver.serviceFee()), "ETH");

  return feeReceiver.address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 