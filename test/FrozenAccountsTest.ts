import { expect } from "chai";
const { ethers } = require("hardhat");
import hre from "hardhat";
import { log } from './logger';
import * as dotenv from "dotenv";
// .env dosyasını bir üst dizinden yükle
dotenv.config({ path: '../.env' });

import {
    FrozenAccounts,
} from "../typechain-types";

//const params = require('./parameters.json');
const params = require(`${__dirname}/test_parameters.json`);

// FROZEN_ABI 
const FROZEN_ABI = [
    "function freezeAccount(address _account) external",
    "function unfreezeAccount(address _account) external",
    "function isFrozen(address _account) external"
];

describe("Frozen Acoounts Test", function () {


    let frozenContract: any;

    const ADDR_COUNT = params.ADDR_COUNT;
    const My_ADDRESS = params.My_ADDRESS;
    const My_ADDRESS2 = params.My_ADDRESS2;
    //const FROZEN_ADDRESS = params.FROZEN_ADDRESS;

    const PRIVATE_KEY = process.env.PRIVATE_KEY!;
    const L1_RPC_URL = process.env.L1_RPC_URL!;

    if (!PRIVATE_KEY || !L1_RPC_URL) {
        throw new Error("Please set PRIVATE_KEY, RPC_URL in your .env file.");
    }

    // Connect to provider using private key
    const provider = new ethers.JsonRpcProvider(L1_RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    let addresses: any[] = [];

    // Populate addresses dynamically
    for (let i = 1; i <= ADDR_COUNT; i++) {
        addresses.push(`addr${i}`);
    }

    let FROZEN_ADDRESS: string;

    FROZEN_ADDRESS = '0x422A3492e218383753D8006C7Bfa97815B44373F';

    before(async function () {

        // Then get the signers and assign each one to the corresponding variable
        log('INFO', 'Starting deployment process...');
        const signers = await hre.ethers.getSigners();
        addresses = signers.slice(0, ADDR_COUNT);

        log('INFO', ``);
        const balance = await ethers.provider.getBalance(addresses[0]);
        log('INFO', `Owner Balance: -----> ${ethers.formatEther(balance)} ETH`);
        log('INFO', ``);


        frozenContract = (await hre.ethers.getContractAt(FROZEN_ABI, FROZEN_ADDRESS)) as unknown;


    });


    it("  1  --------------> Should freezeAccount", async function () {

        log('INFO', ``);
        log('INFO', "------------------freezeAccount------------------");
        log('INFO', ``);


        const tx = await frozenContract.connect(addresses[0]).freezeAccount(My_ADDRESS);
        await tx.wait(); 


        const isFrozen = await frozenContract.isFrozen(My_ADDRESS);

        log('INFO', `isFrozen: -----> ${isFrozen} `);

        expect(isFrozen).to.equal(true);


    });


});
