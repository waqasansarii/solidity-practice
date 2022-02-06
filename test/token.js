const { expect } = require("chai");

describe("Token Contract", () => {
  let owner;
  let account1;
  let account2;
  let hardhatToken;
  let Token;
  let addrs;

  //   using beforeEach function to set global variables
  beforeEach(async () => {
    [owner, account1, account2, ...addrs] = await ethers.getSigners();
    Token = await ethers.getContractFactory("Token");
    hardhatToken = await Token.deploy();
    hardhatToken.deployed();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("should set the total supply of tokens to the owner", async () => {
      let ownerBalance = await hardhatToken.checkBalance(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", () => {
    it("should transaction between  accounts", async () => {

    //   transfer from contract to account1
      await hardhatToken.transfer(account1.address, 10);
      expect(await hardhatToken.checkBalance(account1.address)).to.equal(10);
      
    //   transfer from account1 to account2 
      await hardhatToken.connect(account1).transfer(account2.address, 5);
      expect(await hardhatToken.checkBalance(account2.address)).to.equal(5);
    });


    it("Should throw error if user dont have enough balance", async () => {
      let initialBalance = await hardhatToken.checkBalance(owner.address);
      await expect(
        hardhatToken.connect(account1).transfer(owner.address, 5)
      ).to.be.revertedWith('not enough balance');
      expect(await hardhatToken.checkBalance(owner.address)).to.equal(
        initialBalance
      );
    });

    it('check balance after transfer', async ()=>{
      let initialBalance = await hardhatToken.checkBalance(owner.address);
        await hardhatToken.transfer(account1.address,10)
        expect(await hardhatToken.checkBalance(owner.address)).to.equal(initialBalance - 10)
    })
  });
});
