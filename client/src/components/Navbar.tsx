"use client";

import { client } from "@/app/client";
import { sepolia } from "thirdweb/chains";
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets"
import { tokenContractAddress } from "../../constants/contracts";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function Navbar() {
    const account = useActiveAccount();
    const [isClaiming, setIsClaiming] = useState(false);

    const handleClaimTokens = async () => {
        setIsClaiming(true);
        try {
            const resp = await fetch("/api/claimToken", {
                method: "POST",
                body: JSON.stringify({ address: account?.address }),
            });

            if (!resp.ok) {
                throw new Error('Failed to claim tokens');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsClaiming(false);
        }
    };

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Simple Prediction Market</h1>
            <div className="items-center flex gap-2">
                {account && (
                    <Button
                        onClick={handleClaimTokens}
                        disabled={isClaiming}
                        variant="outline"
                    >
                        {isClaiming ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Claiming...
                            </>
                        ) : (
                            'Claim Tokens'
                        )}
                    </Button>
                )}
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