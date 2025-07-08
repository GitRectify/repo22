// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { RexasErc20, FeeSettings } from "./tToken.sol";

contract TokenFactory {
    // Event emitted when a new tToken is deployed
    event TokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        uint256 totalSupply,
        address router,
        address treasuryAddress,
        address serviceFeeReceiver,
        uint256 serviceFee
    );

    // Function to deploy a new tToken contract
    function createToken(
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_,
        address router_,
        address treasuryAddress_,
        FeeSettings memory feeSettings_,
        address serviceFeeReceiver_,
        uint256 serviceFee_
    ) public payable returns (address) {
        // Deploy a new tToken contract
        RexasErc20 newToken = new RexasErc20{value: msg.value}(
            name_,
            symbol_,
            totalSupply_,
            router_,
            treasuryAddress_,
            feeSettings_,
            serviceFeeReceiver_,
            serviceFee_
        );

        // Emit the TokenCreated event
        emit TokenCreated(
            address(newToken),
            name_,
            symbol_,
            totalSupply_,
            router_,
            treasuryAddress_,
            serviceFeeReceiver_,
            serviceFee_
        );

        // Return the address of the deployed contract
        return address(newToken);
    }
}