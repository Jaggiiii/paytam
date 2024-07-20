import { useEffect, useState } from "react";
import { Appbar } from "./Appbar";
import axios from "axios";
import { Backend_url } from "../config";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { SkeletonLoader } from "../components/skeleton";

interface Users {
  username: string;
  id: string;
  password: string;
  balance: string;
}

interface JwtPayload {
  id: number;
  username: string;
  name: string;
  balance: number;
}

export const Main = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [filters, setFilters] = useState<Users[]>([]);
  const [loading,setLoading] =useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getSenderDetails = (): JwtPayload | null => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const decoded = jwtDecode<JwtPayload>(token);
    console.log("Decoded token:", decoded);
    return decoded;
  };

  const sender = getSenderDetails();

  useEffect(() => {
    async function fetchUsers() {

      try {
        setLoading(true);
        const response = await axios.get(`${Backend_url}/api/v1/transcation/bulk`);
        setUsers(response.data.users);
      } catch (e) {
        console.log("not able to fetch users", e);
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const delayTime = setTimeout(() => {
      setFilters(users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }, 300);
    return () => clearTimeout(delayTime);
  }, [searchTerm, users]);

  const handleSendMoney = (recipient: string) => {
    if (sender) {
      console.log(`Send money from: ${sender.username} to: ${recipient}`);
      navigate("/send", { state: { sender: sender.username, recipient,id:sender.id } });
    } else {
      console.error("Sender details not found");
    }
  };

  if(loading){
    return <div>
      <SkeletonLoader/>
    </div>
  }

  return (
    <div>
      <Appbar />
      <div className="font-semibold text-xl p-3">
        Users
      </div>
      <div className="p-3">
        <input
          type="text"
          value={searchTerm}
          className="w-full px-2 py-1 border-slate-200"
          placeholder="search users"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {filters.map((user) => (
          <div key={user.id} className="flex justify-between p-3 border-b">
            <div className="flex">
              <div className="rounded-full h-12 w-12 flex justify-center bg-slate-200 mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                  {user.username[0]}
                </div>
              </div>
              <div className="flex flex-col justify-center h-full">
                <div>{user.username}</div>
              </div>
            </div>
            <div className="flex flex-col justify-center h-full">
              <button
                type="button"
                className="flex items-center mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => handleSendMoney(user.username)}
              >
                Send money
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
