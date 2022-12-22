import "./style.css";
import * as solanaWeb3 from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import { useEffect, useState } from "react";
window.Buffer = window.Buffer || require("buffer").Buffer;

const PageSolanaClassic = () => {
  const [provider, setProvider] = useState<any>({});
  const [pubKey, setPubKey] = useState(null);

  const lamports_per_sol = solanaWeb3.LAMPORTS_PER_SOL;

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        setProvider(provider);
      }
    }

    // window.open("https://phantom.app/", "_blank");
  };

  const connectWalletPhantom = async () => {
    try {
      const resp = await provider.connect();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const disconnect = () => {
    if (Object.keys(provider).length === 0) {
      console.log("Disconnected!");
      return;
    }

    provider.disconnect();
    // console.log("Disconnect success");
    // setProvider({});
  };
  // const secretKey = Uint8Array.from([
  //   77, 193, 141, 11, 95, 227, 8, 109, 6, 75, 108, 36, 110, 127, 45, 81, 234,
  //   179, 202, 189, 74, 103, 145, 157, 100, 219, 192, 57, 123, 117, 177, 108, 89,
  //   158, 130, 227, 232, 105, 163, 234, 142, 223, 175, 252, 8, 108, 187, 52, 184,
  //   211, 94, 50, 204, 130, 102, 247, 70, 89, 1, 69, 241, 149, 126, 1,
  // ]);
  // const senderKeypair = web3.Keypair.fromSecretKey(secretKey);
  // const senderPublickey = senderKeypair.publicKey;

  // console.log("senderPublickey", senderPublickey);

  useEffect(() => {
    getProvider();
  }, []);

  useEffect(() => {
    if (Object.keys(provider).length === 0) return;

    provider.on("connect", (publicKey: any) => {
      console.log("set public Key");
      setPubKey(publicKey);
    });

    // Forget user's public key once they disconnect
    provider.on("disconnect", () => {
      console.log("disconenct provider set key");
      setPubKey(null);
    });
  }, [provider]);

  // const signInTransactionAndSendMoney = (
  //   destPubkeyStr: any,
  //   lamports: any
  // ) => {

  // };

  const setWalletTransaction = async (instruction: any, connection: any) => {
    const transaction = new solanaWeb3.Transaction();
    transaction.add(instruction);
    transaction.feePayer = provider.publicKey;
    let hash = await connection.getRecentBlockhash();
    console.log("blockhash", hash);
    transaction.recentBlockhash = hash.blockhash;
    return transaction;
  };

  const signAndSendTransaction = async (
    provider: any,
    transaction: any,
    connection: any
  ) => {
    // Sign transaction, broadcast, and confirm
    const { signature } = await window.solana.signAndSendTransaction(
      transaction
    );
    await connection.confirmTransaction(signature);

    //let signedTrans = await wallet.signTransaction(transaction);
    console.log("sign transaction");
    //let signature = await connection.sendRawTransaction(signedTrans.serialize());
    console.log("send raw transaction");
    return signature;
  };

  const signInTransactionAndSendMoney = async (
    destPubkeyStr: any,
    lamports: any
  ) => {
    (async () => {
      const network = solanaWeb3.clusterApiUrl("testnet");
      const connection = new solanaWeb3.Connection(network);

      const transaction = new solanaWeb3.Transaction();

      lamports = 0.0001 * lamports_per_sol;

      try {
        destPubkeyStr = "Garmu9jzDt7qeX2iaQ8rWb1sw2vqoQVHFZyhFDvi49em";
        lamports = 0.0001 * lamports_per_sol;

        console.log("starting sendMoney");
        const destPubkey = new solanaWeb3.PublicKey(destPubkeyStr);
        const walletAccountInfo = await connection.getAccountInfo(
          provider.publicKey
        );

        console.log("wallet data size", walletAccountInfo?.data.length);

        const receiverAccountInfo = await connection.getAccountInfo(destPubkey);

        console.log("receiver data size", receiverAccountInfo?.data.length);

        const instruction = solanaWeb3.SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: destPubkey,
          lamports, // about half a SOL
        });

        let trans = await setWalletTransaction(instruction, connection);
        console.log("trans", trans);

        let signature = await signAndSendTransaction(
          provider,
          trans,
          connection
        );

        let result = await connection.confirmTransaction(
          signature,
          "singleGossip"
        );
        console.log("money sent", result);
      } catch (e) {
        console.warn("Failed", e);
      }
    })();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 className="title">Solana-Classic</h1>
      {pubKey && <div>Connected!</div>}
      <button className="button" onClick={() => connectWalletPhantom()}>
        Connect
      </button>

      <button className="button" onClick={() => disconnect()}>
        Disconnect
      </button>

      <button
        className="button"
        onClick={() => signInTransactionAndSendMoney("var", 10)}
      >
        Send Token
      </button>
    </div>
  );
};

export default PageSolanaClassic;
