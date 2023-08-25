import Image from "next/image";
import { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JWT = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2ZTlkZDc4MC0zM2Q1LTRlNTAtYWY1Yy05OGJhNTdlOGZjMzAiLCJlbWFpbCI6Imtham90b25pc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYWI1YzZmNTMzYzc3MzJiYzI4YWQiLCJzY29wZWRLZXlTZWNyZXQiOiI0YzI3Y2JlOTAwYWNkMjI4NGQ4OTljNWRhZDhiNjFlMTYyOGYzMTZiNWY3M2UwMzAwODg4ZDQ4ZmNhNzJmODJiIiwiaWF0IjoxNjkyNDcxMTk3fQ.2Bafq8DU8snn213xCaSQYHATrxRuTUFBuqcAj71w8N8"
import AppContext from "../../context/AppContext";

export default function Upload() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [loading, setLoading] = useState(false);

  const context = useContext(AppContext);

  const changeHandler = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
      name: "File name",
      description: "a monkey chilling with the bros",
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );
      setFileHash(res.data.IpfsHash);
    } catch (error) {
      toast.error(error);
      console.log(error)
    }
  };

  const handleSubmission = async () => {
    const metaData = JSON.stringify({
      name,
      description,
      image: `ipfs://${fileHash}`,
    });

    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metaData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: JWT,
          },
        }
      );
    toast.success("submitted NFT details now click next")
      setLoading(false);
      context.setNameContext(res.data.IpfsHash);
    } catch (error) {
      setLoading(false);

      toast.error(error);
    }
  };

  return (
    <>
    <div className = 'flex flex-col gap-8'>
          <p className = 'text-center'>CREATE YOUR TICKET</p>
      <input type="file" required onChange={changeHandler} />

      <div className="mt-3 flex flex-col gap-3">
        <input
          required
          type="text"
          className="border p-2 text-lg border-b-6"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-3 flex flex-col gap-3">
        <input
          required
          type="text"
          className="border p-2 text-lg border-b-6"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      <button className = 'px-3 py-2 text-lg rounded-md w-full text-white bg-green-500 mb-5 mt-5' onClick={handleSubmission}>  {loading ? (
                           <div className = 'flex justify-center'> 
                               <div className="animate-spin  spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                           </div> 
                        ) : (
                            "Submit"
                        )}</button>
      </div>
    </div>
    </>
  );
}

// string memory _name,
// string memory _date,
// string memory _location,
// uint256  _ticketPriceNormal,
// uint256 _totalSupplyNormal,
// string memory _uri
