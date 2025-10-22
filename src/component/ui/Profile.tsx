import { useState } from 'react';
import TransactionHistory from './TransactionHistory';
import Settings from './Settings';

interface ProfileProps {
    userDetails: {
        name: string;
        balance: number;
        email: string;
        avatar?: string;
    };
}

type ActiveSection = 'profile' | 'transactions' | 'settings';

export default function Profile({ userDetails }: ProfileProps) {
    const [activeSection, setActiveSection] = useState<ActiveSection>('profile');

    const renderContent = () => {
        switch (activeSection) {
            case 'transactions':
                return <TransactionHistory />;

            case 'settings':
                return <Settings onSave={console.log} />;

            default:
                return (
                    <div className="space-y-6">
                        {/* Avatar & Email */}
                        <div className="flex items-center">
                            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold mr-4 overflow-hidden shadow">
                                {userDetails.avatar ? (
                                    <img
                                        src={userDetails.avatar}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    userDetails.name.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{userDetails.name}</h2>
                                <p className="text-gray-600">{userDetails.email}</p>
                            </div>
                        </div>

                        {/* Balance Area */}
                        <div className="p-4 bg-gray-50 rounded-lg shadow-inner border">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600 font-medium">Balance</span>
                                <span className="text-2xl font-bold text-green-600">
                                    ₹{userDetails.balance.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                                    Add Money
                                </button>
                                <button className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-md hover:bg-indigo-50 transition">
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-xl p-6">
            {/* ✅ Reverse layout: content left, tabs right */}
            <div className="flex gap-6 flex-row-reverse">
                
                {/* ✅ Tabs on Right */}
                <div className="w-36 border-l border-gray-200 pl-2 space-y-2">

                    <button
                        onClick={() => setActiveSection('profile')}
                        className={`w-full text-left px-3 py-2 rounded-lg font-medium transition
                            ${activeSection === 'profile'
                                ? 'bg-indigo-600 text-white shadow'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Profile
                    </button>

                    <button
                        onClick={() => setActiveSection('transactions')}
                        className={`w-full text-left px-3 py-2 rounded-lg font-medium transition
                            ${activeSection === 'transactions'
                                ? 'bg-indigo-600 text-white shadow'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Transactions
                    </button>

                    <button
                        onClick={() => setActiveSection('settings')}
                        className={`w-full text-left px-3 py-2 rounded-lg font-medium transition
                            ${activeSection === 'settings'
                                ? 'bg-indigo-600 text-white shadow'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Settings
                    </button>

                    {/* Logout */}
                    <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium mt-8">
                        Logout
                    </button>
                </div>

                {/* ✅ Content on Left */}
                <div className="flex-1 pr-2">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
