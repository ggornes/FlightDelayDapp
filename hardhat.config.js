require("@nomiclabs/hardhat-waffle");

const ROPSTEN_PRIVATE_KEY = ""

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  // import abis and artifacts into React
  paths: {
    artifacts: './src/artifacts',
  },
  // hardhat configuration for local network
  networks: {
    hardhat: {
      chainId: 1337
    },
    // ropsten: {
    //   url: "https://ropsten.infura.io/v3/your-project-id",
    //   accounts: [`0x${your-private-key}`]
    // },
    ropsten: {
      url: "https://ropsten.infura.io/v3/29e443690e0c4bd5ad2643452831a74e",
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    }        
  }
};

