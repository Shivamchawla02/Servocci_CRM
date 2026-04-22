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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070A12] text-white">

      {/* ================= BACKGROUND SYSTEM ================= */}

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* GLOW LAYERS */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#ff4f00]/15 blur-[220px] rounded-full" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[700px] h-[700px] bg-[#ff9d3d]/10 blur-[240px] rounded-full" />
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
            bg-white/10 border border-white/20 backdrop-blur-xl text-sm"
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
            We Help EdTech Teams
            <br />
            <span className="bg-gradient-to-r from-[#ff4f00] via-[#ff9d3d] to-yellow-200 bg-clip-text text-transparent">
              Increase Revenue by 38%
            </span>
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-white/70 text-lg max-w-xl"
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
              bg-[#ff4f00] hover:bg-[#ff9d3d] transition
              shadow-lg shadow-[#ff4f00]/30"
            >
              Get Started
            </button>

            <button className="px-7 py-3 rounded-xl font-semibold
              bg-white/10 border border-white/20 backdrop-blur-xl
              hover:bg-white/20 transition">
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
                bg-white/5 border border-white/10 backdrop-blur-xl
                hover:bg-white/10 transition overflow-hidden"
              >
                {/* subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff4f00]/0 via-[#ff4f00]/10 to-[#ff4f00]/0 opacity-0 hover:opacity-100 transition" />

                <p className="text-xs text-white/60 relative z-10">{s.label}</p>
                <p className="text-xl font-bold relative z-10">{s.value}</p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* ================= RIGHT DASHBOARD ================= */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          <div className="rounded-3xl
            bg-black/30 border border-white/10 backdrop-blur-2xl
            p-6 shadow-2xl">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm text-white/70">
                Live Performance Overview
              </h3>
              <span className="text-xs px-3 py-1 rounded-full
                bg-[#ff4f00]/20 text-[#ff9d3d]">
                Real-time
              </span>
            </div>

            {/* KPI STRIP */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white/10">
                <p className="text-xs text-white/60">Leads</p>
                <p className="text-lg font-bold">128K</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10">
                <p className="text-xs text-white/60">Calls</p>
                <p className="text-lg font-bold">89K</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10">
                <p className="text-xs text-white/60">Conv</p>
                <p className="text-lg font-bold">38%</p>
              </div>
            </div>

            {/* CHART */}
            <div className="h-44 rounded-xl
              bg-gradient-to-r from-[#ff4f00]/20 via-[#ff9d3d]/10 to-transparent" />

            {/* TABLE */}
            <div className="mt-6 space-y-2">
              <div className="h-5 bg-white/10 rounded" />
              <div className="h-5 bg-white/10 rounded" />
              <div className="h-5 bg-white/10 rounded" />
            </div>

          </div>

          {/* TRUST BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -top-10 -left-10 px-4 py-3 rounded-2xl
            bg-white/10 border border-white/20 backdrop-blur-xl"
          >
            <p className="text-xs text-white/60">Trusted by Institutions</p>
            <p className="text-lg font-bold">240+</p>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}