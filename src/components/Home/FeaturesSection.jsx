import React from "react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      title: "Smart Lead Management",
      desc: "Automatically organize, prioritize, and track leads using intelligent workflows.",
    },
    {
      title: "Call Tracking System",
      desc: "Monitor counsellor calls with detailed logs, recordings, and performance insights.",
    },
    {
      title: "Role-Based Access Control",
      desc: "Secure dashboards for admins, managers, and counsellors with full permission control.",
    },
    {
      title: "Automated Follow-ups",
      desc: "Never lose a lead with smart reminders and automated engagement sequences.",
    },
    {
      title: "Performance Analytics",
      desc: "Real-time dashboards to track conversions, revenue, and team performance.",
    },
    {
      title: "Scalable CRM Engine",
      desc: "Built to handle thousands of daily leads without performance degradation.",
    },
  ];

  return (
    <div className="relative w-full py-28 bg-[#070A12] text-white overflow-hidden">

      {/* ================= BACKGROUND (MATCH MAIN TAGLINE STYLE) ================= */}

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.05]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),
        linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:100px_100px]" />

      {/* GLOW BLOBS */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#ff4f00]/10 blur-[220px] rounded-full" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] bg-[#ff9d3d]/10 blur-[240px] rounded-full" />
      </div>

      {/* ================= HEADER ================= */}
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
          className="mt-4 text-white/70 text-lg"
        >
          Everything you need to manage leads, automate workflows, and scale revenue
          without operational chaos.
        </motion.p>
      </div>

      {/* ================= GRID ================= */}
      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">

        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative p-6 rounded-2xl
            bg-white/5 border border-white/10 backdrop-blur-xl
            hover:bg-white/10 hover:border-white/20
            transition overflow-hidden"
          >

            {/* hover glow layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
              bg-gradient-to-r from-[#ff4f00]/0 via-[#ff4f00]/10 to-[#ff9d3d]/0" />

            {/* top accent line */}
            <div className="w-10 h-1 bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d] rounded-full mb-4" />

            <h3 className="text-lg font-semibold relative z-10">
              {f.title}
            </h3>

            <p className="mt-2 text-white/60 text-sm relative z-10 leading-relaxed">
              {f.desc}
            </p>

          </motion.div>
        ))}

      </div>
    </div>
  );
}