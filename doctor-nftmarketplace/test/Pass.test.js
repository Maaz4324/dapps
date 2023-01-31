const { expect } = require("chai");

describe("Pass contract", function () {
  let deployer;
  let addr1;
  let addr2;
  let addrs;
  let pass;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  beforeEach(async function () {
    // Get the ContractFactories and Signers here.
    const Pass = await ethers.getContractFactory("Pass");
    [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contracts
    pass = await Pass.deploy(2, 5, 10);
    console.log(`Pass is deployed to ${pass.address}`);
  });

  describe("Owner", () => {
    it("should check if the owner address is correct", async () => {
      expect(await pass.owner()).to.equal(deployer.address);
    });
  });

  describe("Prices", () => {
    it("should check the price of every passes", async function () {
      const passPrice = await pass.passes(1);
      expect(passPrice).to.equal(2);
    });
  });

  describe("Buy pass", () => {
    it("should run the buypass function and confirm if address has bought it and check if it is indexed in the array", async function () {
      //buying pass with addr1
      const passPrice = await pass.passes(1);
      await pass.connect(addr1).buyPass(1, {
        value: ethers.utils.parseEther(passPrice.toString()),
      });

      //checking if addr1 has bought
      const buyerpass = await pass.buyerPass(addr1.address);
      expect(buyerpass).to.equal(1);

      //checking if addr1 is indexed as 0
      const buyer = await pass.allBuyers(0);
      expect(buyer).to.equal(addr1.address);
    });
  });

  describe("Destroy the pass after 3 or 5 years", function () {
    it("should buy the pass", async function () {
      //buying pass with addr1
      const passPrice = await pass.passes(1);
      await pass.connect(addr1).buyPass(1, {
        value: ethers.utils.parseEther(passPrice.toString()),
      });

      //checking if addr1 has bought
      const buyerpass = await pass.buyerPass(addr1.address);
      expect(buyerpass).to.equal(1);

      //checking if addr1 is indexed as 0
      const buyer = await pass.allBuyers(0);
      expect(buyer).to.equal(addr1.address);
    });

    it("should destroy the pass", async function () {
      //destroying pass of addr1 after a sec
      setTimeout(async () => {
        await pass.destroyPass(addr1);
      }, 5000);

      //checking if addr1 has been destroy
      const buyerpass = await pass.buyerPass(addr1.address);
      expect(buyerpass).to.equal(0);
    });
  });
});
