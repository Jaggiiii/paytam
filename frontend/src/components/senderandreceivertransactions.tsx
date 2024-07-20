


interface Transaction {
    id: number;
    Amount: string;
    timestamp: string;
    sender: {
        username: string;
    };
    receiver: {
        username: string;
    };
}

interface Transcationprops {
    transaction: Transaction;
}

export const Sendertransaction = ({ transaction }: Transcationprops) => {
    return (
        <div className="flex justify-between bg-slate-700 p-2 m-2 rounded-lg">
            <div className="flex">
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" className="w-6 h-6 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>
                <div className="flex items-center justify-center ml-2 flex-col">
                    <div className="flex flex-col">
                        <div className="text-xl text-white">Paid to</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-sm text-slate-200 ml-1">{transaction.receiver.username}</div>
                    </div>
                </div>
                <div className="flex items-center justify-center text-white ">
                    <div>
                    <span className="text-green-600 font-bold " > Time :</span> {transaction.timestamp}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center bg-white text-black rounded-md p-1">
                {transaction.Amount}
            </div>
        </div>
    );
}


export const Receivertranscation = ({ transaction }: Transcationprops) => {
    return (
        <div className="flex justify-between bg-slate-200 p-2 m-2 rounded-lg">
            <div className="flex">
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" className="w-6 h-6 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                    </svg>
                </div>
                <div className="flex items-center justify-center ml-2" >
                    <div className="flex flex-col">
                        <div className="text-xl text-white">Received</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-sm text-slate-200 ml-1">{transaction.sender.username}</div>
                    </div>
                </div>
                <div className="flex items-center justify-center text-white ">
                    <div>
                        <span className="text-green-600" > Time :</span> {transaction.timestamp}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center text-white">
                <div>
                    {transaction.Amount}
                </div>

            </div>
        </div>
    );
}
