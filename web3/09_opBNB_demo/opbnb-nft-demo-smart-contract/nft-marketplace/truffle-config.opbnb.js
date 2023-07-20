// create a file at the root of your project and name it .env -- there you can set process variables
// like the mnemomic below. Note: .env is ignored by git in this project to keep your private information safe
// require('dotenv').config();
// const ganacheMnemonic = process.env["GANACHE_MNEMONIC"];
// const goerliMnemonic = process.env["GOERLI_MNEMONIC"];
// const mnemonic = 'test test test test test test test test test test test junk' // process.env["MNEMONIC"];

// const infuraKey = process.env["NODEREAL_KEY"];

// //uncomment to use mainnetMnemonic, be sure to set it in the .env file
// //const mainnetMnemonic = process.env["MAINNET_MNEMONIC"]

// const { ganache } = require('@eth-optimism/plugins/ganache');
// const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  /**
  * contracts_build_directory tells Truffle where to store compiled contracts
  */
  contracts_build_directory: './build/opBNB-contracts',

  /**
  *  contracts_directory tells Truffle where to find your contracts
  */
  contracts_directory: './contracts/opbnb',

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*"       // Any network (default: none)
    },
    // for use with local environment -- see README and list of available
    // scripts in package.json for steps to get this running on your local machine
    dashboard: {
      host: "127.0.0.1",
      port: 24012,
      network_id: "*"
    }
  },

  mocha: {
    timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.8.13",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
  db: {
    enabled: false
  }
}
