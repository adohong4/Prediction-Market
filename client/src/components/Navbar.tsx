"use client";

import { client } from "@/app/client";
import { sepolia } from "thirdweb/chains";
import { ConnectButton, lightTheme } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets"
import { tokenContractAddress } from "../../constants/contracts";

export function Navbar() {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Simple Prediction Market</h1>
            <div className="items-center flex gap-2">
                <ConnectButton
                    client={client}
                    theme={lightTheme()}
                    chain={sepolia}
                    connectButton={{
                        label: "Sign In",
                        style: {
                            fontSize: '0.75rem !important',
                            height: '2.5rem !important',
                        }
                    }}
                    wallets={[
                        inAppWallet()
                    ]}
                    accountAbstraction={{
                        chain: sepolia,
                        sponsorGas: true,
                    }}
                    detailsButton={{
                        displayBalanceToken: {
                            [sepolia.id]: tokenContractAddress
                        }
                    }}
                />
            </div>
        </div>
    )
}