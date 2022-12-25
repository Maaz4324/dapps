
const hre = require("hardhat");

async function main() {

  const EtherTransfer = await hre.ethers.getContractFactory("EtherTransfer");
  const etherTransfer = await EtherTransfer.deploy();

  await etherTransfer.deployed();

  console.log(
    `EtherTransfer deployed to ${etherTransfer.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
