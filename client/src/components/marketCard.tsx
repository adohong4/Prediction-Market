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