import React, { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function UserBalance() {
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [prevBalance, setPrevBalance] = useState(0);
  const wallet = useWallet();

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet.publicKey) {
        try {
          setIsLoading(true);
          const currentBalance = await connection.getBalance(wallet.publicKey);
          setPrevBalance(balance);
          setBalance(currentBalance / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setBalance(0);
      }
    };
    fetchBalance();

    const interval = setInterval(fetchBalance, 5000);
    return () => clearInterval(interval);
  }, [wallet.publicKey, connection]);

  // Determine if balance increased or decreased
  const balanceChange =
    balance > prevBalance
      ? "increase"
      : balance < prevBalance
      ? "decrease"
      : null;

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-teal-400 p-6 rounded-2xl shadow-lg max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-20 -mt-20"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-1">
          <p className="text-white font-medium">Your Balance</p>
          {isLoading && (
            <svg
              className="animate-spin h-4 w-4 text-white/70"
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
          )}
        </div>

        <div className="flex items-end space-x-2 mb-2">
          <div
            id="balance"
            className={`text-3xl font-bold text-white transition-all ${
              balanceChange === "increase"
                ? "animate-pulse text-green-100"
                : balanceChange === "decrease"
                ? "animate-pulse text-red-100"
                : ""
            }`}
          >
            {balance.toFixed(4)}
          </div>
          <div className="text-xl font-semibold text-white/80 mb-0.5">SOL</div>

          {balanceChange && (
            <div
              className={`text-xs font-medium ml-2 flex items-center ${
                balanceChange === "increase" ? "text-green-100" : "text-red-100"
              }`}
            >
              {balanceChange === "increase" ? (
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  ></path>
                </svg>
              )}
              {Math.abs(balance - prevBalance).toFixed(4)}
            </div>
          )}
        </div>

        {wallet.publicKey ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center justify-between">
            <div
              className="text-xs font-mono text-white/70 truncate"
              style={{ maxWidth: "260px" }}
            >
              {wallet.publicKey.toString()}
            </div>
            <button
              onClick={() =>
                navigator.clipboard.writeText(wallet.publicKey.toString())
              }
              className="text-white/70 hover:text-white p-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center text-white/70 text-sm py-1">
            Connect your wallet to view balance
          </div>
        )}
      </div>
    </div>
  );
}
