import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const sx = useSpring(cursorX, springConfig);
  const sy = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target;
      setIsHovering(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'BUTTON' || 
        target.closest('button')
      );
    };

    const handleDown = () => setClick(true);
    const handleUp = () => setClick(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Ring */}
      <motion.div
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          scale: click ? 0.8 : (isHovering ? 2.5 : 1),
          borderColor: isHovering ? "rgba(96, 165, 250, 0.8)" : "rgba(255, 255, 255, 0.2)"
        }}
        className="w-8 h-8 rounded-full border-2 border-white/20 hidden md:block"
      />
      
      {/* Inner Dot */}
      <motion.div
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          scale: isHovering ? 0.4 : 1,
          backgroundColor: isHovering ? "#60a5fa" : "#ffffff"
        }}
        className="w-1.5 h-1.5 bg-white rounded-full absolute top-0 left-0 hidden md:block shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      />

      {/* Trailing Glow */}
      <motion.div
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: isHovering ? 0.4 : 0 }}
        className="w-20 h-20 bg-blue-500/20 rounded-full blur-3xl absolute top-0 left-0 hidden md:block"
      />
    </div>
  );
}