import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";

const TransactionHistory = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (wallet.publicKey) {
        try {
          setIsLoading(true);
          const signature = await connection.getSignaturesForAddress(
            wallet.publicKey,
            {
              limit: 5,
            }
          );
          setHistory(signature);
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchTransaction();

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      if (wallet.publicKey) fetchTransaction();
    }, 30000);

    return () => clearInterval(interval);
  }, [wallet.publicKey, connection]);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 rounded-2xl shadow-lg max-w-md mx-auto space-y-4 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mb-20"></div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Transaction History</h2>
        {isLoading && (
          <svg
            className="animate-spin h-5 w-5 text-white/70"
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

      <div className="space-y-3 relative z-10">
        {history.length === 0 ? (
          <div className="text-center py-8 text-white/70 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            {wallet.publicKey
              ? "No transactions found"
              : "Connect your wallet to view transactions"}
          </div>
        ) : (
          history.map((tx, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:bg-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-cyan-200">
                  Transaction {idx + 1}
                </span>
                <a
                  href={`https://explorer.solana.com/tx/${tx.signature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/70 hover:text-white flex items-center"
                >
                  View
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </a>
              </div>
              <p className="text-xs break-all font-mono text-white/90">
                {tx.signature}
              </p>
            </div>
          ))
        )}
      </div>

      {wallet.publicKey && history.length > 0 && (
        <div className="text-center mt-2">
          <a
            href={`https://explorer.solana.com/address/${wallet.publicKey.toString()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs inline-flex items-center text-cyan-100 hover:text-white"
          >
            View all transactions
            <svg
              className="w-3 h-3 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
