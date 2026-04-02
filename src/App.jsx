import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ElevatorShaft from "./components/ElevatorShaft";
import ExternalControls from "./components/ExternalControls";
import CustomCursor from "./components/CustomCursor";
import { Layers, Activity } from "lucide-react";

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
  const [elevators, setElevators] = useState(
    Array.from({ length: ELEVATORS }, (_, i) => createElevator(i))
  );
  const [totalCalls, setTotalCalls] = useState(0);

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
    <div className="min-h-screen bg-[#050505] text-neutral-200 selection:bg-blue-500/30 cursor-none overflow-hidden">
      <CustomCursor />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a,transparent)]" />
      <div className="fixed inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

      <nav className="relative z-10 px-8 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Layers className="text-white" size={20} />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase">NemoSense <span className="text-blue-500">Systems</span></span>
        </div>
        
        <div className="flex items-center gap-6 text-xs font-mono text-neutral-500 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-green-500" />
            <span>Telemetry Active</span>
          </div>
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md">
            Traffic: {totalCalls}
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-[1400px] mx-auto p-8 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Visualization */}
        <section className="lg:col-span-8 flex justify-around items-end bg-neutral-900/40 border border-white/5 rounded-[40px] p-12 min-h-[700px] backdrop-blur-3xl shadow-3xl">
           {elevators.map((e) => (
             <ElevatorShaft 
               key={e.id} 
               elevator={e} 
               floors={FLOORS} 
               onInternalCall={(f) => updateElevatorTargets(e.id, f)} 
             />
           ))}
        </section>

        {/* Right: Controls */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-neutral-900/40 border border-white/5 p-8 rounded-[32px] backdrop-blur-md">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold tracking-tight">Floor Interface</h2>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">AUTO DISPATCH</span>
            </div>
            <ExternalControls floors={FLOORS} onCall={callElevator} />
          </div>
        </aside>
      </main>
      
      <footer className="fixed bottom-6 left-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
        Cinematic Logistics Engine v4.0.2
      </footer>
    </div>
  );
}