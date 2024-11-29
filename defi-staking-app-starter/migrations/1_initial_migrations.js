const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer) {
  console.log("Starting deployment...");
  await deployer.deploy(Migrations);
  console.log("Migrations deployed!");
};
