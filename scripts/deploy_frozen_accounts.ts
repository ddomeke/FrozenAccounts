const { ethers } = require("hardhat");
import hre from "hardhat";
import { log } from '../test/logger';
import * as dotenv from "dotenv";
dotenv.config({ path: '../.env' });

import {
    FrozenAccounts,
} from "../typechain-types";

async function main() {
    console.log("Starting deployment...");

    // Load private key and provider from .env
    const PRIVATE_KEY = process.env.PRIVATE_KEY!;
    //change this to your rpc url and network
    const L1_RPC_URL = process.env.L1_RPC_URL!;

    if (!PRIVATE_KEY || !L1_RPC_URL ) {
        throw new Error("Please set PRIVATE_KEY, L1_RPC_URL in your .env file.");
    }

    // Connect to provider using private key
    const provider = new ethers.JsonRpcProvider(L1_RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    let frozenAccounts: FrozenAccounts;
    
    log('INFO', `Starting Deployment for modules using wallet: ${wallet.address}`);
    log('INFO', "");

    //--------------------- FrozenAccounts.sol deploy -------------------------------------------------------------
    const FrozenAccountsContract = await hre.ethers.getContractFactory("FrozenAccounts", wallet);
    frozenAccounts = await FrozenAccountsContract.deploy() as FrozenAccounts;
    await frozenAccounts.waitForDeployment();
    const frozenAccountsAddress = await frozenAccounts.getAddress();
    log('INFO', `frozenAccounts contract deployed at: ${frozenAccountsAddress}`);
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

//npx hardhat run scripts/deploy_frozen_accounts.ts --network localhost