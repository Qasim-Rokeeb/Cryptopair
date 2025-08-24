
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
  // Level 6: 12 pairs
  [
    {
      term: 'Cryptojacking',
      definition: 'The unauthorized use of someone else\'s computer to mine cryptocurrency.',
    },
    {
      term: 'Dusting Attack',
      definition: 'A malicious activity where a trace amount of crypto, called dust, is sent to wallet addresses to deanonymize them.',
    },
    {
      term: 'Gas Limit',
      definition: 'The maximum amount of gas a user is willing to spend on a transaction.',
    },
    {
      term: 'Gas Price',
      definition: 'The price per unit of gas a user is willing to pay for a transaction, measured in Gwei.',
    },
    {
      term: 'Gwei',
      definition: 'A denomination of Ether (ETH), where 1 ETH equals 1 billion Gwei. It is used to pay for transactions on Ethereum.',
    },
    {
      term: 'MEV',
      definition: 'Miner Extractable Value; the profit a miner can make through their ability to arbitrarily include, exclude, or re-order transactions within a block.',
    },
    {
      term: 'Non-custodial',
      definition: 'A wallet where only the user has control over their private keys, providing full control over their funds.',
    },
    {
      term: 'Slippage',
      definition: 'The difference between the expected price of a trade and the price at which the trade is executed.',
    },
    {
      term: 'TVL',
      definition: 'Total Value Locked; the total value of crypto assets deposited in a decentralized finance (DeFi) protocol.',
    },
    {
      term: 'Impermanent Loss',
      definition: 'A temporary loss of funds that can occur when providing liquidity to a liquidity pool.',
    },
    {
      term: 'Zero-Knowledge Proof',
      definition: 'A cryptographic method that allows one party to prove to another that a statement is true, without revealing any information other than the validity of the statement itself.',
    },
    {
      term: 'Soulbound Token (SBT)',
      definition: 'Non-transferable tokens representing a person\'s identity, credentials, and affiliations in a decentralized society.',
    },
  ],
  // Level 7: 12 pairs
  [
    {
      term: 'Staking',
      definition: 'The process of actively participating in transaction validation on a proof-of-stake (PoS) blockchain to earn rewards.',
    },
    {
      term: 'DAO Governance',
      definition: 'The process by which members of a Decentralized Autonomous Organization collectively make decisions about the protocol.',
    },
    {
      term: 'Fork',
      definition: 'A change in a blockchain\'s protocol. This can be a "soft fork" (backward-compatible) or a "hard fork" (not backward-compatible).',
    },
    {
      term: 'Initial Exchange Offering (IEO)',
      definition: 'A fundraising model where a cryptocurrency exchange oversees the sale of tokens, similar to an ICO but managed by an exchange.',
    },
    {
      term: 'Know Your Customer (KYC)',
      definition: 'A standard in the financial industry that requires institutions to verify the identity of their clients.',
    },
    {
      term: 'Market Cap',
      definition: 'The total value of a cryptocurrency, calculated by multiplying the price of a single coin by the total number of coins in circulation.',
    },
    {
      term: 'Pump and Dump',
      definition: 'A scheme that attempts to boost the price of a stock or security through false recommendations based on false or misleading statements.',
    },
    {
      term: 'Shill',
      definition: 'The act of enthusiastically promoting a cryptocurrency or a crypto project, often for personal gain.',
    },
    {
      term: 'Vaporware',
      definition: 'A software or hardware project that is announced to the general public but is never actually manufactured nor officially cancelled.',
    },
    {
      term: 'Whitepaper',
      definition: 'An authoritative report or guide that informs readers concisely about a complex issue and presents the issuing body\'s philosophy on the matter.',
    },
    {
      term: 'Testnet',
      definition: 'An alternative blockchain used for testing. Testnet coins are separate and distinct from official coins and have no value.',
    },
    {
      term: 'Mainnet',
      definition: 'The main network where actual transactions take place and are recorded on the blockchain.',
    },
  ],
];

export const getLevelData = (level: number): Term[] | null => {
  const levelIndex = level - 1;
  return gameLevels[levelIndex] || null;
};
