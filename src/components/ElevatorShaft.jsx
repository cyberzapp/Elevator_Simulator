import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Tilt from "react-parallax-tilt";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function ElevatorShaft({ elevator, floors, onInternalCall }) {
  const carRef = useRef(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    if (carRef.current) {
      gsap.to(carRef.current, {
        bottom: `${(elevator.currentFloor / (floors - 1)) * 90}%`,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, [elevator.currentFloor, floors]);

  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={1000}
      transitionSpeed={1500}
      scale={1.02}
      className="flex flex-col items-center w-[30%] sm:w-28 md:w-36"
    >
      <div className="mb-3 md:mb-6 text-center">
        <div className="text-[8px] md:text-[10px] font-black text-blue-500/50 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1">Unit 0{elevator.id + 1}</div>
        <div className="flex items-center justify-center gap-1.5 md:gap-2">
           <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${elevator.direction !== 'idle' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-700'}`} />
           <span className="text-base md:text-xl font-mono font-bold text-white/90">
             {elevator.currentFloor.toString().padStart(2, '0')}
           </span>
        </div>
      </div>

      <div className="relative w-full h-[220px] sm:h-[350px] md:h-[500px] bg-neutral-900/80 border border-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100% 45.45px' }} />

        <div
          ref={carRef}
          className="absolute left-1 md:left-2 right-1 md:right-2 h-[30px] sm:h-[40px] md:h-[50px] z-20"
          style={{ bottom: '0%' }}
        >
          <div className="h-full w-full bg-neutral-800 rounded-md md:rounded-lg border-t border-white/30 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] overflow-hidden relative">
            <div className="absolute top-0.5 md:top-1 left-0 right-0 flex justify-center gap-1 md:gap-4 opacity-50">
               <ChevronUp size={10} className={elevator.direction === 'up' ? 'text-green-400' : 'text-white/20'} />
               <ChevronDown size={10} className={elevator.direction === 'down' ? 'text-red-400' : 'text-white/20'} />
            </div>

            <div className="flex h-full w-full p-[1px] md:p-[2px]">
              <motion.div 
                animate={{ width: elevator.doorsOpen ? "5%" : "50%" }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="h-full bg-neutral-700 rounded-l-sm border-r border-black/40 relative overflow-hidden"
              >
                <div className="absolute inset-y-0 right-0.5 md:right-1 w-[1px] bg-white/10" />
              </motion.div>
              <motion.div 
                animate={{ width: elevator.doorsOpen ? "5%" : "50%" }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="h-full bg-neutral-700 rounded-r-sm border-l border-black/40 relative overflow-hidden"
              >
                <div className="absolute inset-y-0 left-0.5 md:left-1 w-[1px] bg-white/10" />
              </motion.div>
            </div>
            
            <div className={`absolute inset-0 bg-blue-500/10 pointer-events-none transition-opacity duration-500 ${elevator.doorsOpen ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </div>
      </div>

      <div className="mt-3 md:mt-8 p-1.5 md:p-4 bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl backdrop-blur-xl w-full shadow-xl">
        <div 
           className="flex justify-between items-center cursor-pointer md:cursor-default"
           onClick={() => setIsPanelOpen(!isPanelOpen)}
        >
           <span className="text-[8px] sm:text-[9px] md:text-xs font-mono text-gray-400 md:hidden font-bold tracking-widest">INTERNAL</span>
           <ChevronDown size={12} className={`md:hidden text-gray-400 transition-transform ${isPanelOpen ? "rotate-180" : ""}`} />
           <span className="hidden md:block text-xs font-mono text-gray-400 w-full text-center mb-2 tracking-widest font-bold">INTERNAL PANEL</span>
        </div>

        <div className={`grid grid-cols-2 gap-1 md:gap-2 w-full transition-all duration-300 ease-in-out ${isPanelOpen ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0 md:max-h-[500px] md:opacity-100 md:mt-0'}`}>
          {Array.from({ length: floors }).map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                onInternalCall(i);
              }}
              className={`relative py-1 md:py-2 rounded-lg text-[9px] md:text-xs font-mono font-bold transition-all duration-300 overflow-hidden group ${
                elevator.targets.includes(i) 
                  ? "text-blue-400" 
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {elevator.targets.includes(i) && (
                <motion.div layoutId={`active-${elevator.id}-${i}`} className="absolute inset-0 bg-blue-500/10 border border-blue-500/50 rounded-lg" />
              )}
              <span className="relative z-10">{i.toString().padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </div>
    </Tilt>
  );
}
