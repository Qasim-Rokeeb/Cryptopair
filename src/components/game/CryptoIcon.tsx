
"use client";
import { Coins } from 'lucide-react';

const BitcoinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
    <path d="M15 8.5h-5a2 2 0 100 4h1a2 2 0 110 4h-3" />
    <path d="M12 6.5V5.5" /><path d="M12 18.5v-1" />
  </svg>
);

const BlockchainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M10 6.5h4" /><path d="M6.5 10v4" /><path d="M17.5 10v4" /><path d="M10 17.5h4" />
  </svg>
);

const WalletIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2v-4" />
    <path d="M20 12h-8a2 2 0 01-2-2V8" />
    <path d="M18 16a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const NftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h18v18H3z" />
    <path d="M8 8h3v3H8z" /><path d="M13 13h3v3h-3z" /><path d="M8 13h3v3H8z" /><path d="M13 8h3v3h-3z" />
  </svg>
);

const EthereumIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l6 8-6 4-6-4z" />
    <path d="M12 12l6 8-6 4-6-4z" />
  </svg>
);

const SmartContractIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 14l-2 2 2 2" />
    <path d="M15 14l2 2-2 2" />
  </svg>
);

const icons: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  bitcoin: BitcoinIcon,
  blockchain: BlockchainIcon,
  wallet: WalletIcon,
  nft: NftIcon,
  ethereum: EthereumIcon,
  smartContract: SmartContractIcon,
  default: Coins,
};

// A catch-all for other icons to avoid creating too many. We can add more specific icons as needed.
const defaultIcons: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
    defi: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M5 5l2.5 2.5M19 5l-2.5 2.5M5 19l2.5-2.5M19 19l-2.5-2.5"/></svg>,
    gas: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M8 7l8 10M16 7l-8 10"/></svg>,
    mining: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10l9-7 9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10M2 10h20"/></svg>,
    altcoin: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9l6 6M9 15l6-6"/></svg>,
    proofOfWork: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 12l-3-3-3 3M12 15V9"/><circle cx="12" cy="12" r="10"/></svg>,
    proofOfStake: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l3 3 3-3M12 9v6"/><circle cx="12" cy="12" r="10"/></svg>,
    halving: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M5 12h14"/><path d="M19 17l-3-5 3-5"/></svg>,
    satoshi: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="9"/></svg>,
    dapp: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8l4-4 4 4M15 8l4-4 4 4M5 16l4 4 4-4M15 16l4 4 4-4"/></svg>,
    stablecoin: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12h6"/></svg>,
    ico: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v8m-4-4h8"/><circle cx="12" cy="12" r="10"/></svg>,
    fiat: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M5 5h14M5 19h14"/></svg>,
    dao: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 12l-4-4 4-4 4 4-4 4zM12 12l-4 4 4 4 4-4-4-4z"/></svg>,
    yieldFarming: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M5 10h14M5 14h14"/></svg>,
    liquidityPool: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9l6 6M9 15l6-6"/></svg>,
    dex: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 16l4-4-4-4M8 8l-4 4 4 4M12 4v16"/></svg>,
    ath: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M5 10l7-7 7 7"/></svg>,
    whale: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/><path d="M12 6v6l4 2"/></svg>,
    fud: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l-2 2"/></svg>,
    hardFork: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v8M12 12v8M9 9l-3 3 3 3M15 9l3 3-3 3"/></svg>,
    softFork: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M9 9l-3 3 3 3M15 9l3 3-3 3"/></svg>,
    airdrop: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v10M12 16l-4 4h8z"/><circle cx="12" cy="14" r="2"/></svg>,
    layer1: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>,
    layer2: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10v10H7z"/><path d="M11 11h2v2h-2z"/></svg>,
    zkRollup: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 9l6 6M15 9l-6 6"/><circle cx="12" cy="12" r="10"/></svg>,
    sharding: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z"/></svg>,
    metaverse: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l-6 4v8l6 4 6-4V6z"/><path d="M6 6l6 4 6-4M12 14v8"/></svg>,
    oracles: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5l1.5 1.5M5 19l1.5-1.5M17.5 6.5l1.5-1.5"/></svg>,
    rugPull: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 2l10 10L2 22"/><path d="M22 2l-10 10L22 22"/></svg>,
    tokenomics: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9l3-3 3 3M9 15l3 3 3-3"/></svg>,
    web3: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l-6 4v8l6 4 6-4V6z"/><path d="M6 6l6 4 6-4M12 14v8"/></svg>,
    coldStorage: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9v6h6V9z"/></svg>,
    hotWallet: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2v-4"/><path d="M20 12h-8a2 2 0 01-2-2V8"/><path d="M18 16a2 2 0 11-4 0 2 2 0 014 0zM22 10l-2 2 2 2"/></svg>,
    seedPhrase: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 12h10M7 17h5"/></svg>,
    cryptojacking: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l-6 4v8l6 4 6-4V6z"/><path d="M6 6l6 4 6-4M12 14v8"/><path d="M16 4l-8 4 8 4"/></svg>,
    dustingAttack: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>,
};

export const CryptoIcon = ({ iconName, ...props }: { iconName: string } & React.SVGProps<SVGSVGElement>) => {
  const IconComponent = icons[iconName] || defaultIcons[iconName] || icons.default;
  return <IconComponent {...props} />;
};
