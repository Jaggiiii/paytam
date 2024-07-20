import { useState } from "react"
import { Spinner } from "../components/spinner";
import axios from "axios";
import { Backend_url } from "../config";
import { useNavigate } from "react-router-dom";
import { GetSenderDetails } from "../components/gettingsendername";

export const Delete = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const sender = GetSenderDetails();

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
                       click on the button to delete the current account
                    </div>
                   
                </div>
            </div>
        </div>
    }

    const Delete = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error(" n users found");
        }
        try {
            await axios.delete(`${Backend_url}/api/v1/transcation/delete`, {
                headers: {
                    Authorization: `${token}`
                }
            })

            localStorage.removeItem("token");
            alert("deleted successfully");
            navigate('/signup');
        }
        catch (e) {
            console.error("not able to delete the user", e)
        }
        finally {
            setLoading(false);
        }
    }
    if (loading) {
        return <div>
            <Spinner props="deleting" />
        </div>
    }

    return <div>
        <Appbarrr/>
          <div className="flex justify-center h-screen bg-slate-200">
            <div className="flex justify-center flex-col">
                <div className="rounded-lg  w-80 h-max p-2 px-2 ">
                    <div>
                    <button onClick={Delete} type="button" className="flex items-center  mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                     Delete
                </button>
                    </div>
                </div>
            </div>
          </div>
    </div>
}