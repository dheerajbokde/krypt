require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks:{
    goerli:{
      url: 'https://eth-goerli.alchemyapi.io/v2/0uZh0KhI3IuhPNyLgsj5C6jAPB8giQ4w',
      accounts: ['65ccd957cdcc20e6a46a2461af0d99b998f7dccf582915b91db14fd01d5ba1d5'],
    }
  }
};