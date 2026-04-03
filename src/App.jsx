import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Activity, X, Info, ChevronDown } from "lucide-react";
import CustomCursor from "./components/CustomCursor";
import ElevatorShaft from "./components/ElevatorShaft";
import ExternalControls from "./components/ExternalControls";

// --- Global Styles Injection ---
const GlobalStyles = () => (
  <style>{`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.5); }
    
    html, body { 
      background-color: #050505; 
      color: #e5e5e5; 
      overflow-x: hidden !important; 
      overflow-y: auto !important; 
      -webkit-overflow-scrolling: touch;
      margin: 0;
      padding: 0;
    }
  `}</style>
);

// --- Cinematic Intro Doors Component ---
function IntroDoors({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] flex pointer-events-none overflow-hidden">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ delay: 0.8, duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className="w-1/2 h-full bg-neutral-800 border-r-2 border-neutral-900 flex items-center justify-end relative shadow-[20px_0_50px_rgba(0,0,0,0.8)]"
      >
        <div className="w-4 h-full bg-gradient-to-r from-transparent to-black/30" />
      </motion.div>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ delay: 0.8, duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className="w-1/2 h-full bg-neutral-800 border-l-2 border-neutral-900 flex items-center justify-start relative shadow-[-20px_0_50px_rgba(0,0,0,0.8)]"
      >
        <div className="w-4 h-full bg-gradient-to-l from-transparent to-black/30" />
      </motion.div>
      {/* Central parting glow */}
      <motion.div 
        initial={{ opacity: 1, scaleY: 1 }}
        animate={{ opacity: 0, scaleY: 1.2 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-blue-500/80 shadow-[0_0_30px_rgba(59,130,246,1)]" 
      />
    </div>
  );
}

// --- Welcome Explanation Popup Component ---
function WelcomePopup({ onContinue }) {
  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="bg-neutral-900 border border-blue-500/20 rounded-3xl p-6 md:p-10 max-w-lg w-full shadow-2xl relative overflow-hidden text-center"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <Layers size={32} />
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4 text-white">Real-World Logic Simulation</h2>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
          This simulator demonstrates how real-world elevator dispatch algorithms operate. It accurately calculates proximity, direction of travel, and queued targets to determine the most efficient car to answer your call.
        </p>
        <button
          onClick={onContinue}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-[0.98]"
        >
          Continue to Controls
        </button>
      </motion.div>
    </div>
  );
}

// --- Tutorial Modal Component ---
function TutorialModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Info size={20} />
            </div>
            <h2 className="text-xl font-bold tracking-tight">System Manual</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 text-sm text-gray-300">
          <p>Welcome to the <strong>Elevator Systems</strong> Elevator Simulator. Here is how to operate the module:</p>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center text-gray-400">
                <Bell size={16} />
              </div>
              <div>
                <strong className="text-white block mb-1">External Dispatch</strong>
                <p className="text-xs text-gray-400">Use the right-side control panel to call an elevator to a specific floor. Our algorithm will dispatch the most optimal car.</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-mono text-xs font-bold">
                04
              </div>
              <div>
                <strong className="text-white block mb-1">Internal Selection</strong>
                <p className="text-xs text-gray-400">Expand the Internal Panel beneath any elevator to simulate pressing a destination button inside.</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-[0.98]"
        >
          Acknowledge & Initialize
        </button>
      </motion.div>
    </div>
  );
}

const FLOORS = 11;
const ELEVATORS = 3;

