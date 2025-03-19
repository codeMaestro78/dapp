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
    <div>
      <h3>Recent Transaction</h3>
      {history.map((tx, idx) => (
        <p key={idx}>{tx.signature}</p>
      ))}
    </div>
  );
};

export default TransactionHistory;
