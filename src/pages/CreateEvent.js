import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Upload from "../components/Upload";
import AppContext from "../../context/AppContext";
import Header from "../components/Header";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";
import { contractAddresses, NFT2abi, NFticketabi } from "../../constants";

import { ethers } from "ethers";

//11155111 -sepolia,  84531 - base goerli

const Stepper = () => {
  const context = useContext(AppContext);
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [data, setData] = useState();
  const [state, setState] = useState({
    name: "",
    totalSupply: "",
    ticketPrice: "",
    date: "",
    location: "",
  });

  const updateUIValues = async () => {
    setData(context.nameContext);
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const next = () => {
    if (formNo === 1) {
      setFormNo(formNo + 1);
    } else if (formNo === 2 && state.name && state.date && state.location) {
      setFormNo(formNo + 1);
    } else if (
      formNo === 3 &&
      state.ticketPrice &&
      state.totalSupply &&
      state.uri
    ) {
      setFormNo(formNo + 1);
    } else {
      toast.error("Please fillup all input field");
    }
  };
  const pre = () => {
    setFormNo(formNo - 1);
  };

  //web3 ishh

  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  // These get re-rendered every time due to our connect button!
  const chainId = parseInt(chainIdHex);
  // console.log(`ChainId is ${chainId}`)
  const NfticketAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const supportedChains = ["84531", "11155111"];

  const dispatch = useNotification();

  const {
    runContractFunction: createEvent,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: NFticketabi,
    contractAddress: NfticketAddress,
    functionName: "createEvent",
    params: {
      _name: state.name,
      _date: state.date,
      _location: state.location,
      _ticketPriceNormal: ethers.utils.parseEther(state.ticketPrice || "0"),
      _totalSupplyNormal: state.totalSupply,
      _uri:data,
    },
  });

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
      await tx.wait(1).then((result) => {
        //  console.log(result)
      });
      handleNewNotification(tx);
    } catch (error) {
      toast.error(error);
    }
  };

  const finalSubmit = async () => {
    if (state.ticketPrice && state.totalSupply) {
      toast.success(
        "You have succesfully created an event wait few seconds for transacton completion"
      );
    } else {
      toast.error("Please fillup all input field");
    }
    await createEvent({
      // onComplete:
      // onError
      onSuccess: handleSuccess,
      onError: (error) => toast.error(error),
    });
  };
  // string memory _name,
  // string memory _date,
  // string memory _location,
  // uint256  _ticketPriceNormal,
  // uint256 _totalSupplyNormal,
  // string memory _uri

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    }
  }, [isWeb3Enabled, state]);

  return (
    <>
      <Header />
      <div className = 'bg-[#090922] h-screen'> 
      {isWeb3Enabled ? (
        <div>
          <div className="w-screen h-screen bg-[#090922] flex justify-center items-center">
            <ToastContainer />
            {supportedChains.includes(parseInt(chainId).toString()) ? (
              <div className="card w-1/2 h-3/4 rounded-md shadow-md bg-white p-5">
                <div className="flex justify-center items-center">
                  {formArray.map((v, i) => (
                    <>
                      <div
                        className={`w-[35px] my-3 text-white rounded-full ${
                          formNo - 1 === i ||
                          formNo - 1 === i + 1 ||
                          formNo === formArray.length
                            ? "bg-blue-500"
                            : "bg-slate-400"
                        } h-[35px] flex justify-center items-center`}
                      >
                        {v}
                      </div>
                      {i !== formArray.length - 1 && (
                        <div
                          className={`w-[85px] h-[2px] ${
                            formNo === i + 2 || formNo === formArray.length
                              ? "bg-blue-500"
                              : "bg-slate-400"
                          }`}
                        ></div>
                      )}
                    </>
                  ))}
                </div>
                {formNo === 1 && (
                  <div>
                    <Upload />
                    <div className="mt-4 flex justify-center items-center">
                      <button
                        onClick={next}
                        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {formNo === 2 && (
                  <div className = 'flex flex-col gap-8'>
                    <div className="flex flex-col mb-2">
                      <label className="text-slate-500" htmlFor="varsity">
                        Name
                      </label>
                      <input
                        value={state.name}
                        onChange={inputHandle}
                        className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                        type="text"
                        name="name"
                        placeholder="name"
                        id="varsity"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label className="text-slate-500" htmlFor="session">
                        Date
                      </label>
                      <input
                        value={state.date}
                        onChange={inputHandle}
                        className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                        type="datetime-local"
                        name="date"
                        placeholder="date"
                        id="session"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label className="text-slate-500" htmlFor="address">
                        Location
                      </label>
                      <textarea
                        value={state.location}
                        onChange={inputHandle}
                        row="10"
                        className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                        type="text"
                        name="location"
                        placeholder="location"
                      ></textarea>
                    </div>
                    <div className="mt-4 gap-3 flex justify-center items-center">
                      <button
                        onClick={pre}
                        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                      >
                        Previous
                      </button>
                      <button
                        onClick={next}
                        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {formNo === 3 && (
                  <div className = 'flex flex-col gap-8'>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="district">Ticket Price(ETH)</label>
                      <input
                        value={state.ticketPrice}
                        onChange={inputHandle}
                        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                        type="number"
                        name="ticketPrice"
                        placeholder="Ticket price"
                        id="district"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="thana">Total Supply</label>
                      <input
                        value={state.totalSupply}
                        onChange={inputHandle}
                        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                        type="text"
                        name="totalSupply"
                        placeholder="Total Supply"
                        id="thana"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="post">Uri</label>
                      <input
                        value={`ipfs://${data}`}
                        onChange={inputHandle}
                        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                        type="text"
                        name="uri"
                        placeholder="Uri"
                        id="post"
                      />
                    </div>
                    <div className="mt-4 gap-3 flex justify-center items-center">
                      <button
                        onClick={pre}
                        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                      >
                        Previous
                      </button>
                      <button
                        disabled={isLoading || isFetching}
                        onClick={finalSubmit}
                        className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                      >
                        {" "}
                        {isLoading || isFetching ? (
                          <div className = 'flex justify-center'> 
                          <div className="animate-spin  spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                      </div> 
                        ) : (
                          "Create Event"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-white text-4xl text-center">Please Switch to supported Chain Base Goerli</p>
            )}
          </div>
        </div>
      ) : (
        <h2 className = 'text-center text-5xl text-white pt-32'>Connect your Wallet</h2>
      )}
      </div>
    </>
  );
};

export default Stepper;
