import React from "react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Capture Leads",
      desc: "Collect leads from multiple sources and centralize them into one unified CRM dashboard.",
    },
    {
      step: "02",
      title: "Assign & Track",
      desc: "Automatically assign leads to counsellors and track every interaction in real-time.",
    },
    {
      step: "03",
      title: "Convert & Grow",
      desc: "Optimize follow-ups, increase conversions, and scale your revenue predictably.",
    },
  ];

  return (
    <div className="relative w-full py-28 bg-[#070A12] text-white overflow-hidden">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),
        linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:100px_100px]" />

      {/* GLOW */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#ff4f00]/10 blur-[200px] rounded-full" />
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          How Servocci Works
        </h2>

        <p className="mt-5 text-white/70 text-lg">
          A simple 3-step system to transform your lead management and boost conversions.
        </p>
      </div>

      {/* STEPS */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-3xl
            bg-white/5 border border-white/10 backdrop-blur-xl
            hover:bg-white/10 transition overflow-hidden"
          >

            {/* hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
              bg-gradient-to-r from-[#ff4f00]/0 via-[#ff4f00]/10 to-[#ff9d3d]/0" />

            {/* STEP NUMBER */}
            <div className="text-5xl font-bold text-[#ff4f00]/30 mb-4">
              {s.step}
            </div>

            <h3 className="text-xl font-semibold relative z-10">
              {s.title}
            </h3>

            <p className="text-white/60 mt-3 text-sm leading-relaxed relative z-10">
              {s.desc}
            </p>

          </motion.div>
        ))}

      </div>
    </div>
  );
}