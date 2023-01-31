// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Pass{

    mapping(uint=>uint) public passes;
    address payable public owner;

    constructor(uint price1, uint price2, uint price3) {
        owner = payable(msg.sender);
        passes[1] = price1;
        passes[2] = price2;
        passes[3] = price3;
    }

    modifier onlyOwner {
      require(msg.sender == owner, "only owner can call");
      _;
    }

    uint256 index;
    address[] public allBuyers;
    mapping(address=>uint) buyerIndex;
    mapping(address=>uint) public buyerPass;
    mapping(address=>uint256) public duration;

    function buyPass(uint _id) public payable{
        require(_id>0 && _id<=3, "wrong id"); 
        require(buyerPass[msg.sender]==0, "You aleady have pass");
        require(msg.value==passes[_id]*1000000000000000000, "Please set the price");
        owner.transfer(msg.value);
        buyerPass[msg.sender] = _id;
        duration[msg.sender] = block.timestamp; 
        buyerIndex[msg.sender] = index;
        ++index;
        allBuyers.push(msg.sender);
    }

    function destroyPass(address _buyer) public onlyOwner{
        require(buyerPass[_buyer]!=0, "not a buyer");
        if(buyerPass[_buyer]==1){
            require(duration[_buyer]+0<block.timestamp, "not yet");
            buyerPass[_buyer]=0;
            uint256 i = buyerIndex[_buyer];
        delete allBuyers[i];
        }else if(buyerPass[_buyer]==2){
            require(duration[_buyer]+17<block.timestamp, "not yet");
            buyerPass[_buyer]=0;
            uint256 i = buyerIndex[_buyer];
        delete allBuyers[i];
        }else if(buyerPass[_buyer]==3){
            revert();
        }
    }



}