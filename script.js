window.addEventListener("load", async () => {
  let web3;
  let contract;

  const contractABI = [
    {
      inputs: [],
      name: "mintNFT",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const contractAddress = "0x570c934ffa07de37a9ec1639bd58f5ffc03494dd";
  const rpcURL =
    "https://polygon-mainnet.g.alchemy.com/v2/GVWi59Zd_weqiDY_nVNGoE6lU6ZKjvi-";

  const init = async () => {
    if (window.ethereum) {
      console.log("Ethereum provider detected");
      window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(contractABI, contractAddress);
      document.getElementById("mint").disabled = false;
    } else {
      console.log("No Ethereum provider detected");
    }
  };

  const mintNFT = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length === 0) {
      console.log("No Ethereum accounts available");
      return;
    }

    const account = accounts[0];
    try {
      const result = await contract.methods.mintNFT().send({ from: account });
      console.log("Mint NFT result:", result);
    } catch (error) {
      console.error("Mint NFT error:", error);
    }
  };

  document.getElementById("connect").addEventListener("click", init);
  document.getElementById("mint").addEventListener("click", mintNFT);
});
