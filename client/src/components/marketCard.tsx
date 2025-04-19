import { useActiveAccount, useReadContract } from "thirdweb/react";
import { predictionMarketContract } from "../../constants/contracts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { MarketCardSkeleton } from "./skeletonCard";

interface MarketCardProps {
    index: number;
    filter: 'active' | 'pending' | 'resolved';
}

interface Market {
    question: string;
    optionA: string;
    optionB: string;
    endTime: bigint;
    outcome: number;
    totalOptionAShares: bigint;
    totalOptionBShares: bigint;
    resolved: boolean;
}

interface SharesBalance {
    optionAShares: bigint;
    optionBShares: bigint;
}

export function MarketCard({ index, filter }: MarketCardProps) {
    // Get the active account
    const account = useActiveAccount();

    // Get the market data
    const { data: marketData, isLoading: isLoadingMarketData } = useReadContract({
        contract: predictionMarketContract,
        method: "function getMarketInfo(uint256 _marketId) view returns (string question, string optionA, string optionB, uint256 endTime, uint8 outcome, uint256 totalOptionAShares, uint256 totalOptionBShares, bool resolved)",
        params: [BigInt(index)]
    });

    // Parse the market data
    const market: Market | undefined = marketData ? {
        question: marketData[0],
        optionA: marketData[1],
        optionB: marketData[2],
        endTime: marketData[3],
        outcome: marketData[4],
        totalOptionAShares: marketData[5],
        totalOptionBShares: marketData[6],
        resolved: marketData[7]
    } : undefined;

    // Get the shares balance
    const { data: sharesBalanceData } = useReadContract({
        contract: predictionMarketContract,
        method: "function getSharesBalance(uint256 _marketId, address _user) view returns (uint256 optionAShares, uint256 optionBShares)",
        params: [BigInt(index), account?.address as string]
    });

    // Parse the shares balance
    const sharesBalance: SharesBalance | undefined = sharesBalanceData ? {
        optionAShares: sharesBalanceData[0],
        optionBShares: sharesBalanceData[1]
    } : undefined;

    // Check if the market is expired
    const isExpired = new Date(Number(market?.endTime) * 1000) < new Date();
    // Check if the market is resolved
    const isResolved = market?.resolved;

    // Check if the market should be shown
    const shouldShow = () => {
        if (!market) return false;

        switch (filter) {
            case 'active':
                return !isExpired;
            case 'pending':
                return isExpired && !isResolved;
            case 'resolved':
                return isExpired && isResolved;
            default:
                return true;
        }
    };

    // If the market should not be shown, return null
    if (!shouldShow()) {
        return null;
    }

    return (
        <Card key={index} className="flex flex-col">
            {isLoadingMarketData ? (
                <MarketCardSkeleton />
            ) : (
                <>
                    <CardHeader>

                        <CardTitle>{market?.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {market && (
                            //Market Progress component
                            <></>
                        )}
                        {new Date(Number(market?.endTime) * 1000) < new Date() ? (
                            market?.resolved ? (
                                //Market Resolved component
                                <></>
                            ) : (
                                //Market Pending component
                                <></>
                            )
                        ) : (
                            //Market Buy Interface
                            <></>
                        )}
                    </CardContent>
                    <CardFooter>
                        {market && sharesBalance && (
                            //Market Share component
                            <></>
                        )}
                    </CardFooter>
                </>
            )}
        </Card>
    )
}