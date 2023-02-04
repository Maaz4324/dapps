const hre = require("hardhat");

async function main() {
  const AwesomeGame = await hre.ethers.getContractFactory("AwesomeGame");
  const awesomeGame = await AwesomeGame.deploy();

  await awesomeGame.deployed();

  console.log(`AwesomeGame is deployed to ${awesomeGame.address}`);

  const AwesomeGameMarket = await hre.ethers.getContractFactory(
    "AwesomeGameMarket"
  );
  const awesomeGameMarket = await AwesomeGameMarket.deploy();

  await awesomeGameMarket.deployed();

  console.log(`AwesomeGameMarket is deployed to ${awesomeGameMarket.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
