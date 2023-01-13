const hre = require("hardhat");

async function main() {
  const GoldToken = await hre.ethers.getContractFactory("GoldToken");
  const [owner] = await ethers.getSigners();
  const goldToken = await GoldToken.deploy();

  await goldToken.deployed();

  console.log(`GoldToken deployed to ${goldToken.address} by ${owner.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