const createElevator = (id) => ({
  id,
  currentFloor: 0,
  direction: "idle",
  targets: [],
  doorsOpen: false,
});

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [controlsExpanded, setControlsExpanded] = useState(false);
  
  const [elevators, setElevators] = useState(
    Array.from({ length: ELEVATORS }, (_, i) => createElevator(i))
  );
  const [totalCalls, setTotalCalls] = useState(0);

  // Intro and Tutorial logic
  const handleIntroComplete = () => {
    setShowIntro(false);
    const hasSeenTutorial = localStorage.getItem('elevator_tutorial_seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  };

  const closeTutorial = () => {
    localStorage.setItem('elevator_tutorial_seen', 'true');
    setShowTutorial(false);
  };

  const handleWelcomeContinue = () => {
    setShowWelcome(false);
    setShowTutorial(true);
  };

  // Elevator dispatch logic
  const callElevator = (floor) => {
    setTotalCalls((t) => t + 1);
    let best = null;
    let minCost = Infinity;

    elevators.forEach((e) => {
      let cost = Math.abs(e.currentFloor - floor);
      if ((e.direction === "up" && floor >= e.currentFloor) || (e.direction === "down" && floor <= e.currentFloor)) cost -= 2;
      if (e.direction === "idle") cost -= 4;
      if (e.targets.includes(floor)) cost = 0; 

      if (cost < minCost) {
        minCost = cost;
        best = e.id;
      }
    });
    updateElevatorTargets(best, floor);
  };

  const updateElevatorTargets = (id, floor) => {
    setElevators((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        if (e.targets.includes(floor)) return e;
        return {
          ...e,
          targets: [...e.targets, floor].sort((a, b) => a - b),
        };
      })
    );
  };

  // Game Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setElevators((prev) =>
        prev.map((e) => {
          if (e.targets.length === 0) return { ...e, direction: "idle" };

          let { currentFloor, direction, targets } = e;
          if (direction === "idle") direction = targets[0] > currentFloor ? "up" : "down";

          if (targets.includes(currentFloor)) return stop(e, currentFloor);

          let next = currentFloor;
          if (direction === "up") {
            const hasHigher = targets.some(f => f > currentFloor);
            if (hasHigher) next += 1;
            else direction = "down";
          } else {
            const hasLower = targets.some(f => f < currentFloor);
            if (hasLower) next -= 1;
            else direction = "up";
          }

          return { ...e, currentFloor: next, direction };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const stop = (e, floor) => {
    setTimeout(() => {
      setElevators((prev) =>
        prev.map((el) => {
          if (el.id !== e.id) return el;
          return {
            ...el,
            doorsOpen: false,
            targets: el.targets.filter((f) => f !== floor),
          };
        })
      );
    }, 2000);
    return { ...e, doorsOpen: true };
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 selection:bg-blue-500/30 lg:cursor-none w-full relative">
      <GlobalStyles />
      <CustomCursor />
      
      {showIntro && <IntroDoors onComplete={handleIntroComplete} />}
      <AnimatePresence>
        {showWelcome && <WelcomePopup key="welcome" onContinue={handleWelcomeContinue} />}
        {showTutorial && <TutorialModal onClose={closeTutorial} />}
      </AnimatePresence>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a,transparent)]" />
      <div className="fixed inset-0 pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22[http://www.w3.org/2000/svg%22%3E%3Cfilter](http://www.w3.org/2000/svg%22%3E%3Cfilter) id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />

      <nav className="relative z-10 px-4 sm:px-8 py-3 sm:py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Layers className="text-white w-4 h-4 md:w-5 md:h-5" />
          </div>
          <span className="text-sm sm:text-base md:text-lg font-black tracking-tighter uppercase">
            Elevator <span className="text-blue-500 hidden sm:inline">Systems</span>
          </span>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6 text-[9px] md:text-xs font-mono text-neutral-500 uppercase tracking-widest">
          <div className="hidden sm:flex items-center gap-2">
            <Activity size={14} className="text-green-500" />
            <span>Telemetry Active</span>
          </div>
          <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 border border-white/10 rounded-md">
            Traffic: {totalCalls}
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-[1400px] mx-auto p-3 sm:p-8 pt-4 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pb-20">
        
        {/* Left: Visualization (Elevator Shafts) */}
        <section className="lg:col-span-7 xl:col-span-8 flex flex-row justify-between sm:justify-around items-end bg-neutral-900/40 border border-white/5 rounded-[24px] md:rounded-[40px] p-3 sm:p-6 md:p-12 min-h-[350px] md:min-h-[700px] backdrop-blur-3xl shadow-2xl gap-2 md:gap-0">
           {elevators.map((e) => (
             <ElevatorShaft 
               key={e.id} 
               elevator={e} 
               floors={FLOORS} 
               onInternalCall={(f) => updateElevatorTargets(e.id, f)} 
             />
           ))}
        </section>

        {/* Right: External Controls */}
        <aside className="lg:col-span-5 xl:col-span-4 w-full">
          <div className="bg-neutral-900/40 border border-white/5 p-4 sm:p-6 md:p-8 rounded-[20px] md:rounded-[32px] backdrop-blur-md">
            <div 
              className="flex items-center justify-between mb-2 lg:mb-8 cursor-pointer lg:cursor-default group"
              onClick={() => setControlsExpanded(!controlsExpanded)}
            >
                <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight">Floor Interface</h2>
                <div className="flex items-center gap-2">
                    <span className="text-[8px] md:text-[10px] font-mono text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">AUTO DISPATCH</span>
                    <button className="lg:hidden p-1.5 bg-white/5 group-hover:bg-white/10 rounded-lg text-gray-300 transition-colors">
                      <ChevronDown size={14} className={`transition-transform duration-300 ${controlsExpanded ? "rotate-180" : ""}`} />
                    </button>
                </div>
            </div>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${controlsExpanded ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0 lg:max-h-[1000px] lg:opacity-100 lg:mt-0'}`}>
              <ExternalControls floors={FLOORS} onCall={callElevator} />
            </div>
          </div>
        </aside>
      </main>
      
      <footer className="relative lg:fixed bottom-3 md:bottom-6 w-full text-center lg:text-left lg:left-8 text-[8px] md:text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] pointer-events-none pb-4 lg:pb-0">
        Elevator Simulator
      </footer>
    </div>
  );
}
