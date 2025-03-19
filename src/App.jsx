import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  WalletConnectButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Airdrop } from "./Airdrop";
import { UserBalance } from "./UserBalance";
import { SignMessage } from "./SignMessage";
import { SendingSolana } from "./SendingSolana";
import TransactionHistory from "./TransactionHistory";
import "./index.css";

// Airdrop logic

function App() {
  return (
    <ConnectionProvider
      endpoint={
        "https://solana-devnet.g.alchemy.com/v2/gnoqDzjF9XwPy4ry3ZNUqezNxhd0d9Kr"
      }
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center my-6">
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !text-white rounded-xl px-6 py-3 shadow-lg" />
            <WalletDisconnectButton className="!bg-red-500 hover:!bg-red-600 !text-white rounded-xl px-6 py-3 shadow-lg" />
          </div>
          <Airdrop />
          <UserBalance />
          <SignMessage />
          <SendingSolana />
          <TransactionHistory />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
