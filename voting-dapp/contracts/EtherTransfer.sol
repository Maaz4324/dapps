// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract EtherTransfer{
    uint number;

    function setNumber(uint _number) public {
        number = _number;
    }

    function getNumber() public view returns(uint){
        return number;
    }

    function sendEth(address _to) public payable{
        payable(address(_to)).transfer(msg.value);
    }


}
