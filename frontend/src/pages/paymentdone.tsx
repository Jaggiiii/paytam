import { Link, useLocation } from "react-router-dom"
export const PaymentDone=()=>{
    const location = useLocation();

    const {sender,recipient,amount} =location.state as {sender:string,recipient:string,amount:string}

    function Appbarrr(){
        return <div className="m-2">
            <div className="flex justify-between  border rounded-lg  border-zinc-950 p-2  bg-slate-500">
                <div className="flex">
                    <div className="flex justify-center items-center rounded-full w-12 h-12 bg-green-400 p-2">
                             {recipient[0]}{recipient[1]}
                    </div>
                    <div className="flex items-center justify-center p-2">
                               {recipient}
                    </div>
                </div>
                <div className="flex">
                    <div className="flex items-center justify-center p-3">
                          Amount
                    </div>
                    <div className="flex items-center justify-center p-3 bg-green-400">
                        {amount}
                    </div>
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbarrr/>
        <div className="flex justify-center h-screen bg-200">
            <div className="flex justify-center flex-col">
                <div className=" ronded-lg bg-white w-80 h-max p-2 px-4">
                     <div className="flex ">
                       <div className="items-center flex justify-center">
                       <button type="button" className="flex items-center  mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
           <Link to={'/main'}>Payment Done</Link>
           </button>
                       </div>
                          <div className="items-center flex justify-center"><svg className="h-8 w-8 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
</div>
                     </div>
                </div>
            </div>
        </div>
    </div>
}

