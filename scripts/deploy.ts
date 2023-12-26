import { ethers, run, network } from "hardhat";
import { SimpleStorage } from "../typechain-types";
import "@nomicfoundation/hardhat-verify";
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying contract....");
  const simpleStorage: SimpleStorage = await SimpleStorageFactory.deploy()!;
  await simpleStorage.getDeployedCode()!;

  console.log(`Deployed contract to ${await simpleStorage.getAddress()!} `);

  if (network.config.chainId === 11155111 && process.env.ETHRSCAN_API_KEY) {
    await simpleStorage.waitForDeployment();
    await verify(await simpleStorage.getAddress(), []);
  }

  console.log('====================================');

  console.log('====================================');
  const currentValue = await simpleStorage.retrieve()
  console.log(currentValue.toString());
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(updatedValue.toString());


}
async function verify(contractAddress: string, args: any[]) {
  console.log("Berifying contarct...");
  try {
    await run("verify:verify", {
      address: contractAddress!,
      constructorArguments: args!,
    });
  } catch (e: any) {
    if (e.message.toLowerCase.includes("already verified")) {
      console.log("already verified!");
    } else {
      console.log(e);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
