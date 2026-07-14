import React from "react";
import { motion } from "framer-motion";
import { FaDatabase, FaUserCheck, FaChartLine } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Capture Leads",
      desc: "Collect leads from multiple sources and centralize them into one unified CRM dashboard.",
      icon: <FaDatabase />,
    },
    {
      step: "02",
      title: "Assign & Track",
      desc: "Automatically assign leads to counsellors and track every interaction in real-time.",
      icon: <FaUserCheck />,
    },
    {
      step: "03",
      title: "Convert & Grow",
      desc: "Optimize follow-ups, increase conversions, and scale your revenue predictably.",
      icon: <FaChartLine />,
    },
  ];

  return (
    <div className="relative w-full py-28 bg-gradient-to-b from-white via-[#f8fafc] to-[#eef2ff] text-[#0f172a] overflow-hidden">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.4]
        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),
        linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
        bg-[size:90px_90px]" />

      {/* GLOW */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-300/30 blur-[180px] rounded-full" />
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          How Servocci Works
        </h2>

        <p className="mt-5 text-gray-600 text-lg">
          A simple 3-step system to transform your lead management and boost conversions.
        </p>
      </div>

      {/* STEPS */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* CONNECTING LINE */}
        <div className="hidden md:block absolute left-1/2 top-[55%] w-[70%] h-[2px] -translate-x-1/2
          bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-40" />

        <div className="grid md:grid-cols-3 gap-8">

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group relative p-8 rounded-3xl
              bg-white/70 border border-gray-200 backdrop-blur-xl
              hover:bg-white transition shadow-lg hover:shadow-2xl overflow-hidden"
            >

              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                bg-gradient-to-r from-orange-200/0 via-orange-300/20 to-orange-200/0" />

              {/* ICON */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl
                bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d] text-white text-xl shadow-md mb-5">
                {s.icon}
              </div>

              {/* STEP NUMBER */}
              <div className="absolute top-6 right-6 text-5xl font-bold text-orange-200">
                {s.step}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold relative z-10">
                {s.title}
              </h3>

              {/* DESC */}
              <p className="text-gray-600 mt-3 text-sm leading-relaxed relative z-10">
                {s.desc}
              </p>

              {/* PROGRESS DOT */}
              <div className="hidden md:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full
                bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d] shadow-md" />

            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}