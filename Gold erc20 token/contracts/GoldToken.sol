// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <=0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GoldToken is ERC20 {
    address payable owner;
    constructor() public ERC20("GoldToken", "GDT") {
        owner = payable(msg.sender);
        _mint(owner, 1000000 * 10 ** decimals());
    }
}