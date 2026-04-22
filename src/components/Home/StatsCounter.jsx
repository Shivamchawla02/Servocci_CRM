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
    <div className="relative w-full py-20 bg-[#070A12] text-white overflow-hidden">

      {/* BACKGROUND (same system as your SaaS UI) */}
      <div className="absolute inset-0 opacity-[0.05]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),
        linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:100px_100px]" />

      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#ff4f00]/10 blur-[200px] rounded-full" />
      </div>

      {/* GRID */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            Trusted by Growing EdTech Teams
          </h2>
          <p className="mt-4 text-white/60">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl text-center
                bg-white/5 border border-white/10 backdrop-blur-xl
                hover:bg-white/10 transition overflow-hidden"
              >

                {/* glow hover */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition
                  bg-gradient-to-r from-[#ff4f00]/0 via-[#ff4f00]/10 to-[#ff9d3d]/0" />

                {/* NUMBER */}
                <h3 className="text-3xl font-bold relative z-10">
                  {count.toLocaleString()}{s.suffix}
                </h3>

                {/* LABEL */}
                <p className="text-sm text-white/60 mt-2 relative z-10">
                  {s.label}
                </p>

              </motion.div>
            );
          })}

        </div>
      </div>
    </div>
  );
}