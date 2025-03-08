import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import * as dotenv from "dotenv";

dotenv.config({ path: '../.env' });

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const L1_RPC_URL = process.env.L1_RPC_URL || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "shanghai",  
    },
  },
  defaultNetwork: "localhost", // Set default network to local
  networks: {
    localhost: {  //  Local Ethereum Network
      url: L1_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [], // Use private key if set
    },
    hardhat: {}, // Hardhat's built-in local network (Optional)
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;