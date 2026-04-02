import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 🚀 Elevator Simulator V4 (Cinematic UI + Smart System)
export default function ElevatorSimulatorV4() {
  const totalFloors = 10;
  const elevatorCount = 3;

  const [elevators, setElevators] = useState(
    Array.from({ length: elevatorCount }, (_, i) => ({
      id: i,
      currentFloor: 0,
      direction: "idle",
      upQueue: [],
      downQueue: [],
      doorsOpen: false,
    }))
  );

  const [stats, setStats] = useState({ requests: 0 });

  // 🎯 Smart Dispatch
  const assignElevator = (floor) => {
    setStats((s) => ({ ...s, requests: s.requests + 1 }));

    let best = null;
    let minCost = Infinity;

    elevators.forEach((e) => {
      let cost = Math.abs(e.currentFloor - floor);

      if (
        (e.direction === "up" && floor >= e.currentFloor) ||
        (e.direction === "down" && floor <= e.currentFloor)
      ) cost -= 2;

      if (e.direction === "idle") cost -= 3;

      if (cost < minCost) {
        minCost = cost;
        best = e.id;
      }
    });

    setElevators((prev) =>
      prev.map((e) => {
        if (e.id !== best) return e;

        if (floor > e.currentFloor) {
          return {
            ...e,
            upQueue: [...new Set([...e.upQueue, floor])].sort((a, b) => a - b),
          };
        } else {
          return {
            ...e,
            downQueue: [...new Set([...e.downQueue, floor])].sort((a, b) => b - a),
          };
        }
      })
    );
  };

  // Movement Engine
  useEffect(() => {
    const interval = setInterval(() => {
      setElevators((prev) =>
        prev.map((e) => {
          if (e.upQueue.length === 0 && e.downQueue.length === 0) {
            return { ...e, direction: "idle" };
          }

          let { currentFloor, direction, upQueue, downQueue } = e;

          if (direction === "idle") {
            direction = upQueue.length ? "up" : "down";
          }

          if (direction === "up") {
            const target = upQueue.find((f) => f >= currentFloor);
            if (target !== undefined) {
              if (currentFloor === target) return stop(e, "up", target);
              return { ...e, currentFloor: currentFloor + 1, direction };
            } else direction = "down";
          }

          if (direction === "down") {
            const target = downQueue.find((f) => f <= currentFloor);
            if (target !== undefined) {
              if (currentFloor === target) return stop(e, "down", target);
              return { ...e, currentFloor: currentFloor - 1, direction };
            } else direction = "up";
          }

          return { ...e, direction };
        })
      );
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const stop = (e, dir, floor) => {
    setTimeout(() => {
      setElevators((prev) =>
        prev.map((el) => {
          if (el.id !== e.id) return el;

          return {
            ...el,
            doorsOpen: false,
            upQueue: el.upQueue.filter((f) => f !== floor),
            downQueue: el.downQueue.filter((f) => f !== floor),
          };
        })
      );
    }, 1500);

    return { ...e, doorsOpen: true };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">🚀 Smart Elevator System</h1>

      {/* Dashboard */}
      <div className="flex justify-center gap-10 mb-8">
        <div className="bg-gray-800 p-4 rounded-2xl shadow">
          <p className="text-sm">Total Requests</p>
          <p className="text-2xl font-bold">{stats.requests}</p>
        </div>
      </div>

      {/* Elevators */}
      <div className="flex justify-center gap-12">
        {elevators.map((e) => (
          <div key={e.id} className="text-center">
            <p className="mb-2">Lift {e.id}</p>

            <div className="relative h-80 w-20 border border-gray-600 flex flex-col-reverse">
              {Array.from({ length: totalFloors }).map((_, i) => (
                <div key={i} className="h-8 border-t text-xs flex items-center justify-center">
                  {i}
                </div>
              ))}

              {/* Elevator Cabin */}
              <motion.div
                animate={{ bottom: `${e.currentFloor * 32}px` }}
                transition={{ type: "spring", stiffness: 80 }}
                className="absolute w-full h-8 bg-green-400"
              >
                {e.doorsOpen && (
                  <div className="flex">
                    <div className="w-1/2 h-8 bg-black"></div>
                    <div className="w-1/2 h-8 bg-black"></div>
                  </div>
                )}
              </motion.div>
            </div>

            <p className="text-xs mt-2">{e.direction}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-5 gap-3 mt-10 max-w-md mx-auto">
        {Array.from({ length: totalFloors }).map((_, i) => (
          <button
            key={i}
            onClick={() => assignElevator(i)}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
          >
            Call {i}
          </button>
        ))}
      </div>
    </div>
  );
}
