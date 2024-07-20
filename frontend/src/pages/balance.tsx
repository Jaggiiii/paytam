import axios from "axios";
import { Link} from "react-router-dom"
import { Backend_url } from "../config";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

import { Spinner } from "../components/spinner";


interface JwtPayload {
    id: number;
    username: string;
    name: string;
    balance: number;
  }

export const Balance =()=>{
    const [balance,setBalance] = useState<number|null>(null);
    const [loading,setLoading] = useState(false);
    const getSenderDetails = (): JwtPayload | null => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
    
        const decoded = jwtDecode<JwtPayload>(token);
        console.log("Decoded token:", decoded);
        return decoded;
      };

      const sender =getSenderDetails();
    function Appbarrr(){
        return <div className="m-2">
            <div className="flex justify-between  border rounded-lg  border-zinc-950 p-2  bg-slate-500">
                <div className="flex">
                    <div className="flex justify-center items-center rounded-full w-12 h-12 bg-green-400 p-2">
                             {sender?.username[0]}{sender?.username[1]}
                    </div>
                    <div className="flex items-center justify-center p-2">
                               {sender?.username}
                    </div>
                </div>
                <div className="flex">
                    <div className="flex items-center justify-center p-3">
                          click on the  button to check balance
                    </div>
                </div>
            </div>
        </div>
    }
    const token = localStorage.getItem("token");
    if(!token){
        return " user not found"
    }
    const fetchBalance = async ()=>{
        setLoading(true);
        try{
        const response = await  axios.get(`${Backend_url}/api/v1/transcation/balance/${sender?.id}`,{
            headers:{
                Authorization:`${token}`
            }
          })
          setBalance(response.data.balance);
        }
        catch(e){
            console.error(e);
        }
        finally{
            setLoading(false);
        }
    }

 if(loading){
    return <div>
        <Spinner props="connecting securely"/>
    </div>
 }

    return <div>
        <Appbarrr/>
        <div className="h-screen flex justify-center bg-slate-200">
            <div className="flex justify-center flex-col">
                <div className="flex">
                    <div>
                        {balance!==null?  <div className="flex"> 
                                         <div> 
                                                <button onClick={fetchBalance} className="w-full mt-3 py-2.5 px-5 text-sm font-medium text-gray-900  bg-gray-500  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                                                your balance :{balance}
                                                </button>
                                                </div>
                                                <div>
                                                <button  className="w-full mt-3 py-2.5 px-5 text-sm font-medium text-gray-900  bg-gray-500  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                                                    <Link to={'/main'}> Done</Link>
                                                    </button>
                                                </div>
                                          </div>
                         :  <button onClick={fetchBalance} className="w-full mt-3 py-2.5 px-5 text-sm font-medium text-gray-900  bg-gray-500  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                        check balance
                        </button>}
                    </div>
                    <div>
                    
                    </div>
                       
                </div>
            </div>
        </div>
    </div>
}