export type Term = {
  term: string;
  definition: string;
};

export const gameLevels: Term[][] = [
  // Level 1: 4 pairs
  [
    {
      term: 'Bitcoin',
      definition: 'The first decentralized cryptocurrency, created in 2009 by an unknown person or group of people using the name Satoshi Nakamoto.',
    },
    {
      term: 'Blockchain',
      definition: 'A distributed, immutable ledger that is used to record transactions and track assets in a business network.',
    },
    {
      term: 'Wallet',
      definition: 'A digital tool that allows users to store, send, and receive cryptocurrencies.',
    },
    {
      term: 'NFT',
      definition: 'A non-fungible token; a unique digital asset that represents ownership of real-world items like art, video clips, and music.',
    },
  ],
  // Level 2: 6 pairs
  [
    {
      term: 'Ethereum',
      definition: 'A decentralized, open-source blockchain with smart contract functionality. Ether (ETH) is its native cryptocurrency.',
    },
    {
      term: 'Smart Contract',
      definition: 'A self-executing contract with the terms of the agreement directly written into code. They run on a blockchain.',
    },
    {
      term: 'DeFi',
      definition: 'Decentralized Finance; an umbrella term for financial services on public blockchains, primarily Ethereum.',
    },
    {
      term: 'Gas Fees',
      definition: 'The transaction fees users pay to miners on a blockchain to have their transaction included in the block.',
    },
    {
      term: 'Mining',
      definition: 'The process by which new cryptocurrencies are entered into circulation, also a critical component of the maintenance and development of the blockchain ledger.',
    },
    {
      term: 'Altcoin',
      definition: 'Any cryptocurrency other than Bitcoin.',
    },
  ],
  // Level 3: 8 pairs
  [
    {
      term: 'Proof of Work (PoW)',
      definition: 'A consensus mechanism that requires members of a network to expend effort solving an arbitrary mathematical puzzle to prevent anybody from gaming the system.',
    },
    {
      term: 'Proof of Stake (PoS)',
      definition: 'A cryptocurrency consensus mechanism for processing transactions and creating new blocks in a blockchain, where validators are chosen to create new blocks based on the number of coins they hold.',
    },
    {
      term: 'Halving',
      definition: 'An event in which the reward for mining new blocks is halved, meaning miners receive 50% fewer bitcoins for verifying transactions. It occurs approximately every four years.',
    },
    {
      term: 'Satoshi',
      definition: 'The smallest unit of a bitcoin, equivalent to 100 millionth of a bitcoin.',
    },
    {
      term: 'DApp',
      definition: 'A decentralized application that runs on a peer-to-peer network of computers rather than a single computer.',
    },
    {
      term: 'Stablecoin',
      definition: 'A type of cryptocurrency whose value is pegged to another asset class, such as a fiat currency or gold, to maintain a stable price.',
    },
    {
      term: 'ICO',
      definition: 'Initial Coin Offering; a type of funding using cryptocurrencies. It is often a form of crowdfunding.',
    },
    {
      term: 'Fiat',
      definition: 'Government-issued currency that is not backed by a physical commodity, such as gold or silver, but rather by the government that issued it.',
    },
  ],
];

export const getLevelData = (level: number): Term[] | null => {
  const levelIndex = level - 1;
  return gameLevels[levelIndex] || null;
};
