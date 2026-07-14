import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MainTagline() {
  const navigate = useNavigate();

  const stats = [
    { label: "Active Leads Managed", value: "128,400+" },
    { label: "Calls Tracked Monthly", value: "89,200+" },
    { label: "Avg Conversion Increase", value: "38%" },
    { label: "Institutions Using", value: "240+" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden 
    bg-gradient-to-b from-white via-[#f8fafc] to-[#eef2ff] text-[#0f172a]">

      {/* ================= BACKGROUND SYSTEM ================= */}

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] 
        bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),
        linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] 
        bg-[size:90px_90px]" />

      {/* GLOW LAYERS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-300/30 blur-[200px] rounded-full" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] bg-indigo-300/20 blur-[220px] rounded-full" />
      </div>

      {/* ================= MAIN WRAPPER ================= */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-16 grid lg:grid-cols-2 gap-16 items-center">

        {/* ================= LEFT SIDE ================= */}
        <div>

          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex px-4 py-2 rounded-full
            bg-white/70 border border-gray-200 backdrop-blur-xl text-sm shadow-sm"
          >
            🚀 AI-Powered EdTech CRM Platform
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-5xl md:text-6xl font-bold leading-tight"
          >
            Smarter CRM for High-Performing
            <br />
            <span className="bg-gradient-to-r from-[#ff4f00] via-[#ff9d3d] to-yellow-400 bg-clip-text text-transparent">
              EdTech Teams
            </span>
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-600 text-lg max-w-xl leading-relaxed"
          >
            Servocci CRM centralizes leads, automates counsellor workflows, and
            improves follow-up efficiency — driving predictable revenue growth
            for modern EdTech companies.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 mt-8"
          >
            <button
              onClick={() => navigate("/login")}
              className="px-7 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d]
              text-white hover:scale-105 transition
              shadow-lg shadow-[#ff4f00]/30"
            >
              Get Started
            </button>

            <button className="px-7 py-3 rounded-xl font-semibold
              bg-white/70 border border-gray-200 backdrop-blur-xl
              hover:bg-white transition">
              View Demo
            </button>
          </motion.div>

          {/* KPI GRID */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="relative p-4 rounded-2xl
                bg-white/60 border border-gray-200 backdrop-blur-xl
                hover:shadow-lg transition overflow-hidden group"
              >
                {/* glow hover */}
                <div className="absolute inset-0 bg-gradient-to-r 
                  from-[#ff4f00]/0 via-[#ff4f00]/10 to-transparent 
                  opacity-0 group-hover:opacity-100 transition" />

                <p className="text-xs text-gray-500 relative z-10">{s.label}</p>
                <p className="text-xl font-bold relative z-10">{s.value}</p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* ================= RIGHT DASHBOARD ================= */}
        {/* ================= RIGHT DASHBOARD ================= */}
<motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="relative"
>

  <div className="rounded-3xl
    bg-white/70 border border-gray-200 backdrop-blur-2xl
    p-6 shadow-xl">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-sm text-gray-500">
        Live Performance Overview
      </h3>
      <span className="text-xs px-3 py-1 rounded-full
        bg-orange-100 text-[#ff4f00] animate-pulse">
        Real-time
      </span>
    </div>

    {/* KPI STRIP */}
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { label: "Leads", value: "128K" },
        { label: "Calls", value: "89K" },
        { label: "Conv", value: "38%", highlight: true },
      ].map((item, i) => (
        <div key={i} className="p-3 rounded-xl bg-white border border-gray-200 hover:shadow-sm transition">
          <p className="text-xs text-gray-500">{item.label}</p>
          <p className={`text-lg font-bold ${item.highlight ? "text-[#ff4f00]" : ""}`}>
            {item.value}
          </p>
        </div>
      ))}
    </div>

    {/* CHART (ENHANCED FAKE GRAPH) */}
    <div className="h-44 rounded-xl
      bg-gradient-to-r from-orange-200 via-orange-100 to-transparent
      relative overflow-hidden flex items-end gap-2 px-3">

      {[40, 60, 45, 80, 65, 90, 70].map((h, i) => (
        <div
          key={i}
          className="w-full bg-[#ff4f00]/70 rounded-t-md transition-all duration-500"
          style={{ height: `${h}%` }}
        />
      ))}

      {/* shimmer */}
      <div className="absolute inset-0 opacity-30 animate-pulse
        bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]" />
    </div>

    {/* PROGRESS STATS */}
    <div className="mt-6 space-y-3">
      {[
        { name: "Lead Conversion", value: 75 },
        { name: "Follow-up Rate", value: 60 },
      ].map((item, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{item.name}</span>
            <span>{item.value}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d]"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    {/* ACTIVITY FEED */}
    <div className="mt-6 space-y-3">
      {[
        "New lead assigned to Rahul",
        "Call completed by Ankit",
        "Lead converted successfully",
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-2 h-2 bg-[#ff4f00] rounded-full animate-pulse" />
          <p>{item}</p>
        </div>
      ))}
    </div>

    {/* TABLE (SKELETON) */}
    <div className="mt-6 space-y-2">
      <div className="h-5 bg-gray-200 rounded" />
      <div className="h-5 bg-gray-200 rounded" />
      <div className="h-5 bg-gray-200 rounded" />
    </div>

  </div>

  {/* TRUST BADGE */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="absolute -top-10 -left-10 px-4 py-3 rounded-2xl
    bg-white/80 border border-gray-200 backdrop-blur-xl shadow-md"
  >
    <p className="text-xs text-gray-500">Trusted by Institutions</p>
    <p className="text-lg font-bold">240+</p>
  </motion.div>

</motion.div>

      </div>
    </div>
  );
}