const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying TokenFactory contract...");
  const [deployer] = await ethers.getSigners();

  const address = await deployer.getAddress();
  console.log('Deployer Address: ', address);
  console.log('Deployer Balance: ', await ethers.provider.getBalance(address));

  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();
  
  await tokenFactory.waitForDeployment();
  
  console.log("Deployed to:", await tokenFactory.getAddress());
  
  return tokenFactory.address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 