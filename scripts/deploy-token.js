/*const { ethers } = require("hardhat");

async function deployToken(
  name,
  symbol,
  totalSupply,
  routerAddress,
  treasuryAddress,
  feeReceiverAddress,
  serviceFee
) {
  console.log(`Deploying ${name} (${symbol}) token...`);
  
  const RexasErc20 = await ethers.getContractFactory("RexasErc20");
  
  // Fee settings structure
  const feeSettings = {
    reflectionFeeBps: 200,      // 2% reflection fee
    applyReflectionFeeToAll: false, // Only on DEX trades
    liquidityFeeBps: 300,       // 3% liquidity fee
    applyLiquidityFeeToAll: false,  // Only on DEX trades
    treasuryFeeBps: 100,        // 1% treasury fee
    applyTreasuryFeeToAll: false,   // Only on DEX trades
    burnFeeBps: 50,             // 0.5% burn fee
    applyBurnFeeToAll: false    // Only on DEX trades
  };
  
  // Calculate total supply with decimals (9 decimals)
  const totalSupplyWithDecimals = ethers.utils.parseUnits(totalSupply.toString(), 9);
  
  // Deploy with service fee
  const token = await RexasErc20.deploy(
    name,
    symbol,
    totalSupplyWithDecimals,
    routerAddress,
    treasuryAddress,
    feeSettings,
    feeReceiverAddress,
    { value: serviceFee }
  );
  
  await token.deployed();
  
  console.log("Token deployed to:", token.address);
  console.log("Total supply:", ethers.utils.formatUnits(await token.totalSupply(), 9));
  console.log("Owner:", await token.owner());
  
  return token.address;
}

// Example usage
async function main() {
  const [deployer] = await ethers.getSigners();
  
  // Configuration
  const config = {
    name: "My Token",
    symbol: "MTK",
    totalSupply: 1000000, // 1 million tokens
    routerAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2 Router
    treasuryAddress: deployer.address, // Use deployer as treasury
    feeReceiverAddress: "YOUR_FEE_RECEIVER_ADDRESS", // Replace with actual address
    serviceFee: ethers.utils.parseEther("0.2") // 0.2 ETH
  };
  
  const tokenAddress = await deployToken(
    config.name,
    config.symbol,
    config.totalSupply,
    config.routerAddress,
    config.treasuryAddress,
    config.feeReceiverAddress,
    config.serviceFee
  );
  
  console.log("Deployment completed!");
  console.log("Token address:", tokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); */

  const hre = require("hardhat");
const { ethers } = hre;

async function deployToken({
  name,
  symbol,
  totalSupply,
  routerAddress,
  treasuryAddress,
  feeReceiverAddress,
  serviceFee,
}) {
  if (!ethers.isAddress(feeReceiverAddress)) {
    throw new Error("Invalid feeReceiverAddress");
  }

  console.log(`\n🚀 Deploying token: ${name} (${symbol})`);

  const RexasErc20 = await ethers.getContractFactory("RexasErc20");

  // Set fees
  const feeSettings = {
    reflectionFeeBps: 200,
    applyReflectionFeeToAll: false,
    liquidityFeeBps: 300,
    applyLiquidityFeeToAll: false,
    treasuryFeeBps: 100,
    applyTreasuryFeeToAll: false,
    burnFeeBps: 50,
    applyBurnFeeToAll: false,
  };

  // Parse total supply to include decimals
  const decimals = 9;
  const totalSupplyParsed = ethers.parseUnits(totalSupply.toString(), decimals);

  // Deploy contract with payable service fee
  const token = await RexasErc20.deploy(
    name,
    symbol,
    totalSupplyParsed,
    routerAddress,
    treasuryAddress,
    feeSettings,
    feeReceiverAddress,
    { value: serviceFee }
  );

  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  const tokenTotalSupply = await token.totalSupply();
  const owner = await token.owner();

  console.log("✅ Token deployed to:", tokenAddress);
  console.log("🔢 Total supply:", ethers.formatUnits(tokenTotalSupply, decimals));
  console.log("👑 Owner address:", owner);

  return tokenAddress;
}

async function main() {
  const [deployer] = await ethers.getSigners();

  const config = {
    name: "My Token",
    symbol: "MTK",
    totalSupply: 1_000_000, // 1 million tokens
    routerAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2 router
    treasuryAddress: deployer.address,
    feeReceiverAddress: "0x324bf4ae1c6ca3d28b700a6158af203e908f0c12", // ✅ Replace this
    serviceFee: ethers.parseEther("0.2"), // 0.2 ETH
  };

  const tokenAddress = await deployToken(config);

  console.log("\n🎉 Deployment complete!");
  console.log("📦 Token contract address:", tokenAddress);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
