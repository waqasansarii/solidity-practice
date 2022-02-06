//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.5.0 <0.9.0;

contract Lottry{

    // manager address 
    address public manager;
    // perticipants addresses array 
    address payable[] public perticipants;

    constructor(){
        manager = msg.sender;
    }

//   special function to send ether in contract account 
    receive() external payable{
        require(msg.value ==0.1 ether);
        perticipants.push(payable(msg.sender));
    }

//   function to check balance of contract address only for manager 
    function checkBalance() public view returns(uint){
        require(msg.sender==manager);
        return address(this).balance;
    }

//   generate random number 
    function random() public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,perticipants.length)));
    }

//    select winner with the help of random number 
    function selectWinner() public{
        require(msg.sender==manager);
        require(perticipants.length>=3);
        address payable winner;
        // get index of perticipants array with the help of random number 
        uint index = random() % perticipants.length;
        // get winner address 
        winner = perticipants[index];
        // transfer lottry ether in winner account 
        winner.transfer(checkBalance());
    }

}