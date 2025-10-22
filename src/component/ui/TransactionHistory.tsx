import { useState } from 'react';

interface Transaction {
    id: string;
    type: 'deposit' | 'withdraw' | 'bet' | 'win';
    amount: number;
    date: string;
    status: 'success' | 'pending' | 'failed';
}

export default function TransactionHistory() {
    // Mock transactions - replace with real data
    const [transactions] = useState<Transaction[]>([
        {
            id: '1',
            type: 'deposit',
            amount: 1000,
            date: '2025-10-22',
            status: 'success'
        },
        {
            id: '2',
            type: 'bet',
            amount: -500,
            date: '2025-10-22',
            status: 'success'
        },
        {
            id: '3',
            type: 'win',
            amount: 1500,
            date: '2025-10-22',
            status: 'success'
        }
    ]);

    const getTypeIcon = (type: Transaction['type']) => {
        switch (type) {
            case 'deposit':
                return '↓';
            case 'withdraw':
                return '↑';
            case 'bet':
                return '🎲';
            case 'win':
                return '🏆';
        }
    };

    const getStatusColor = (status: Transaction['status']) => {
        switch (status) {
            case 'success':
                return 'text-green-500';
            case 'pending':
                return 'text-yellow-500';
            case 'failed':
                return 'text-red-500';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            
            <div className="space-y-4">
                {transactions.map((transaction) => (
                    <div 
                        key={transaction.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getTypeIcon(transaction.type)}</span>
                            <div>
                                <p className="font-medium capitalize">{transaction.type}</p>
                                <p className="text-sm text-gray-500">{transaction.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-IN', {
                                    style: 'currency',
                                    currency: 'INR'
                                })}
                            </p>
                            <p className={`text-sm ${getStatusColor(transaction.status)}`}>
                                {transaction.status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button className="mt-4 w-full text-center text-indigo-600 hover:text-indigo-800 py-2">
                View All Transactions
            </button>
        </div>
    );
}