import React from "react";
import { motion } from "framer-motion";
import { Bell, ArrowUpCircle } from "lucide-react";

export default function ExternalControls({ floors, onCall }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:gap-4 max-h-[350px] lg:max-h-[600px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar scroll-smooth">
      {Array.from({ length: floors }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur" />
          <div className="relative flex items-center justify-between p-3 md:p-5 bg-neutral-900 border border-white/5 rounded-xl md:rounded-2xl">
            <div className="flex flex-col">
              <span className="text-[8px] md:text-[10px] uppercase text-blue-500 font-black tracking-widest mb-0.5 md:mb-1">Level</span>
              <span className="text-xl md:text-3xl font-mono font-black text-white/90">{i.toString().padStart(2, '0')}</span>
            </div>
            
            <div className="flex gap-1.5 md:gap-2">
                <button
                  onClick={() => onCall(i)}
                  className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-400 transition-all active:scale-90 group/btn"
                >
                  <ArrowUpCircle className="text-gray-400 group-hover/btn:text-white transition-colors w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  onClick={() => onCall(i)}
                  className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-400 transition-all active:scale-90 group/btn"
                >
                  <Bell className="text-gray-400 group-hover/btn:text-white transition-colors w-3.5 h-3.5 md:w-4.5 md:h-4.5" />
                </button>
            </div>
          </div>
        </motion.div>
      )).reverse()}
    </div>
  );
}
