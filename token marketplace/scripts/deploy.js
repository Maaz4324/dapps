const hre = require("hardhat");

async function main() {
  const TokenMarketplace = await hre.ethers.getContractFactory("TokenMarketplace");
  const tokenMarketplace = await TokenMarketplace.deploy();

  await tokenMarketplace.deployed();

  console.log(
    `TokenMarketplace deployed to ${tokenMarketplace.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
