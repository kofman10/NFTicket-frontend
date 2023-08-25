import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Upload from "../components/Upload";
import AppContext from "../../context/AppContext";
import Header from "../components/Header";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";
import { contractAddresses, NFT2abi, NFticketabi } from "../../constants";

import { ethers } from "ethers";
import Eventcard from "../components/Eventcard";

const events = () => {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const NfticketAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const supportedChains = ["84531"];

  const [events, setEvents] = useState([]);

  const NFTicketAddress = "0xa53C8A63fe130a0DDCa15Bfcbb9d28e56b99BeDF";

  const dispatch = useNotification();

  const [provider, setProvider] = useState();
  useEffect(() => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
  }, []);

  const NfticketContract = new ethers.Contract(
    NFTicketAddress,
    NFticketabi,
    provider
  );

  const { runContractFunction: getTotalEvent } = useWeb3Contract({
    abi: NFticketabi,
    contractAddress: NfticketAddress,
    functionName: "getTotalEvent",
    params: {},
  });

  //    const { runContractFunction: purchaseNormal } = useWeb3Contract({
  //           abi: NFT2abi,
  //           contractAddress: raffleAddress,
  //           functionName: "purchaseNormal",
  //           params: { amount : 1 },
  //       })

  async function updateUIValues() {
    const totalEvents = (
      await getTotalEvent({
        onError: (error) => console.log(error),
      })
    ).toString();

    const eventaa = [];
    for (let i = 1; i <= totalEvents; i++) {
      const eventa = await NfticketContract.getEvent(i);
      eventaa.push(eventa);
    }
    setEvents(eventaa);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    }
  }, [isWeb3Enabled]);

  return (
    <div className="bg-[#090922] h-screen">
      <Header />
      <h1 className="text-center text-yellow-100 text-5xl font-bold mt-10">
        EVENT LISTS
      </h1>
      {supportedChains.includes(parseInt(chainId).toString()) ? (
        <div>
          {events.map((event, index) => (
            <div className="bg-[#090922] flex flex-col gap-10">
              <Eventcard key={index} event={event} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-5xl text-white"> Connect your wallet to Base-goerli testnet chain</p>
      )}
    </div>
  );
};

export default events;
