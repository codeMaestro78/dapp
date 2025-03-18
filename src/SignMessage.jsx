import React from "react";
import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();

  async function onClick() {
    if (!publicKey) throw new Error("Wallet not connected");
    if (!signMessage)
      throw new Error("Wallet does not support message signing!");

    const message = document.getElementById("message").value;
    const encodeMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodeMessage);

    if (!ed25519.verify(signature, encodeMessage, publicKey.toBytes()))
      throw new Error();
    alert("success", `Message signature: ${bs58.encode(signature)}`);
  }

  return (
    <div>
      <input id="message" type="text" placeholder="Message" />
      <button onClick={onClick}>Sign Message</button>
    </div>
  );
}
