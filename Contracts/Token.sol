//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.5.0 <0.9.0;
import 'hardhat/console.sol';

contract Token{
    string public name = 'Hardhat token';
    string public symbol = 'HHT';
    uint public totalSupply = 20000;

    address public owner;

    mapping(address=>uint) balances;

    constructor(){
        owner = msg.sender;
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint ammount) external {
       require(balances[msg.sender]>=ammount,'not enough balance');
       balances[msg.sender] -= ammount;
       balances[to] +=ammount;
    }

    function checkBalance (address account) external view returns(uint){
        console.log('checking balance',account);
        return balances[account];
    }

   
}

