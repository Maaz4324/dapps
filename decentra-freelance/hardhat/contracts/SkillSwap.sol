// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract SkillSwap{
     struct Deal{
         uint256 amount;
         uint256 duration;
         address seller;
         address buyer;
     }
        
    Deal public deal;

    struct Profile{
        address seller;
        string uri;
        bool profileEdit;
    }
    uint256 public noOfSellers;

    mapping(uint256=>Profile) public sellerProfile;

    mapping(address=>mapping(address=>Deal)) public dealSellrToBuyr;

    function placeOrder(uint256 _amount, uint256 _duration, address _seller) public payable{
        require(_seller != msg.sender, "you cannot order yourself");
        require(_amount==msg.value, "Set the amount correctly");
        deal = Deal(_amount, _duration + block.timestamp, _seller, msg.sender);
        dealSellrToBuyr[_seller][msg.sender] = deal;
     }

    function backToBuyer(address _seller, address _buyer) public payable{
        require(dealSellrToBuyr[_seller][_buyer].duration < block.timestamp);
        payable(_buyer).transfer(dealSellrToBuyr[_seller][_buyer].amount);
        delete dealSellrToBuyr[_seller][_buyer];
    }

    function toSeller(address _seller, address _buyer) public payable{
        require(dealSellrToBuyr[_seller][_buyer].duration >= block.timestamp);
        payable(_seller).transfer(dealSellrToBuyr[_seller][_buyer].amount - dealSellrToBuyr[_seller][_buyer].amount*1/10);
        delete dealSellrToBuyr[_seller][_buyer];
    }

    function setProfile(string memory _uri) public {
        if(!sellerProfile[noOfSellers].profileEdit){
            ++noOfSellers;
        }
        sellerProfile[noOfSellers] = Profile(msg.sender, _uri, true);
    }

     function contractBalance() public view returns(uint256){
         return address(this).balance;
     }
}