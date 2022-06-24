//https://eth-goerli.alchemyapi.io/v2/99L6AWyM8vZ7-0s6-G0_RXx2uzL68Ws8

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks:{
    goerli:{
      url: 'https://eth-goerli.alchemyapi.io/v2/99L6AWyM8vZ7-0s6-G0_RXx2uzL68Ws8',
      accounts: ['837a722707bac0b0644d96818eda83a0240e4078984b3b456a9dfac9d378cfe5']
    }
  }
};
