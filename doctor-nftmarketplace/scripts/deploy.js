const hre = require("hardhat");

async function main() {
  const Pass = await hre.ethers.getContractFactory("Pass");
  const pass = await Pass.deploy(2, 5, 10);

  await pass.deployed();

  console.log(`Pass is deployed to ${pass.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
