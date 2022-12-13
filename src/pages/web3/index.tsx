import { checkPrimeSync } from "crypto";
import { useEffect, useState } from "react";
import Web3 from "web3";
import abi_test from "../../libs/abi/abi_test";
import converter from "hex2dec";
import "./style.css";
const PageWeb3 = () => {
  const [walletAdressChiPo, setWalletAdressChiPo] = useState("");
  const [walletAdressChiBeo, setWalletAdressChiBeo] = useState("");

  const [accountChiPo, setAccountChiPo] = useState<any>();
  const [accountChiBeoBeo, setAccountChiBeoBeo] = useState<any>();

  const [balanceValueChiPo, setBalanceValueChiPo] = useState("");
  const [balanceValueChiBeo, setBalanceValueChiBeo] = useState("");

  const [countTransPo, setCountTransPo] = useState(0);
  const [gasPrice, setGasPrice] = useState("");
  const [networkId, setNetworkId] = useState(0);

  const [contract, setContract] = useState<any>();
  const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

  const web3wallet = new Web3(Web3.givenProvider || "https://localhost:3000");
  const contractAddress = "0xc06fdEbA4F7Fa673aCe5E5440ab3d495133EcE7a";

  const account = web3.eth.accounts.privateKeyToAccount(
    "a6af54efdea3bdf2474c332e76f4d7d8ea27f5cf07804e10a627d11df122ea37"
  );

  const abi = [
    {
      inputs: [],
      name: "get",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "data", type: "string" }],
      name: "set",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  console.log({ account });

  const init = async () => {
    try {
      const contract = await new web3.eth.Contract(abi as any, contractAddress);
      setContract(contract);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getData = async () => {
    const data = await contract.methods.get().call();
    console.log(data);
  };

  const mint = async () => {
    try {
      console.log("wallet", walletAdressChiPo);
      // const data = await contract.methods
      //   .set("Hoang Quang Huy")
      //   .send(
      //     { from: walletAdressChiPo },
      //     function (error: any, transactionHash: any) {
      //       console.log("error", error);
      //       console.log("transact", transactionHash);
      //     }
      //   );

      const data = await contract.methods.set("Hoang Quang Huy").encodeABI();

      const rawTransaction: any = {
        to: contract._address,
        from: account.address,
        data,
        value: "0x0",
      };

      const gas: any = await web3.eth.estimateGas(rawTransaction as any);

      const noncePo = await web3.eth.getTransactionCount(account.address);
      const gasPrice = await web3.eth.getGasPrice();
      const networkIdValue = await web3.eth.net.getId();

      rawTransaction.gas = converter.decToHex(gas.toString());
      rawTransaction.nonce = converter.decToHex(noncePo.toString());
      rawTransaction.chainId = networkIdValue;
      rawTransaction.gasPrice = converter.decToHex(Number(gasPrice).toString());

      console.log("gas", gas);
      console.log("gasPrice", gasPrice);
      console.log("account address", account.address);

      const balance = await web3.eth.getBalance(
        account.address,
        (error, wei) => {
          if (!error) {
            var balance = web3.utils.fromWei(wei);
            console.log("balance:", balance);
          }
        }
      );

      console.log("account", account);

      try {
        console.log("rowTrans", rawTransaction);
        const signedTransaction: any = await account.signTransaction(
          rawTransaction
        );

        console.log("signed:", signedTransaction.rawTransaction);
        const receipt = await web3.eth.sendSignedTransaction(
          signedTransaction.rawTransaction
        );

        console.log("Receipt", receipt);
      } catch (error) {
        console.log("error:", error);
      }

      // console.log("rawTransaction:", rawTransaction);

      // const txHash = await window.ethereum.request({
      //   method: "eth_sendTransaction",
      //   params: [rawTransaction],
      // });

      // console.log("result", txHash);
    } catch (error) {
      console.log("error", error);
    }
  };

  const connectWalletMetaMask = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAdressChiPo(accounts[0]);
        setWalletAdressChiBeo("0x738fa6A03C4D6A7DA79b0dec429f85c10cc574fA");

        // console.log("account:", accounts);
      } catch (error: any) {
        console.log(error?.message);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  // const getCurrentWalletConnected = async () => {
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     try {
  //       const accounts = await window.ethereum.request({
  //         method: "eth_accounts",
  //       });

  //       if (accounts.length > 0) {
  //         setWalletAdress(accounts[0]);
  //       } else {
  //         console.log("Connect to MestaMask using the connect button");
  //       }
  //     } catch (error: any) {
  //       console.log(error?.message);
  //     }
  //   } else {
  //     console.log("Please install MetaMask");
  //   }
  // };

  // const addWalletListener = async () => {
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     window.ethereum.on("accountsChanged", (accounts: any) => {
  //       setWalletAdress(accounts[0]);
  //       console.log(accounts[0]);
  //     });
  //   } else {
  //     setWalletAdress("");
  //     console.log("Please install MetaMask");
  //   }
  // };

  // const connectWallet = async () => {
  //   // const account = await web3.eth.requestAccounts();
  //   const ChiPoAccount = await web3.eth.accounts.privateKeyToAccount(
  //     "a6af54efdea3bdf2474c332e76f4d7d8ea27f5cf07804e10a627d11df122ea37"
  //   );

  //   const ChiBeoAccount = await web3.eth.accounts.privateKeyToAccount(
  //     "b2aa9bef12b2ddef2329654be431d3115a2f18f45223bdac2c64428a57b699d2"
  //   );

  //   console.log("chiPoAccount:", ChiPoAccount);
  //   console.log("chiBeoAccount:", ChiBeoAccount);

  //   setAccountChiPo(ChiPoAccount);
  //   setAccountChiBeoBeo(ChiBeoAccount);

  //   setWalletAdressChiPo(ChiPoAccount.address);
  //   setWalletAdressChiBeo(ChiBeoAccount.address);
  // };

  // const loadBalance = async () => {
  //   const balanceChiPo = await web3wallet.eth.getBalance(
  //     walletAdressChiPo,
  //     (error, wei) => {
  //       if (!error) {
  //         var balance = web3wallet.utils.fromWei(wei);
  //         setBalanceValueChiPo(balance);
  //       }
  //     }
  //   );

  //   const balanceChiBeo = await web3wallet.eth.getBalance(
  //     walletAdressChiBeo,
  //     (error, wei) => {
  //       if (!error) {
  //         var balance = web3wallet.utils.fromWei(wei);
  //         setBalanceValueChiBeo(balance);
  //       }
  //     }
  //   );

  //   const noncePo = await web3.eth.getTransactionCount(walletAdressChiPo);

  //   const gasPrice = await web3.eth.getGasPrice();
  //   const networkIdValue = await web3.eth.net.getId();
  //   setCountTransPo(noncePo);
  //   setGasPrice(gasPrice);
  //   setNetworkId(networkIdValue);
  // };

  // const sendToken = async () => {
  //   const gas = 21000;
  //   const rawTransaction = {
  //     to: walletAdressChiBeo,
  //     gas,
  //     gasPrice,
  //     nonce: countTransPo,
  //     value: 0x1,
  //     chainId: networkId,
  //   };

  //   console.log("rawTransaction:", rawTransaction);

  //   const signedTransaction = await accountChiPo.signTransaction(
  //     rawTransaction
  //   );
  //   console.log("Signed Transaction:", signedTransaction);
  //   console.log("Send Transaction:", signedTransaction);

  //   const receipt = signedTransaction.rawTransaction
  //     ? await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
  //     : "";

  //   console.log("Receipt:", receipt);
  // };

  const checkTransactionconfirmation = async (txhash: string) => {
    try {
      const result = await window.ethereum.request({
        method: "eth_getTransactionReceipt",
        params: [txhash],
      });
      if (result !== null) {
        console.log("Transaction confirm", result);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const gas = 21000;

    const rawTransaction = {
      to: walletAdressChiBeo,
      from: walletAdressChiPo,
      gas: gas.toString(),
      gasPrice,
      nonce: countTransPo.toString(),
      value: (0x1).toString(),
      chainId: networkId,
    };

    console.log("rawTransaction:", rawTransaction);

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [rawTransaction],
    });
    // console.log("txHash:", txHash);

    checkTransactionconfirmation(txHash);
  };

  // useEffect(() => {
  //   // loadBalance();
  // }, [walletAdressChiPo, walletAdressChiBeo]);

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1 className="title">Web3</h1>
      <button className="button" onClick={() => connectWalletMetaMask()}>
        Connect
      </button>
      <div className="flex_layout">
        <div className="status">
          {walletAdressChiPo && walletAdressChiPo.length > 0
            ? `Connecting ${walletAdressChiPo.substring(
                0,
                6
              )}...${walletAdressChiPo.substring(38)}`
            : "Available"}
        </div>

        <div className="status">
          {walletAdressChiBeo && walletAdressChiBeo.length > 0
            ? `Connecting ${walletAdressChiBeo.substring(
                0,
                6
              )}...${walletAdressChiBeo.substring(38)}`
            : "Available"}
        </div>
      </div>

      <div className="flex_layout">
        <div>
          <div className="balance">
            ChiPo balance:&nbsp;
            <span className="balance_value">{`${
              balanceValueChiPo ? balanceValueChiPo : 0
            } BNB`}</span>
          </div>
          <div className="balance">
            ChiPo count Trans:&nbsp;
            <span className="balance_value">{countTransPo}</span>
          </div>
        </div>

        <div>
          <div className="balance">
            ChiBeo balance:&nbsp;
            <span className="balance_value">{`${
              balanceValueChiBeo ? balanceValueChiBeo : 0
            } BNB`}</span>
          </div>
          {/* <div className="balance">
            ChiBeo count Trans:&nbsp;
            <span className="balance_value">{countTrans}</span>
          </div> */}
        </div>
      </div>
      {/* <button className="button_send" onClick={() => sendToken()}>
        Send
      </button> */}

      <h2
        style={{
          marginTop: "30px",
          textAlign: "center",
          color: "#9692AF",
          fontSize: "30px",
          borderTop: "2px solid white",
          paddingTop: "50px",
        }}
      >
        Send 1 wei BNB Payment
      </h2>
      <div className="form_wrap">
        {/* <form>
          <label htmlFor="">Address </label>
          <input type="text" className="input_custom " />
          <label htmlFor="">Amount</label>
          <input type="text" className="input_custom " />
          <button
            type="submit"
            className="button_send"
            onClick={(e) => handleSubmit(e)}
          >
            Send
          </button>
        </form> */}

        <button
          type="submit"
          className="button_send"
          onClick={(e) => handleSubmit(e)}
        >
          Send
        </button>
      </div>

      <button className="button_send" onClick={() => getData()}>
        Get
      </button>
      <button className="button_send" onClick={() => mint()}>
        Set
      </button>
    </div>
  );
};

export default PageWeb3;
