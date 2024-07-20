

import { Link } from "react-router-dom"
import { GetSenderDetails } from "../components/gettingsendername";


export const Appbar = () => {



    const sender = GetSenderDetails()
    return <div>
        <div className="flex justify-between border-b-2 ">
            <div className="flex items-center">
                <div className="p-4">Paytm App</div>
                <button type="button" className="flex items-center  mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <Link to={'/balance'}>Balance</Link></button>
                <button type="button" className="flex items-center  mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <Link to={'/history'}>History</Link>
                </button>
                <button type="button" className="flex items-center  mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <Link to={'/delete'}>delete account</Link>
                </button>
                <button type="button" className="flex items-center  mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <Link to={'/update'}>update credentials</Link>
                </button>
            </div>
            <div className=" flex items-center p-4">
                <div> {sender?.username} </div>
                <div className="w-7 h-7 rounded-full flex items-center justify-center ml-3 bg-slate-200">U </div>
            </div>
        </div>
    </div>
}