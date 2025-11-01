import { useState, useEffect, useRef } from 'react';
import BetSlip from './BetSlip';
import socket from '../../common/socket';
import Profile from './Profile';
// import Profile from './Profile';
interface BetInfo {
  market: string;
  odds: string;
}

const mockUserData = {
  name: "John Doe",
  balance: 10000,
  email: "john@example.com",
};

function LuckySevenGame() {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [selectedBet, setSelectedBet] = useState<BetInfo | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [gameDetails, setGameDetails] = useState([]);
  const [timer, setTimer] = useState("");
  // const [phase, setPhase] = useState("");

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleBet = (market: string, odds: string) => {
    setSelectedBet({ market, odds });
  };

  const handlePlaceBet = (amount: number) => {
    if( gameDetails && gameDetails.gameState !== "betting"){
      setMessage(`Betting is closed for this round.`);
      setShowMessage(true); 
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }
    if (selectedBet) {
      setMessage(`Placed bet of ₹${amount} on ${selectedBet.market} at ${selectedBet.odds}`);
      setShowMessage(true);
      setSelectedBet(null);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };
  // if(timer > 0 ){
   
  //     setTimeout(() => setShowMessage(false), 3000);
  // }
  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  // ✅ Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[data-profile-toggle]')
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

 useEffect(() => {
    // when connected
    socket.on("connect", () => {
      console.log("✅ Connected to game socket", socket.id);
    });

    // initial details from backend
    socket.on("game:initDetails", (data) => {
      console.log("🟢 Initial Game Details:", data);
      if(data && data.gameState === "betting" && data.timer > 0) {
      setMessage(`Place your bets!`);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000); 
      }
      setGameDetails(data);
    });

    // round started
    socket.on("round:start", (data) => {
      console.log("🏁 New round started:", data);
      if(data && data.gameState === "betting" && data.timer > 0) {
      setMessage(`Place your bets!`);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000); 
      }
      setGameDetails((prev) => ({ ...prev, ...data }));
    });

    // timers from backend
    socket.on("game-timer", (data) => {
      console.log("⏱️ Timer:", data);
      setTimer(data);
      // if(gameDetails && gameDetails.gameState === "betting") {
      // }
    });

    // bonus or result phase
    socket.on("phase:bonus", (data) => {
      console.log("🎁 Bonus phase:", data);
      // setPhase("BONUS");
    });

    // round updates
    socket.on("round:update", (data) => {
      console.log("🔄 Round update:", data);
          if(data && data.gameState === "betting" ) {
      setMessage(`Place your bets!`);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000); 
      }
      setGameDetails((prev) => ({ ...prev, ...data }));
    });

    // cleanup all listeners on unmount
    return () => {
      socket.off("connect");
      socket.off("game:initDetails");
      socket.off("round:start");
      socket.off("game-timer");
      socket.off("phase:bonus");
      socket.off("round:update");
    };
  }, []);

//   return { gameDetails, timer, phase };
// };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Profile Toggle Button */}
      <button
        data-profile-toggle
        onClick={toggleProfile}
        className="fixed top-4 left-4 z-30 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>

         <section className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900 via-black to-black opacity-50 pointer-events-none">

          <div className='text-center text-white text-2xl'>
            {/* <span>RoundId:{gameDetails.roundId}</span> */}
          </div>
         </section>

       <section>
          
         <div>
            <h2 className="text-right text-white px-2 py-4 mx-2 border-radius-4 text-4xl mb-4">{gameDetails && gameDetails.gameState === "betting"?timer:0}</h2>
         </div>
       </section>
{/* Sidebar (Profile) */}
{
  <div
    ref={sidebarRef}
    className={`
      fixed top-0 left-0 min-h-screen p-6 border-r border-gray-800 transform transition-transform duration-300 ease-in-out z-20 bg-white
      ${isProfileOpen ? 'translate-x-0' : '-translate-x-full'}
    `}
  >
    <Profile userDetails={mockUserData} />
  </div>
}


      {/* Toast Message */}
      <div
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-300 z-40 ${
          showMessage ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {message}
      </div>

      {/* Main Content */}
      <div className="flex justify-center p-6 pt-16 relative z-10">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Lucky Seven Game</h1>
            <p className="text-gray-300 text-lg">Try your luck and hit the jackpot!</p>
          </div>

          {/* Main Market Section */}
          <div className="mb-8">
            <div className="text-xl mb-3">Main Market</div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleBet('7 UP', '3.75')} className="bg-white text-black p-4 rounded hover:bg-gray-200 transition">
                7 UP<br /><strong>3.75</strong>
              </button>
              <button onClick={() => handleBet('7 DOWN', '3.75')} className="bg-white text-black p-4 rounded hover:bg-gray-200 transition">
                7 DOWN<br /><strong>3.75</strong>
              </button>
              <button onClick={() => handleBet('7', '3.75')} className="bg-white text-black p-4 rounded hover:bg-gray-200 transition col-span-2">
                7<br /><strong>3.75</strong>
              </button>
            </div>
          </div>

          {/* Card Selection */}
          <div className="mb-8">
            <div className="text-xl mb-3">Card Selection</div>
            <div className="grid grid-cols-2 gap-4">
              {['RED', 'BLACK', 'ODD', 'EVEN'].map((name) => (
                <button key={name} onClick={() => handleBet(name, '3.75')} className="bg-white text-black p-4 rounded hover:bg-gray-200 transition">
                  {name}<br /><strong>3.75</strong>
                </button>
              ))}
            </div>
          </div>

          {/* Trio Cards */}
          <div className="mb-8">
            <div className="text-xl mb-3">Trio Cards</div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'A,2,3', odds: '3.8' },
                { name: '4,5,6', odds: '3.8' },
                { name: '8,9,10', odds: '3.8' },
                { name: 'J,Q,K', odds: '3.8' },
              ].map((t) => (
                <button key={t.name} onClick={() => handleBet(t.name, t.odds)} className="bg-white text-black p-4 rounded hover:bg-gray-200 transition">
                  {t.name}<br /><strong>{t.odds}</strong>
                </button>
              ))}
            </div>
          </div>

          {/* Single Card */}
          <div className="mb-8">
            <div className="text-xl mb-3">Single Card</div>
            <div className="grid grid-cols-4 gap-4">
              {['A', '2', '3', '4', '5', '6', '8', '9', 'J', 'Q', 'K'].map((card) => (
                <button key={card} onClick={() => handleBet(card, '12')} className="bg-white text-black p-4 rounded hover:bg-gray-200 transition">
                  {card}<br /><strong>12</strong>
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
    </div>
  );
}

export default LuckySevenGame;
