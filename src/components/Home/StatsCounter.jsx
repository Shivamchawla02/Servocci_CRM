import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useCountUp(end, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;

      if (start >= end) {
        clearInterval(counter);
        setValue(end);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end, duration]);

  return value;
}

export default function StatsCounter() {
  const stats = [
    { label: "Leads Processed", value: 128400, suffix: "+" },
    { label: "Calls Tracked", value: 89200, suffix: "+" },
    { label: "Conversion Rate", value: 38, suffix: "%" },
    { label: "Active Institutions", value: 240, suffix: "+" },
  ];

  return (
    <div className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-white via-[#f8fafc] to-[#eef2ff] text-[#0f172a]">

      {/* SOFT GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.04]
        bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),
        linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]
        bg-[size:80px_80px]" />

      {/* GLOW BLOBS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-300/30 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-300/20 blur-[160px] rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Trusted by Growing EdTech Teams
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Real-time performance metrics from live CRM usage
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((s, i) => {
            const count = useCountUp(s.value, 1800 + i * 300);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative p-6 rounded-2xl text-center overflow-hidden
                backdrop-blur-xl bg-white/60 border border-white/40
                shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                hover:shadow-[0_20px_60px_rgba(255,79,0,0.15)]
                transition duration-300"
              >

                {/* GRADIENT GLOW HOVER */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300
                  bg-gradient-to-r from-[#ff4f00]/10 via-[#ff9d3d]/10 to-transparent blur-xl" />

                {/* NUMBER */}
                <h3 className="text-3xl md:text-4xl font-bold relative z-10
                  bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d]
                  bg-clip-text text-transparent">
                  {count.toLocaleString()}{s.suffix}
                </h3>

                {/* LABEL */}
                <p className="text-sm text-gray-600 mt-2 relative z-10">
                  {s.label}
                </p>

                {/* BORDER GLOW */}
                <div className="absolute inset-0 rounded-2xl border border-transparent
                  group-hover:border-orange-200 transition" />

              </motion.div>
            );
          })}

        </div>
      </div>
    </div>
  );
}