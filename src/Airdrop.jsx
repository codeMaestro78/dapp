import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React from "react";

export function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  async function sendAirdropToUser() {
    const amount = document.getElementById("publickey").value;
    await connection.requestAirdrop(wallet.publicKey, amount * 1000000000);
    alert("Airdroppped Sol");
  }
  return (
    <div>
      <input id="publickey" type="text" placeholder="Amount" />
      <button id="publickey" onClick={sendAirdropToUser}>
        Send AirDrop
      </button>
      
    </div>
  );
}
