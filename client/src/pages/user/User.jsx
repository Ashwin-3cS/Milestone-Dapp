import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import contractABI from "../../ContractAbi/ContractAbi.json";
import Web3 from 'web3'; // Import the Web3 library

function User() {
  const [milestones, setMilestones] = useState([]);
  const [userAddress, setUserAddress] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const contractAddress = "0x00A0e8046D425Fc80a82f3D41081D882A3985F55";
  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(contractABI, contractAddress);

  useEffect(() => {
    async function fetchMilestones() {
      try {
        const accounts = await web3.eth.getAccounts();
        setUserAddress(accounts[0]);
        const response = await contract.methods.getMilestones(accounts[0]).call();
        setMilestones(response[0]);
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    }

    if (window.ethereum) {
      fetchMilestones();
    } else {
      console.error("No web3 provider detected");
    }
  }, []);

  async function handlePayment(receiver, amount) {
    if (!amount || amount <= 0) {
      console.error("Invalid amount");
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      const weiAmount = web3.utils.toWei(amount, 'ether');
      const gasPrice = await web3.eth.getGasPrice(); // Get the current gas price
      const transaction = await web3.eth.sendTransaction({
        from: accounts[0],
        to: receiver,
        value: weiAmount, // Amount in Wei
        gas: 100000, // Setting a very low gas limit
        gasPrice: gasPrice, // Use the current gas price
      });
      console.log(`Transaction Hash: ${transaction.transactionHash}`);
      setPaymentCompleted(true);
    } catch (error) {
      console.error("Error sending Ether:", error);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Milestones for {userAddress}</h1>
        {paymentCompleted && (
          <p className="text-green-500">Transaction completed successfully!</p>
        )}
        {milestones.length === 0 ? (
          <p>No milestones found.</p>
        ) : (
          milestones.map((milestone, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl mb-2">Milestone {index + 1}</h2>
              <div>
                <h3 className="text-lg mb-1">Places:</h3>
                <ul className="list-disc pl-5">
                  {milestone.map((placeName, placeIndex) => (
                    <li key={placeIndex}>{placeName}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  placeholder="Amount in Ether"
                  id={`amount-${index}`}
                  className="input input-bordered mb-2 mr-2"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const amount = document.getElementById(`amount-${index}`).value;
                    handlePayment(userAddress, amount);
                  }}
                >
                  Pay
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default User;
