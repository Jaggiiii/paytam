import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heading } from "../components/heading";
import { Inputbox } from "../components/inputbox";
import axios from "axios";
import { Backend_url } from "../config";
import { Spinner } from "../components/spinner";

export const Sendmoney = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sender, recipient } = location.state as { sender: string, recipient: string };
  const [amount, setAmount] = useState<number | null>(null);
  const [loading,setLoadong] =useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleSendMoney = async () => {
    try {
      setLoadong(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(`${Backend_url}/api/v1/transcation/send`,
        {
          sendername: sender,
          receivername: recipient,
          amount: amount,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("Transaction successful:", response.data);
     
      navigate("/paymentbox",{state:{sender:sender,recipient,amount:amount}}); // Redirect to main page after successful transaction
    } catch (error) {
      console.error("Error sending money:", error);
      alert("Error sending money");
    }
    setLoadong(false);
  };

  if (loading) {
    return <div>
      <Spinner props="connecting securely"/>
    </div>;
  }

  return (
    <div>
      <div className="flex justify-center h-screen bg-slate-200">
        <div className="flex justify-center flex-col">
          <div className="h-min border text-card-foreground max-w-md p-4 space-y-8 bg-white w-96 rounded-lg">
            <div className="text-center">
              <Heading heading="Send money" />
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3 rounded-full bg-green-500 flex items-center justify-center">A</div>
              <div className="text-xl font-bold">Friend's name: {recipient}</div>
            </div>
            <Inputbox name="amount" placeholder="Enter amount" onChange={handleAmountChange} />
            <button onClick={handleSendMoney} className="w-full mt-3 py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
              Send Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
