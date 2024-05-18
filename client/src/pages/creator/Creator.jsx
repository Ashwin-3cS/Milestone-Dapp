import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Web3 from 'web3'; // Import the Web3 library
import contractABI from '../../ContractAbi/ContractAbi.json';

function Creator() {
  const [connected, setConnected] = useState(false);
  const [placeNames, setPlaceNames] = useState(['']);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  const contractAddress = "0x00A0e8046D425Fc80a82f3D41081D882A3985F55";
  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(contractABI, contractAddress);

  async function createMilestone() {
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        throw new Error('No MetaMask accounts found');
      }

      await contract.methods.createMilestone(placeNames).send({
        from: accounts[0]
      });
      console.log('Milestone created successfully');
    } catch (error) {
      console.error("Error creating milestone:", error);
    }
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        if (accounts.length === 0) {
          throw new Error('No MetaMask accounts found');
        }

        setConnected(accounts[0]);
        setFormVisible(true);
      } catch (err) {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error("Error connecting to MetaMask:", err);
        }
      }
    } else {
      console.error("No web3 provider detected");
      document.getElementById("connectMessage").innerText = "No web3 provider detected. Please install MetaMask.";
    }
  }

  function shortAddress(address, startLength = 6, endLength = 4) {
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  }

  const handlePlaceNameChange = (index, event) => {
    const newPlaceNames = [...placeNames];
    newPlaceNames[index] = event.target.value;
    setPlaceNames(newPlaceNames);
  };

  const addPlaceInput = () => {
    setPlaceNames([...placeNames, '']);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMilestone();
  };

  return (
    <div className="hero-overlay bg-opacity-60 min-h-screen flex flex-col items-center">
      <NavBar />
      <div className='flex justify-center items-center flex-col mt-8'>
        <button className="btn btn-outline mb-4" onClick={connectWallet}>Connect Metamask</button>
        <h1 className='mt-2'>
          {connected ? (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg">
              CONNECTED TO: <span className="font-bold">{shortAddress(connected)}</span>
            </span>
          ) : (
            "Not connected"
          )}
        </h1>
      </div>
      {formVisible && (
        <form className="flex justify-center items-center flex-col rounded-lg p-6 border border-gray-300 bg-black shadow-lg mt-8" onSubmit={handleSubmit}>
          {placeNames.map((placeName, index) => (
            <div key={index} className="mb-4">
              <label className='italic text-white'>
                Place Name {index + 1}:
                <input
                  type="text"
                  value={placeName}
                  onChange={(e) => handlePlaceNameChange(index, e)}
                  className="ml-2 p-2 border rounded"
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addPlaceInput} className="mb-4 p-2 bg-blue-500 text-white rounded italic">Add Another Place</button>
          <div className="mb-4 w-full">
            <label className="block text-white text-sm font-bold mb-2 italic">
              Description:
              <textarea 
                value={description}
                onChange={handleDescriptionChange}
                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
              />
            </label>
          </div>
          <div className="mb-4 w-full">
            <label className="block text-white text-sm font-bold mb-2 italic">
              Image URL:
              <input
                type="text"
                value={image}
                onChange={handleImageChange}
                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
          </div>
          <button className="btn btn-outline p-2 bg-green-500 text-white rounded italic" type="submit">Create Milestone</button>
        </form>
      )}
    </div>
  );
}

export default Creator;
