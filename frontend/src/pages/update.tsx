import { z } from "zod"
import { Heading } from "../components/heading"
import { Inputbox } from "../components/inputbox"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { SignupInput } from "@jagadeeshduppa/july-common"
import axios from "axios"
import { Backend_url } from "../config"
import { Spinner } from "../components/spinner"
export const Update=()=>{
    const[loading,setloading] =useState(false);
    const navigate = useNavigate();
    const [postinputs,setPostinputs] =useState<SignupInput>({
        name:"",
        username:"",
        password:""
    })
    
   

    async function Update() {
        try{
            setloading(true);
        const token =localStorage.getItem("token");
        if(!token){
            throw new Error("user not found");
        }
        const response = await axios.put(`${Backend_url}/api/v1/transcation/update`,postinputs,{
            headers:{
                Authorization :`${token}`
            }
        })
        navigate('/signin');

       }
       catch(e){
        console.error(e)
       }
       finally{setloading(false)}
        
    }
       if(loading){
        return <div>
            <Spinner props="updating"/>
        </div>
       }

    return <div>
        <div className="h-screen flex justify-center bg-slate-200">
            <div className="flex justify-center flex-col ">
                <div className="rounded-lg w-80 h-max p-2 px-2 bg-white text-center">
                   <Heading heading="credentials"/>
                   <Inputbox name ="name" placeholder="jagadeesh" onChange={(e)=>{
                    setPostinputs({
                        ...postinputs,
                        name:e.target.value
                    })
                   }} />
                   <Inputbox name ="username" placeholder="123@gmail.com" onChange={(e)=>{
                    setPostinputs({
                        ...postinputs,
                        username:e.target.value
                    })
                   }} />
                   <Inputbox name ="password" placeholder="...." onChange={(e)=>{
                    setPostinputs({
                        ...postinputs,
                        password:e.target.value
                    })
                   }} />
                   <button onClick={Update}  type="button" className=" w-full  mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"> <Link to={'/main'}>update</Link></button>
                </div>
            </div>
        </div>
    </div>
}