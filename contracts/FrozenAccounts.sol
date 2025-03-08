// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "hardhat/console.sol";

/**
 * @title FrozenAccounts
 * @dev A smart contract to manage frozen accounts. The owner can freeze or unfreeze accounts,
 * and anyone can check if an account is frozen.
 */
contract FrozenAccounts {
    // Mapping to store frozen status of accounts
    mapping(address => bool) public frozen;

    // Address of the contract owner
    address public owner;

    event AccountFrozen(address indexed account);

    /**
     * @dev Modifier to restrict access to the owner of the contract.
     * Only the owner can call functions with this modifier.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    /**
     * @dev Constructor to initialize the contract.
     * Sets the deployer of the contract as the owner.
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Freezes an account, preventing it from performing certain actions.
     * Only the owner can call this function.
     * @param _account The address of the account to freeze.
     */
    function freezeAccount(address _account) external onlyOwner {
        
        frozen[_account] = true;

        console.log("Account %s has been frozen", _account);

        emit AccountFrozen(_account);
    }

    /**
     * @dev Unfreezes an account, allowing it to perform actions again.
     * Only the owner can call this function.
     * @param _account The address of the account to unfreeze.
     */
    function unfreezeAccount(address _account) external onlyOwner {
        frozen[_account] = false;
    }

    /**
     * @dev Checks if an account is frozen.
     * @param _account The address of the account to check.
     * @return A boolean indicating whether the account is frozen.
     */
    function isFrozen(address _account) external view returns (bool) {
        return frozen[_account];
    }
}