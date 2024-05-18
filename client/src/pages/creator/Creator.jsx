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
    <div className="hero-overlay bg-opacity-60">
      <NavBar />
      <div className='flex justify-center items-center flex-col'>
        <button className="btn btn-outline" onClick={connectWallet}>Connect Metamask</button>
        <br />
        <h1 className='mt-2'>{connected ? `CONNECTED TO: ${shortAddress(connected)}` : "Not connected"}</h1>
      </div>
      {formVisible && (
        <form onSubmit={handleSubmit}>
          {placeNames.map((placeName, index) => (
            <div key={index}>
              <label>
                Place Name {index + 1}:
                <input
                  type="text"
                  value={placeName}
                  onChange={(e) => handlePlaceNameChange(index, e)}
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addPlaceInput}>Add Another Place</button> <br />
          <label>
            Description:
            <textarea
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
          <br />
          <label>
            Image URL:
            <input
              type="text"
              value={image}
              onChange={handleImageChange}
            />
          </label>
          <br />
          <button type="submit">Create Milestone</button>
        </form>
      )}
    </div>
  );
}

export default Creator;
