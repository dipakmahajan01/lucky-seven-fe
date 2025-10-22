import React, { useState } from 'react';

interface BetSlipProps {
    bet: {
        market: string;
        odds: string;
    } | null;
    onClose: () => void;
    onPlaceBet: (amount: number) => void;
}

export default function BetSlip({ bet, onClose, onPlaceBet }: BetSlipProps) {
    const [amount, setAmount] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const betAmount = Number(amount);
        if (!betAmount || betAmount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        onPlaceBet(betAmount);
        setAmount('');
    };

    if (!bet) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-lg p-6 w-96 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Place Bet</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between mb-2">
                        <span>Market:</span>
                        <span className="font-semibold">{bet.market}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Odds:</span>
                        <span className="font-semibold">{bet.odds}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Bet Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter amount"
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>

                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={() => setAmount('100')}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            ₹100
                        </button>
                        <button
                            type="button"
                            onClick={() => setAmount('500')}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            ₹500
                        </button>
                        <button
                            type="button"
                            onClick={() => setAmount('1000')}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            ₹1000
                        </button>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Place Bet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}