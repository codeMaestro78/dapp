import React from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function UserBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();

  async function getBalance() {
    if (wallet.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      document.getElementById("balance").innerHTML = balance / LAMPORTS_PER_SOL;
    }
  }
  getBalance();
  return (
    <div>
      <p>SOL Balance:- </p>
      <div id="balance"></div>
    </div>
  );
}
