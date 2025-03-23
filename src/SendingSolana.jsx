import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

export function SendingSolana() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function sendTokens() {
    try {
      setIsLoading(true);
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

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Transaction failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-lg max-w-md mx-auto space-y-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
      <h2 className="text-xl font-bold text-white mb-4">Send SOL</h2>

      <div className="space-y-4 relative z-10">
        <div>
          <label className="text-xs text-white/70 font-medium mb-1 block">
            Recipient Address
          </label>
          <input
            id="to"
            type="text"
            placeholder="Enter recipient's wallet address"
            className="w-full p-3 rounded-xl border border-indigo-400/30 bg-white/10 backdrop-blur-sm text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
          />
        </div>

        <div>
          <label className="text-xs text-white/70 font-medium mb-1 block">
            Amount
          </label>
          <div className="relative">
            <input
              id="amount"
              type="text"
              placeholder="0.00"
              className="w-full p-3 rounded-xl border border-indigo-400/30 bg-white/10 backdrop-blur-sm text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-16 transition-all"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-200 font-medium">
              SOL
            </span>
          </div>
        </div>

        <button
          onClick={sendTokens}
          disabled={isLoading}
          className={`w-full bg-white text-indigo-700 py-3.5 px-4 rounded-xl shadow-md font-semibold hover:bg-indigo-50 transition-all flex items-center justify-center space-x-2 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <span>Send Tokens</span>
          )}
        </button>
      </div>

      {showSuccess && (
        <div className="absolute bottom-4 left-0 right-0 mx-auto w-5/6 bg-green-500 text-white p-3 rounded-lg text-center animate-bounce shadow-lg">
          Transaction successful!
        </div>
      )}
    </div>
  );
}
