import { Button } from "./ui/button";
import { prepareContractCall } from "thirdweb";
import { useSendAndConfirmTransaction, useReadContract, useActiveAccount } from "thirdweb/react";
import { useState } from "react";
import { Loader, Loader2 } from "lucide-react";
import { predictionMarketContract } from "../../constants/contracts";

interface MarketResolvedProps {
    marketId: number;
    outcome: number;
    optionA: string;
    optionB: string;
}

export function MarketResolved({
    marketId,
    outcome,
    optionA,
    optionB
}: MarketResolvedProps) {
    const account = useActiveAccount();
    const { mutateAsync: mutateTransaction } = useSendAndConfirmTransaction();
    const [isClaiming, setIsClaiming] = useState(false);

    const { data: sharesBalance } = useReadContract({
        contract: predictionMarketContract,
        method: "function getSharesBalance(uint256 _marketId, address _user) view returns (uint256 optionAShares, uint256 optionBShares)",
        params: [BigInt(marketId), account?.address || ""]
    });

    const handleClaimRewards = async () => {
        setIsClaiming(true);
        try {
            const tx = await prepareContractCall({
                contract: predictionMarketContract,
                method: "function claimWinnings(uint256 _marketId)",
                params: [BigInt(marketId)]
            });

            await mutateTransaction(tx);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="mb-2 bg-green-200 p-2 rounded-md text-center text-xs">
                Resolved: {outcome === 0 ? optionA : optionB}
            </div>
            {sharesBalance && account && (
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleClaimRewards}
                >
                    {isClaiming ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Claiming...
                        </>
                    ) : (
                        'Claim Rewards'
                    )}
                </Button>
            )}

        </div>
    );
}