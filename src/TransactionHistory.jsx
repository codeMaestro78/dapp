import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";

const TransactionHistory = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (wallet.publicKey) {
        const signature = await connection.getSignaturesForAddress(
          wallet.publicKey,
          {
            limit: 5,
          }
        );
        setHistory(signature);
      }
    };
    fetchTransaction();
  }, [wallet.publicKey, connection]);
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-4">
      <h3 className="text-lg font-semibold">Recent Transactions</h3>
      {history.length === 0 ? (
        <p className="text-gray-500">No transactions found</p>
      ) : (
        history.map((tx, idx) => (
          <p key={idx} className="text-sm break-words text-gray-700">
            {tx.signature}
          </p>
        ))
      )}
    </div>
  );
};

export default TransactionHistory;
