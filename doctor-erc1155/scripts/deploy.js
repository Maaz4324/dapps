const hre = require("hardhat");

async function main() {
  const Pass = await hre.ethers.getContractFactory("Pass");
  const pass = await Pass.deploy();

  await pass.deployed();

  console.log(`Pass is deployed to ${pass.address}`);

  const PassMarket = await hre.ethers.getContractFactory("PassMarket");
  const passMarket = await PassMarket.deploy();

  await passMarket.deployed();

  console.log(`PassMarket is deployed to ${passMarket.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
