# Flight Delay dApp
Decentralized application to interact with a flight delay smart insurance contract on the Ethereum network.

### Prerequisites
- NodeJS
- Metamask Chrome extension

### Requirements (dependencies)
- ethers.js
- hardhat

### Instructions
- `npx hardhat node` To start a local test network
- `npx hardhat compile` to compile the contracts ABI and generate artifacts
- `npx hardhat run scripts/deploy.js --network localhost` to deploy the sample contract to the local test network
- `npm start` to start the React server UI
