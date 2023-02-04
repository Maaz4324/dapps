// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AwesomeGame is ERC1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant SWORD = 2;
    uint256 public constant SHIELD = 3;
    uint256 public constant CROWN = 4;

    
    mapping (uint256 => string) _tokenURIs;
    uint public tokenCount;
    address owner;

    constructor() ERC1155("https://awesomegame.com/assets/{id}.json") {
        owner = msg.sender;
        _mint(msg.sender, GOLD, 10**18, "");
        _mint(msg.sender, SILVER, 10**18, "");
        _mint(msg.sender, SWORD, 1000, "");
        _mint(msg.sender, SHIELD, 1000, "");
        _mint(msg.sender, CROWN, 1, "");
        tokenCount = 5;
    }

    modifier onlyOwner{
        require(msg.sender==owner, "only owner can call");
        _;
    }

    function uri(uint256 tokenId) override public view returns (string memory) { 
        return(_tokenURIs[tokenId]); 
    } 
    function _setTokenUri(uint256 tokenId, string memory tokenURI) external  onlyOwner{
         _tokenURIs[tokenId] = tokenURI; 
    } 
}