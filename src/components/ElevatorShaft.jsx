import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Tilt from "react-parallax-tilt";
import { ChevronUp, ChevronDown, CircleDot } from "lucide-react";

export default function ElevatorShaft({ elevator, floors, onInternalCall }) {
  const carRef = useRef(null);


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
      className="flex flex-col items-center"
    >
      <div className="mb-6 text-center">
        <div className="text-[10px] font-black text-blue-500/50 uppercase tracking-[0.3em] mb-1">Unit 0{elevator.id + 1}</div>
        <div className="flex items-center justify-center gap-2">
           <div className={`w-2 h-2 rounded-full ${elevator.direction !== 'idle' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-700'}`} />
           <span className="text-xl font-mono font-bold text-white/90">
             {elevator.currentFloor.toString().padStart(2, '0')}
           </span>
        </div>
      </div>

      <div className="relative w-32 md:w-36 h-[500px] bg-neutral-900/80 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
        {/* Shaft Background Detail */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100% 45.45px' }} />

        {/* The Elevator Car */}
        <div
          ref={carRef}
          className="absolute left-2 right-2 h-[50px] z-20"
          style={{ bottom: '0%' }}
        >
          <div className="h-full w-full bg-neutral-800 rounded-lg border-t border-white/30 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] overflow-hidden relative">
            {/* Status Display on Car */}
            <div className="absolute top-1 left-0 right-0 flex justify-center gap-4 opacity-50">
               <ChevronUp size={10} className={elevator.direction === 'up' ? 'text-green-400' : 'text-white/20'} />
               <ChevronDown size={10} className={elevator.direction === 'down' ? 'text-red-400' : 'text-white/20'} />
            </div>

            {/* Doors */}
            <div className="flex h-full w-full p-[2px]">
              <motion.div 
                animate={{ width: elevator.doorsOpen ? "5%" : "50%" }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="h-full bg-neutral-700 rounded-l-sm border-r border-black/40 relative overflow-hidden"
              >
                <div className="absolute inset-y-0 right-1 w-[1px] bg-white/10" />
              </motion.div>
              <motion.div 
                animate={{ width: elevator.doorsOpen ? "5%" : "50%" }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="h-full bg-neutral-700 rounded-r-sm border-l border-black/40 relative overflow-hidden"
              >
                <div className="absolute inset-y-0 left-1 w-[1px] bg-white/10" />
              </motion.div>
            </div>
            
            {/* Interior Glow */}
            <div className={`absolute inset-0 bg-blue-500/10 pointer-events-none transition-opacity duration-500 ${elevator.doorsOpen ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </div>
      </div>

      {/* Internal Panel - Premium Glassmorphism */}
      <div className="mt-8 p-4 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl grid grid-cols-2 gap-3 w-full shadow-xl">
        {Array.from({ length: floors }).map((_, i) => (
          <button
            key={i}
            onClick={() => onInternalCall(i)}
            className={`relative py-2 rounded-lg text-xs font-mono font-bold transition-all duration-300 overflow-hidden group ${
              elevator.targets.includes(i) 
                ? "text-blue-400" 
                : "text-gray-500 hover:text-white"
            }`}
          >
            {elevator.targets.includes(i) && (
              <motion.div layoutId={`active-${elevator.id}`} className="absolute inset-0 bg-blue-500/10 border border-blue-500/50 rounded-lg" />
            )}
            <span className="relative z-10">{i.toString().padStart(2, '0')}</span>
          </button>
        ))}
      </div>
    </Tilt>
  );
}