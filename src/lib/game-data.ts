
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
  // Level 4: 10 pairs
  [
    {
      term: 'DAO',
      definition: 'Decentralized Autonomous Organization; an organization controlled by members, not a central authority, with rules encoded as a computer program.',
    },
    {
      term: 'Yield Farming',
      definition: 'The practice of staking or lending crypto assets to generate high returns or rewards in the form of additional cryptocurrency.',
    },
    {
      term: 'Liquidity Pool',
      definition: 'A crowdsourced pool of cryptocurrencies locked in a smart contract, used to facilitate trades on a decentralized exchange (DEX).',
    },
    {
      term: 'DEX',
      definition: 'Decentralized Exchange; a peer-to-peer marketplace where transactions occur directly between crypto traders.',
    },
    {
      term: 'ATH',
      definition: 'All-Time High; the highest price a particular cryptocurrency has ever reached.',
    },
    {
      term: 'Whale',
      definition: 'An individual or entity that holds a large amount of a particular cryptocurrency.',
    },
    {
      term: 'FUD',
      definition: 'Fear, Uncertainty, and Doubt; a strategy to influence perception of certain cryptocurrencies by spreading negative or false information.',
    },
    {
      term: 'Hard Fork',
      definition: 'A radical change to a network’s protocol that makes previously invalid blocks/transactions valid—or vice-versa.',
    },
    {
      term: 'Soft Fork',
      definition: 'A backward-compatible upgrade to a blockchain network. This means that nodes that have not upgraded can still participate in validating and verifying transactions.',
    },
    {
      term: 'Airdrop',
      definition: 'A marketing stunt that involves sending free coins or tokens to wallet addresses in order to promote a new cryptocurrency.',
    },
  ],
  // Level 5: 12 pairs
  [
    {
      term: 'Layer 1',
      definition: 'The base protocol of a blockchain network (e.g., Bitcoin, Ethereum). It is the main network that processes and finalizes transactions.',
    },
    {
      term: 'Layer 2',
      definition: 'A secondary framework or protocol built on top of an existing blockchain system to improve scalability and efficiency.',
    },
    {
      term: 'ZK Rollup',
      definition: 'A Layer 2 scaling solution that uses zero-knowledge proofs to bundle (or "roll up") transactions off-chain and submit a single validity proof to the main chain.',
    },
    {
      term: 'Sharding',
      definition: 'A database partitioning technique used by blockchain networks to increase scalability, enabling them to process more transactions per second.',
    },
    {
      term: 'Metaverse',
      definition: 'A virtual shared space, created by the convergence of virtually enhanced physical reality and physically persistent virtual space, including the sum of all virtual worlds, augmented reality, and the Internet.',
    },
    {
      term: 'Oracles',
      definition: 'Third-party services that provide smart contracts with external information. They serve as bridges between blockchains and the outside world.',
    },
    {
      term: 'Rug Pull',
      definition: 'A malicious maneuver in the cryptocurrency industry where developers abandon a project and run away with investors’ funds.',
    },
    {
      term: 'Tokenomics',
      definition: 'The study of the economics of a crypto token. It covers all aspects of a token\'s economic model, including its creation, management, and removal from the network.',
    },
    {
      term: 'Web3',
      definition: 'The next generation of the internet, which aims to be a decentralized version of the internet that is built, operated, and owned by its users.',
    },
    {
      term: 'Cold Storage',
      definition: 'A method of storing cryptocurrency offline to prevent unauthorized access and theft.',
    },
    {
      term: 'Hot Wallet',
      definition: 'A cryptocurrency wallet that is connected to the internet, which allows for faster transactions but is also more vulnerable to cyberattacks.',
    },
    {
      term: 'Seed Phrase',
      definition: 'A series of words generated by your cryptocurrency wallet that give you access to the crypto associated with that wallet.',
    },
  ],
];

export const getLevelData = (level: number): Term[] | null => {
  const levelIndex = level - 1;
  return gameLevels[levelIndex] || null;
};
