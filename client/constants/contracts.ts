import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains"

export const predictionMarketContractAddress = "0x0f1621ea4895DEb2C4E484c1981F6D46e3BF1d44";
export const tokenContractAddress = "0xb9a3FD2417c23D8e1D85B3297A0Ca123060079eB";

export const predictionMarketContract = getContract({
    client: client,
    chain: sepolia,
    address: predictionMarketContractAddress
});

export const tokenContract = getContract({
    client: client,
    chain: sepolia,
    address: tokenContractAddress
})