require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  paths: {
    artifacts: "../src/artifacts",
  },
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/HMem6t-3h4eeV-4eP5F6MCnKwIZqAEjH",
      accounts: [
        `a63e141db14f45d0126adb315d56a1aec08f8ace130d93791c2dadd1c3e6c281`,
      ],
    },
  },
};
