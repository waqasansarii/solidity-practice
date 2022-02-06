
const main = async () => {
  const [deployer] = await ethers.getSigners();
  const Token = await ethers.getContractFactory("Token");
  const hardhatDeploy = await Token.deploy();
  console.log("address", hardhatDeploy.address);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err, process.exit(1));
  });
