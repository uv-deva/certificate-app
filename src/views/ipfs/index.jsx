import { useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCertificateIpfs,
  getNonce,
} from "../../redux/actions/certificate";
import {
  selectItems,
  selectTableIsDone,
  selectItemsError,
} from "../../redux/selectors/certificate";
import logo from '@src/assets/images/logo/logo.png'
import { useSDK } from "@metamask/sdk-react";
import warning from "../../assets/images/warning.png";
import { useParams } from "react-router-dom";
import detectEthereumProvider from '@metamask/detect-provider';
import ToastContent from "../../components/Toast"
import { Slide, toast } from "react-toastify"

const CertificatesData = () => {
  const dispatch = useDispatch();
  const {
    sdk,
    ethereum,
    connected,
    connecting,
    provider,
    chainId,
    account,
    balance,
  } = useSDK();
  const nonce = useSelector(selectItems("nonce"));
  const isDone = useSelector(selectTableIsDone("nonce"));
  const ipfsData = useSelector(selectItems("ipfs"));
  const errorText = useSelector(selectItemsError("ipfs"));
  const [done, setDone] = useState(isDone);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccount] = useState(null);
  const [signature, setSignature] = useState(null);
  const [status, setStatus] = useState(false);
  var isNonceLoading = false;
  const { certificateId } = useParams();

  useMemo(() => {
    if (nonce) {
      isNonceLoading = false
    }
  },[nonce])

  // const certificateId = document.location.href.split("/").pop();

  useEffect(() => {
    const walletConnect = async () => {
      try {
        const data = await sdk?.connect();
        if (data) {
          setAccount(data[0]);
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    };

    walletConnect();
  }, []);

  useEffect(() => {
    if (web3 !== null) return; // Skip if MetaMask not detected

    const requestAccount = async () => {
      try {
        if (window.ethereum) {
          const _web3 = new Web3(window.ethereum);
          const targetNetworkId = 421614;
          if (parseInt(chainId) !== targetNetworkId) {
            try {
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: `0x${targetNetworkId.toString(16)}` }],
              });
            } catch (error) {
              console.error(error);
              if (error.code === 4902) {
                try {
                  const network = {
                    chainId: `0x${targetNetworkId.toString(16)}`,
                    chainName: "Arbitrum Sepolia",
                    nativeCurrency: {
                      name: "Ethereum",
                      symbol: "ETH",
                      decimals: 18,
                    },
                    rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
                    blockExplorerUrls: ["https://sepolia.arbiscan.io"],
                  };
                  await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [network],
                  });
                } catch (addError) {
                  console.error("Failed to add network:", addError);
                }
              }
            }
          }
          const wallet = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWeb3(_web3);
          if (!isNonceLoading && nonce.length == 0) {
            isNonceLoading = true
            
            dispatch(getNonce(wallet[0]));
          }
        }
      } catch (error) {
        console.error("Error requesting accounts:", error);
      }
    };
    requestAccount();
  }, []);

  const fetchIpfs = async (sign) => {
    const data = {
      walletAddress: accounts,
      signature: sign,
      certificateId,
    };
    dispatch(fetchCertificateIpfs(data));
  };
  useEffect(() => {
    console.log(done, isDone, nonce, signature, account, accounts, status);
    if (done === false && isDone === true && nonce && status === false) {
      
      setStatus(true);
      if (web3 !== null && nonce) {
        const generateSignature = async () => {
          toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={`demo2, ${account}, ${nonce}`}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
          const message = await web3.utils.soliditySha3(nonce, account);
        toast.error(
          <ToastContent
              type="error"
              title={`OOOPS!`}
              body={`demo2, ${message}`}
          />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
          const sign = await provider.request({
            method: "personal_sign",
            params: ["message", account],
          });
          toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={`sign, ${sign}`}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
          fetchIpfs(sign);
          setSignature(sign);
        };
        if (!signature) generateSignature();
      }
    }
  }, [done, isDone, nonce, signature]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src={ipfsData.length > 0 ? `data:image/png;base64,${ipfsData}` : logo}
        alt="Image"
        style={{ width: "40%" }}
      />
      {errorText.length > 0 && (
        <img
          src={warning}
          alt="Image"
          style={{
            position: "absolute",
            top: "20%",
            left: "25%",
            width: "50%",
            height: "80%",
          }}
        />
      )}
    </div>
  );
};

export default CertificatesData;