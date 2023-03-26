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
        `249a384e7e19276680f54031177e39e4dc6584636e733a2847e2ff56b0701259`,
      ],
    },
  },
};
