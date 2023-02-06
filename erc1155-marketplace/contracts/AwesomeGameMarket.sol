// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract AwesomeGameMarket is ReentrancyGuard, ERC1155Holder{
    address payable public owner;
    uint public itemCount;
    
    constructor(){
        owner = payable(msg.sender);
    }

    struct Item{
        uint256 owners;
        uint price;
        ERC1155 nft;
    }
    
    mapping(uint256=>mapping(uint256=>address)) ownersList;

    mapping(uint => Item) public items;

    function makeItem(uint256 _price, ERC1155 _nft) public {
        require(msg.sender==owner, "only owner can call");
        items[itemCount] = Item(0,_price, _nft);
        _nft.safeTransferFrom(msg.sender, address(this), itemCount, _nft.balanceOf(msg.sender, itemCount), "0x");
        ++itemCount;
    }

    function PurchaseItem(uint _tokenId, ERC1155 _nft, uint256 _amount) public payable nonReentrant{
        require(_nft.balanceOf(address(this), _tokenId) >= _amount, "Not much tokens left");
        Item storage item = items[_tokenId];
        require(msg.value==item.price*_amount, "insufficient amount");
        owner.transfer(item.price*_amount);
        _nft.safeTransferFrom(address(this), msg.sender, _tokenId, _amount, "0x");
        ++item.owners;
        ownersList[_tokenId][item.owners] = msg.sender;
    }
    
    function viewOwnerslist(uint _tokenId, uint _owner) public view returns(address){
        return ownersList[_tokenId][_owner];
    }
}