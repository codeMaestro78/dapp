import React, { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function UserBalance() {
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const wallet = useWallet();

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    };
    fetchBalance();

    const interval = setInterval(fetchBalance, 5000);
    return () => clearInterval(interval);
  }, [wallet.publicKey, connection]);

  return (
    <div>
      <p>SOL Balance:- </p>
      <div id="balance">{balance.toFixed(4)} SOL</div>
    </div>
  );
}
