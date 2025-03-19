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
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-4">
      <input
        id="airdropAmount"
        type="number"
        placeholder="Amount in SOL"
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={sendAirdropToUser}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl shadow"
      >
        Send Airdrop
      </button>
    </div>
  );
}
