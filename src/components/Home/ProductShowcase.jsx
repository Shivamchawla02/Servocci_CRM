import React from "react";
import { motion } from "framer-motion";

export default function ProductShowcase() {
  const screenshots = [
    {
      title: "CRM Dashboard",
      desc: "Real-time leads, performance tracking & analytics",
      img: "/dashboard.png",
    },
    {
      title: "Leads Management",
      desc: "Track, assign & convert leads efficiently",
      img: "/leads.png",
    },
    {
      title: "Counsellor Panel",
      desc: "Daily workflow optimized for counsellors",
      img: "/counsellor.png",
    },
    {
      title: "Admin Analytics",
      desc: "Deep insights into performance & conversions",
      img: "/analytics.png",
    },
  ];

  return (
    <div className="relative w-full py-28 bg-gradient-to-b from-white via-[#f8fafc] to-[#eef2ff] text-[#0f172a] overflow-hidden">

      {/* ================= BACKGROUND ================= */}

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.4]
        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),
        linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
        bg-[size:90px_90px]" />

      {/* GLOW */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-300/30 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] bg-orange-200/40 blur-[200px] rounded-full" />
      </div>

      {/* ================= HEADER ================= */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          Built for Real Teams,
          <br />
          Not Just Demos
        </h2>

        <p className="mt-5 text-gray-600 text-lg">
          Every module in Servocci CRM is actively used by real sales teams to
          manage thousands of leads, calls, and conversions every day.
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="relative z-10 grid md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6">

        {screenshots.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-3xl overflow-hidden
            border border-gray-200 bg-white/60 backdrop-blur-xl
            hover:bg-white/80 transition shadow-lg hover:shadow-2xl"
          >

            {/* hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
              bg-gradient-to-r from-orange-200/0 via-orange-300/20 to-orange-200/0" />

            {/* IMAGE */}
            <div className="relative overflow-hidden">

              {/* soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent z-10" />

              <img
                src={item.img}
                alt={item.title}
                className="w-full h-[280px] object-cover
                transform group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* TEXT */}
            <div className="p-6 relative z-10">
              <h3 className="text-xl font-semibold tracking-wide">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px]
              bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d] opacity-60" />

          </motion.div>
        ))}

      </div>
    </div>
  );
}