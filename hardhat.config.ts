import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/block-number"
import dotenv from 'dotenv'
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@typechain/hardhat"
dotenv.config()

const SEPOLIA_ENDPOINT: string = process.env.SEPOLIA_ENDPOINT!;
const PRIVATE_KEY: string = process.env.PRIVATE_KEY!;
const ETHRSCAN_API_KEY: string = process.env.ETHRSCAN_API_KEY!;
const COIN_MARKET_CAP: string = process.env.COIN_MARKET_CAP!;
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_ENDPOINT,
      accounts: [PRIVATE_KEY],
      chainId: 11155111
    },
    locathost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337,
    }
  },
  solidity: "0.8.19",
  etherscan: {
    apiKey: ETHRSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COIN_MARKET_CAP,
    token:"MATIC"
  }
};

export default config;
