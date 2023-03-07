require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  paths: {
    artifacts: "../src/artifacts",
  },
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/9eWQNiKp3cA0Y0hOvH4C4-MiKxthcP_q`,
      accounts: [
        "a63e141db14f45d0126adb315d56a1aec08f8ace130d93791c2dadd1c3e6c281",
      ],
    },
  },
};
