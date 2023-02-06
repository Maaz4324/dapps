// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract AwesomeGameMarket is ReentrancyGuard, ERC1155Holder{
    address payable public owner;
    uint public itemCount;
    mapping(uint256=>mapping(uint256=>address)) ownersList;
    
    constructor(){
        owner = payable(msg.sender);
    }

    struct Item{
        uint256 owners;
        uint price;
        ERC1155 nft;
    }

    mapping(uint => Item) public items;

    function makeItem(uint256 _price, ERC1155 _nft) public {
        require(msg.sender==owner, "only owner can call");
        items[itemCount] = Item(1,_price, _nft);
        _nft.safeTransferFrom(msg.sender, address(this), itemCount, _nft.balanceOf(msg.sender, itemCount), "0x");
        ++itemCount;
    }

    function PurchaseItem(uint _tokenId, ERC1155 _nft) public payable nonReentrant{
        Item storage item = items[_tokenId];
        require(msg.value==item.price, "insufficient amount");
        owner.transfer(item.price);
        _nft.safeTransferFrom(address(this), msg.sender, _tokenId, 1, "0x");
        ownersList[_tokenId][item.owners] = msg.sender;
        item.owners++;
    }
    
    function viewOwnerslist(uint _tokenId, uint _owner) public view returns(address){
        return ownersList[_tokenId][_owner];
    }
}