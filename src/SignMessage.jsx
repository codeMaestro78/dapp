import React, { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function onClick() {
    try {
      setIsLoading(true);
      setResult(null);

      if (!publicKey) throw new Error("Wallet not connected");
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");

      const message = document.getElementById("message").value;
      if (!message.trim()) throw new Error("Please enter a message to sign");

      const encodeMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodeMessage);

      const isValid = !ed25519.verify(
        signature,
        encodeMessage,
        publicKey.toBytes()
      );

      setResult({
        success: isValid,
        signature: bs58.encode(signature),
      });
    } catch (error) {
      setResult({
        success: false,
        error: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 rounded-2xl shadow-lg max-w-md mx-auto space-y-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mt-16"></div>
      <h2 className="text-xl font-bold text-white mb-4">Sign Message</h2>

      <div className="space-y-4 relative z-10">
        <div>
          <label className="text-xs text-white/70 font-medium mb-1 block">
            Message Content
          </label>
          <textarea
            id="message"
            rows="3"
            placeholder="Enter the message you want to sign"
            className="w-full p-3 rounded-xl border border-blue-400/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all resize-none"
          ></textarea>
        </div>

        <button
          onClick={onClick}
          disabled={isLoading || !publicKey}
          className={`w-full bg-white text-blue-700 py-3.5 px-4 rounded-xl shadow-md font-semibold hover:bg-blue-50 transition-all flex items-center justify-center space-x-2 ${
            isLoading || !publicKey ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-blue-600"
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
              <span>Signing...</span>
            </>
          ) : !publicKey ? (
            <span>Connect wallet first</span>
          ) : (
            <span>Sign Message</span>
          )}
        </button>

        {result && (
          <div
            className={`mt-4 p-4 rounded-xl ${
              result.success
                ? "bg-green-500/20 border border-green-500/30"
                : "bg-red-500/20 border border-red-500/30"
            } backdrop-blur-sm`}
          >
            {result.success ? (
              <>
                <div className="flex items-center text-green-300 mb-2">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="font-medium">Signature verified!</span>
                </div>
                <p className="text-xs text-white/70 break-all font-mono">
                  {result.signature}
                </p>
              </>
            ) : (
              <div className="flex items-center text-red-300">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="font-medium">
                  {result.error || "Verification failed"}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
