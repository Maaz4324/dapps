// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract SkillSwap{
     struct Deal{
         uint256 amount;
         uint256 duration;
         address seller;
         address buyer;
         bool inProgress;
     }

     enum escrow {ordered, delivered, complete}

     mapping(address=>mapping(address=>escrow)) public Transaction;
        

    struct Profile{
        address seller;
        uint256 id;
        string uri;
    }
    uint256 public noOfSellers;

    mapping(uint256=>Profile) public sellerProfile;
    mapping(address=>bool) public isSeller;

    mapping(address=>mapping(address=>Deal)) public dealSellrToBuyr;


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

    function placeOrder(uint256 _amount, uint256 _duration, address _seller) public payable{
        require(isSeller[_seller]==true, "not a seller");
        require(dealSellrToBuyr[_seller][msg.sender].inProgress == false, "already order in progress");
        require(_seller != msg.sender, "you cannot order yourself");
        // require(_amount+_amount*share/100==msg.value, "Set the amount correctly");
        Transaction[_seller][msg.sender] = escrow.ordered;
        dealSellrToBuyr[_seller][msg.sender] = Deal(_amount, _duration + block.timestamp, _seller, msg.sender, true);
     }

     function orderDelivered(address _seller) public {
         require(Transaction[_seller][msg.sender] == escrow.ordered, "order not yet placed");
         Transaction[_seller][msg.sender] = escrow.delivered;
     }

    function backToBuyer(address _seller, address _buyer) public payable{
        require(dealSellrToBuyr[_seller][_buyer].duration < block.timestamp);
        payable(_buyer).transfer(dealSellrToBuyr[_seller][_buyer].amount);
        delete dealSellrToBuyr[_seller][_buyer];
    }

    function toSeller(address _seller, address _buyer) public payable{
         require(Transaction[msg.sender][_buyer] == escrow.delivered, "order not yet delivered");
        require(dealSellrToBuyr[_seller][_buyer].duration <= block.timestamp, "deadline is not met");
        require(dealSellrToBuyr[msg.sender][_buyer].inProgress == true, "order is not made");
         Transaction[_seller][msg.sender] = escrow.complete;
        payable(_seller).transfer(dealSellrToBuyr[_seller][_buyer].amount);
        delete dealSellrToBuyr[_seller][_buyer];
    }
     function contractBalance() public view returns(uint256){
         return address(this).balance;
     }
}