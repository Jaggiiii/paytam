import { useState } from "react";
import { Heading } from "../components/heading";
import { Inputbox } from "../components/inputbox";
import { Paragraph } from "../components/paragraph";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signinInput } from "@jagadeeshduppa/july-common";
import axios from "axios";
import { Backend_url } from "../config";
import { Spinner } from "../components/spinner";



export const Signin = () => {
  
  const [loading,setLoading] = useState(false);
  const [postinputs,setPostInputs] = useState<signinInput>({
    username:"",
    password:""
  })
  const navigate = useNavigate();

async function SendRequest() {
  setLoading(true);
  try{
    const response = await axios.post(`${Backend_url}/api/v1/user/signin`,postinputs);
    console.log("response",response.data);
   const k = response.data.token;
   localStorage.setItem("token",k);
   navigate("/main");
  }
  catch(e){
    console.error(e);
    alert("error while signing in");
  }
  finally{
    setLoading(false);
  }
}

if(loading){
  return <div>
    <Spinner props="signing in"/>
  </div>
}


  return (
    <div className="flex justify-center h-screen bg-slate-200">
      <div className="flex justify-center flex-col">
        <div className="rounded-lg bg-white w-80 p-2 h-max text-center px-4">
          <Heading heading="Sign in" />
          <Paragraph para="Enter the information to create an Account" />
          <Inputbox name="username" placeholder="jagadeesj11@gmail.com" onChange={(e)=>{
            setPostInputs({
              ...postinputs,
              username:e.target.value
            })
          }} />
          <Inputbox name="password" placeholder="...." onChange={(e)=>{
            setPostInputs({
              ...postinputs,
              password:e.target.value
            })
          }} />
          <button onClick={SendRequest} type="button" className=" w-full  mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Sign in</button>
          <div>
            Don't have an Account ? <Link className="hover:underline hover:bg-gray-200" to={'/signup'}> Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};


