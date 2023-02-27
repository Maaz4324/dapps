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
        uint256 id;
        string uri;
    }
    uint256 public noOfSellers;

    mapping(uint256=>Profile) public sellerProfile;
    mapping(address=>bool) public isSeller;

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
        require(isSeller[msg.sender]==false, "Already a seller");
        ++noOfSellers;
        sellerProfile[noOfSellers] = Profile(msg.sender, noOfSellers, _uri);
        isSeller[msg.sender]=true;
    }

    function updateProfile(string memory _uri, uint256 _id) public{
        require(isSeller[msg.sender]==true, "not a seller");
        require(sellerProfile[_id].seller == msg.sender, "NOT your profile");
        Profile storage profile = sellerProfile[_id];
        profile.uri = _uri;
    }

     function contractBalance() public view returns(uint256){
         return address(this).balance;
     }
}