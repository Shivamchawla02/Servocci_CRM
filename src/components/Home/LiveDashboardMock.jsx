import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveDashboardMock() {
  const [leads, setLeads] = useState(128400);
  const [calls, setCalls] = useState(89200);
  const [conv, setConv] = useState(38.2);

  const [activity, setActivity] = useState("System initialized...");

  const activities = [
    "Counsellor Rahul closed a high-intent lead",
    "New lead assigned to Team Alpha",
    "Automated follow-up triggered",
    "Call completed with 92% score",
    "Hot lead detected from landing page",
    "Conversion updated in real-time",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // metrics update
      setLeads((p) => p + Math.floor(Math.random() * 6));
      setCalls((p) => p + Math.floor(Math.random() * 4));

      setConv((p) => {
        const change = Math.random() * 0.3 - 0.15;
        return Math.min(55, Math.max(20, +(p + change).toFixed(2)));
      });

      // activity update
      setActivity(
        activities[Math.floor(Math.random() * activities.length)]
      );
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-3xl p-6
      bg-black/30 border border-white/10 backdrop-blur-2xl
      shadow-2xl overflow-hidden">

      {/* LIVE BADGE */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs px-3 py-1 rounded-full
          bg-green-500/10 text-green-300 animate-pulse border border-green-400/20">
          ● LIVE SYSTEM ACTIVE
        </span>

        <span className="text-xs text-white/50">
          auto-sync enabled
        </span>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-3 gap-3 mb-6">

        <motion.div
          key={leads}
          initial={{ scale: 0.97, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-3 rounded-xl bg-white/5 border border-white/10"
        >
          <p className="text-xs text-white/50">Leads</p>
          <p className="text-lg font-bold">
            {leads.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          key={calls}
          initial={{ scale: 0.97, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-3 rounded-xl bg-white/5 border border-white/10"
        >
          <p className="text-xs text-white/50">Calls</p>
          <p className="text-lg font-bold">
            {calls.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          key={conv}
          initial={{ scale: 0.97, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-3 rounded-xl bg-white/5 border border-white/10"
        >
          <p className="text-xs text-white/50">Conv %</p>
          <p className="text-lg font-bold text-[#ff9d3d]">
            {conv}%
          </p>
        </motion.div>

      </div>

      {/* MINI VISUAL CHART (FAKE BUT REALISTIC) */}
      <div className="h-24 rounded-xl mb-6 bg-gradient-to-r
        from-[#ff4f00]/10 via-[#ff9d3d]/10 to-transparent relative overflow-hidden">

        <div className="absolute inset-0 opacity-30 animate-pulse
          bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
      </div>

      {/* ACTIVITY FEED */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activity}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="text-sm text-white/70 p-3 rounded-xl
          bg-white/5 border border-white/10"
        >
          {activity}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}