const hre = require("hardhat");

async function main() {
  const Erc1155 = await hre.ethers.getContractFactory("Erc1155");
  const erc1155 = await Erc1155.deploy();

  await lock.deployed();

  console.log(`Erc1155 is deployed to ${erc1155.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
