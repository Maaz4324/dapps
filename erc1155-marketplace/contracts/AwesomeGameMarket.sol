// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract AwesomeGameMarket is ReentrancyGuard, ERC1155Holder{
    address payable public owner;
    uint public itemCount;
    mapping(uint256=>uint256) public ownerCount;
    
    constructor(){
        owner = payable(msg.sender);
    }

    struct Item{
        uint256 owners;
        uint price;
        ERC1155 nft;
        string uri;
    }

    mapping(uint => Item) public items;

    function makeItem(string memory _uri, uint256 _price, ERC1155 _nft) public {
        require(msg.sender==owner, "only owner can call");
        require(itemCount<=4, "Can only make limited amount of token");
        _nft.safeTransferFrom(msg.sender, address(this), itemCount, _nft.balanceOf(msg.sender, itemCount), "0x");
        items[itemCount] = Item(1,_price, _nft, _uri);
        ++itemCount;
    }

    function PurchaseItem(uint _tokenId, ERC1155 _nft) public payable nonReentrant{
        Item storage item = items[_tokenId];
        require(msg.value==item.price, "insufficient amount");
        owner.transfer(item.price);
        _nft.safeTransferFrom(address(this), msg.sender, _tokenId, 1, "0x");
        item.owners++;
    }
}