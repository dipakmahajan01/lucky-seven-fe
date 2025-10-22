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

type ActiveSection = 'profile' | 'transactions' | 'betting' | 'settings';

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
                        <div className="flex items-center">
                            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold mr-4">
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

                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">Balance</span>
                                <span className="text-2xl font-bold text-green-600">₹{userDetails.balance.toLocaleString()}</span>
                            </div>
                            
                            <div className="space-y-4">
                                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
                                    Add Money
                                </button>
                                <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition duration-200">
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveSection('profile')}
                    className={`px-4 py-2 font-medium ${activeSection === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                >
                    Profile
                </button>
                <button
                    onClick={() => setActiveSection('transactions')}
                    className={`px-4 py-2 font-medium ${activeSection === 'transactions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                >
                    Transactions
                </button>
                <button
                    onClick={() => setActiveSection('settings')}
                    className={`px-4 py-2 font-medium ${activeSection === 'settings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                >
                    Settings
                </button>
            </div>

            {/* Content Area */}
            {renderContent()}

            {/* Logout Button */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition duration-200">
                    Logout
                </button>
            </div>
        </div>
    );
}