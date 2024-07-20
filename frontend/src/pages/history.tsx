import axios from "axios";
import { Backend_url } from "../config";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Sendertransaction, Receivertranscation } from "../components/senderandreceivertransactions";
import { Spinner } from "../components/spinner";

interface JwtPayload {
    username: string;
    password: string;
    name: string;
    id: string;
    amount: string;
}

interface Transaction {
    id: number;
    Amount: string; // Use 'Amount' with a capital 'A'
    timestamp :string;
    sender: {
        username: string;
    };
    receiver: {
        username: string;
    };
}

interface TransactionState {
    sended: Transaction[];
    received: Transaction[];
}

export const History = () => {
    const [transactions, setTransactions] = useState<TransactionState>({ sended: [], received: [] });
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token not found");
    }
    const senderDetails = (): JwtPayload | null => {
        const decode = jwtDecode<JwtPayload>(token);
        return decode;
    }
    const k = senderDetails();

    useEffect(() => {
        async function fetchHistory() {
            try {
                setLoading(true);
                const response = await axios.get(`${Backend_url}/api/v1/transcation/history/${k?.id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                setTransactions(response.data);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, [k?.id, token]);

    if(loading){
        return <div>
            <Spinner props="fetching history"/>
        </div>
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Transaction History</h1>
            <div>
                <h2 className="text-xl mb-2">Sent Transactions</h2>
                {transactions.sended.map(transaction => (
                    <Sendertransaction key={transaction.id} transaction={transaction} />
                ))}
            </div>
            <div>
                <h2 className="text-xl mb-2">Received Transactions</h2>
                {transactions.received.map(transaction => (
                    <Receivertranscation key={transaction.id} transaction={transaction} />
                ))}
            </div>
        </div>
    );
}
