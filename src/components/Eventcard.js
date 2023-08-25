import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";
import { contractAddresses, NFT2abi, NFticketabi } from "../../constants";

const Eventcard = ({ event }) => {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const NfticketAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const supportedChains = ["84531", "11155111"];
  const dispatch = useNotification();

  const {
    runContractFunction: callNft2,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: NFticketabi,
    contractAddress: NfticketAddress,
    functionName: "callNft2",
    msgValue: event.ticketPriceNormal.toString(),
    params: { amount: 1 },
  });
  const [loading, setLoading] = useState(false);

  const { runContractFunction: availableTickets } = useWeb3Contract({
    abi: NFT2abi,
    contractAddress: event.NFTAddress,
    functionName: "availableTickets",
    params: {},
  });

  const { runContractFunction: TokenId } = useWeb3Contract({
    abi: NFT2abi,
    contractAddress: event.NFTAddress,
    functionName: "TokenId",
    params: {},
  });

  const [totalTickets, setTotalTickets] = useState("0");
  let [tokenId, setTokenId] = useState("0")

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      handleNewNotification(tx);
    } catch (error) {
      toast.error(error);
    }
  };

  async function updateUIValues() {
    const totalTicketsCall = (await availableTickets()).toString();
    const tokenIdCall = (await TokenId()).toString()
    setTotalTickets(totalTicketsCall);
    setTokenId(tokenIdCall)
  }
  const handlePurchase = async () => {
    try {
      await callNft2({
        // onComplete: setLoading(true),
        
        // onError
        onSuccess: handleSuccess,
        onError: (error) => console.log(error),
      }).then((result) => {
        if (!result) {
          toast.error("transaction rejected");
        } else {
          toast.success(
            "You have requested to buy a ticket, wait 10 seconds to see completion of your transaction !"
          );
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    }
  }, [isWeb3Enabled]);

  return (
    <>
      <ToastContainer />
    <div className = 'bg-[#090922] mx-10'> 
    { totalTickets != 0 && 
      <div className=" bg-white items-center p-5 rounded-lg">
        <div className=" mr-5 text-lg">
          <p><b>EVENT NAME:</b>  {event.name}</p>
          <p><b>EVENT LOCATION:</b> {event.location}</p>
        </div>

        <div className="mt-10 mr-5">
          <p><b>EVENT DATE:</b> {event.date}</p>
          <p className="pt-5">This is your token Id {tokenId} along with the contract address {event.NFTAddress} , ENSURE TO ADD TO METAMASK IMMEDIATELY</p>
        </div>

        <div className="mt-10 mr-5">
          <p>
          <b> PRICE:</b> {ethers.utils.formatEther(event.ticketPriceNormal.toString())}ETH
          </p>
          <p><b>AVAILABLE TICKETS:</b> {totalTickets}</p>
        </div>

        <div className="mt-10 mr-5 w-72">
          <button
            disabled={isLoading || (isFetching && loading)}
            onClick={handlePurchase}
            className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
          >
            {" "}
            {isLoading || (isFetching && loading) ? (
               <div className = 'flex justify-center'> 
               <div className="animate-spin  spinner-border h-8 w-8 border-b-2 rounded-full"></div>
           </div> 
            ) : (
              "Purchase ticket"
            )}
          </button>{" "}
        </div>
      </div> }
      </div>
    </>
  );
};

export default Eventcard;

// uint256 id;
// string name;
// address eventOwner;
// uint256 ticketPriceNormal;
// uint256 totalSupplyNormal;
// string date;
// string location;
// address NFTAddress;
