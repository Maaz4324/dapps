// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract AwesomeGame is ERC1155, Ownable, ERC1155Burnable  { 
    mapping (uint256 => string) _tokenURIs;
    uint public tokenCount;


    constructor() ERC1155("https://ipfs.io/ipfs/bafybeiafllfxvisc3wr2bf7ddfa3k43ythwluboxufp5hsik62py3cpzg4/{id}.json") {}

    function mint(uint256 _amount) public onlyOwner{
        _mint(msg.sender, tokenCount, _amount, "");
        ++tokenCount;
    }


    function uri(uint256 tokenId) override public view returns (string memory) { 
        return _tokenURIs[tokenId]; 
    } 

    function setTokenUri(uint256 tokenId, string memory _uri) public onlyOwner{
        _tokenURIs[tokenId] = _uri;
    }
}