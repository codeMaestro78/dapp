import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export function SendingSolana() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendTokens() {
    let to = document.getElementById("to").value;
    let amount = document.getElementById("amount").value;

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    await wallet.sendTransaction(transaction, connection);
    alert("Sent" + amount + "SOL to" + to);
  }
  return (
    <div className="bg-gray-300 p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-4">
      <input
        id="to"
        type="text"
        placeholder="Recipient Address"
        className="w-full p-3 rounded-xl border border-gray-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <input
        id="amount"
        type="text"
        placeholder="Amount in SOL"
        className="w-full p-3 rounded-xl border border-gray-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <button
        onClick={sendTokens}
        className="w-full bg-gray-500 hover:bg-yellow-600 text-white py-3 rounded-xl shadow"
      >
        Send
      </button>
    </div>
  );
}
