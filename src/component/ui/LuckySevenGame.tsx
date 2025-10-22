


import { useState } from 'react';
import BetSlip from './BetSlip';

interface BetInfo {
  market: string;
  odds: string;
}

function LuckySevenGame() {
  const [message, setMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [selectedBet, setSelectedBet] = useState<BetInfo | null>(null);

  const handleBet = (market: string, odds: string) => {
    setSelectedBet({ market, odds });
  };

  const handlePlaceBet = (amount: number) => {
    if (selectedBet) {
      setMessage(`Placed bet of ₹${amount} on ${selectedBet.market} at ${selectedBet.odds}`);
      setShowMessage(true);
      setSelectedBet(null);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-5">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 pt-6">
          <h1 className="text-4xl font-bold text-white mb-2">Lucky Seven Game</h1>
          <p className="text-gray-300 text-lg">Try your luck and hit the jackpot!</p>
        </div>

        {/* Toast Message */}
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-300 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
          {message}
        </div>

        {/* Main Market Section */}
        <div className="mb-8">
          <div className="text-xl mb-3">Main Market</div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleBet('7 UP', '3.75')}
              className="bg-white text-black p-4 rounded hover:bg-gray-200 transition duration-200">
              7 UP<br/><strong>3.75</strong>
            </button>
            <button 
              onClick={() => handleBet('7 DOWN', '3.75')}
              className="bg-white text-black p-4 rounded hover:bg-gray-200 transition duration-200">
              7 DOWN<br/><strong>3.75</strong>
            </button>
            <button 
              onClick={() => handleBet('7', '3.75')}
              className="bg-white text-black p-4 rounded hover:bg-gray-200 transition duration-200 col-span-2">
              7<br/><strong>3.75</strong>
            </button>
          </div>
        </div>

        {/* Card Selection Section */}
        <div className="mb-8">
          <div className="text-xl mb-3">Card Selection</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'RED', odds: '3.75' },
              { name: 'BLACK', odds: '3.75' },
              { name: 'ODD', odds: '3.75' },
              { name: 'EVEN', odds: '3.75' }
            ].map(option => (
              <button 
                key={option.name}
                onClick={() => handleBet(option.name, option.odds)}
                className="bg-white text-black p-4 rounded hover:bg-gray-200">
                {option.name}<br/><strong>{option.odds}</strong>
              </button>
            ))}
          </div>
        </div>

        {/* Trio Cards Section */}
        <div className="mb-8">
          <div className="text-xl mb-3">Trio Cards</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'A,2,3', odds: '3.8' },
              { name: '4,5,6', odds: '3.8' },
              { name: '8,9,10', odds: '3.8' },
              { name: 'J,Q,K', odds: '3.8' }
            ].map(trio => (
              <button 
                key={trio.name}
                onClick={() => handleBet(trio.name, trio.odds)}
                className="bg-white text-black p-4 rounded hover:bg-gray-200">
                {trio.name}<br/><strong>{trio.odds}</strong>
              </button>
            ))}
          </div>
        </div>

        {/* Single Card Section */}
        <div className="mb-8">
          <div className="text-xl mb-3">Single Card</div>
          <div className="grid grid-cols-4 gap-4">
            {['A', '2', '3', '4', '5', '6', '8', '9', 'J', 'Q', 'K'].map(card => (
              <button 
                key={card}
                onClick={() => handleBet(card, '12')}
                className="bg-white text-black p-4 rounded hover:bg-gray-200">
                {card}<br/><strong>12</strong>
              </button>
            ))}
          </div>
        </div>

        {/* Bet Slip */}
        <BetSlip
          bet={selectedBet}
          onClose={() => setSelectedBet(null)}
          onPlaceBet={handlePlaceBet}
        />
      </div>
    </div>
  );
}

export default LuckySevenGame;