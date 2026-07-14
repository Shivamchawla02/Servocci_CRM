import React from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaPhoneAlt,
  FaUserShield,
  FaBell,
  FaChartBar,
  FaRocket,
} from "react-icons/fa";

export default function FeaturesSection() {
  const features = [
    {
      title: "Smart Lead Management",
      desc: "Automatically organize, prioritize, and track leads using intelligent workflows.",
      icon: <FaBrain />,
    },
    {
      title: "Call Tracking System",
      desc: "Monitor counsellor calls with detailed logs, recordings, and performance insights.",
      icon: <FaPhoneAlt />,
    },
    {
      title: "Role-Based Access Control",
      desc: "Secure dashboards for admins, managers, and counsellors with full permission control.",
      icon: <FaUserShield />,
    },
    {
      title: "Automated Follow-ups",
      desc: "Never lose a lead with smart reminders and automated engagement sequences.",
      icon: <FaBell />,
    },
    {
      title: "Performance Analytics",
      desc: "Real-time dashboards to track conversions, revenue, and team performance.",
      icon: <FaChartBar />,
    },
    {
      title: "Scalable CRM Engine",
      desc: "Built to handle thousands of daily leads without performance degradation.",
      icon: <FaRocket />,
    },
  ];

  return (
    <div className="relative w-full py-28 bg-gradient-to-b from-white via-[#f8fafc] to-[#eef2ff] text-[#0f172a] overflow-hidden">

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.4]
        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),
        linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
        bg-[size:90px_90px]" />

      {/* GLOW */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-300/30 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] bg-orange-200/40 blur-[200px] rounded-full" />
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold"
        >
          Built for High-Performance
          <br />
          Sales Teams
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-gray-600 text-lg"
        >
          Everything you need to manage leads, automate workflows, and scale revenue
          without operational chaos.
        </motion.p>
      </div>

      {/* GRID */}
      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">

        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative p-6 rounded-2xl
            bg-white/70 border border-gray-200 backdrop-blur-xl
            hover:bg-white transition shadow-md hover:shadow-2xl overflow-hidden"
          >

            {/* hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
              bg-gradient-to-r from-orange-200/0 via-orange-300/20 to-orange-200/0" />

            {/* ICON */}
            <div className="w-12 h-12 flex items-center justify-center rounded-lg
              bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d] text-white text-lg shadow-md mb-4">
              {f.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold relative z-10">
              {f.title}
            </h3>

            {/* DESC */}
            <p className="mt-2 text-gray-600 text-sm relative z-10 leading-relaxed">
              {f.desc}
            </p>

            {/* TOP ACCENT */}
            <div className="absolute top-0 left-0 w-full h-[3px]
              bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d] opacity-60" />

          </motion.div>
        ))}

      </div>
    </div>
  );
}