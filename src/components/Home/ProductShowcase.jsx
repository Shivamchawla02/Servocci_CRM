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
    <div className="relative w-full py-28 bg-[#070A12] text-white overflow-hidden">

      {/* ================= BACKGROUND (MATCH MAIN TAGLINE STYLE) ================= */}

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.05]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),
        linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:100px_100px]" />

      {/* GLOW LAYERS */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#ff4f00]/10 blur-[220px] rounded-full" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[700px] h-[700px] bg-[#ff9d3d]/10 blur-[240px] rounded-full" />
      </div>

      {/* ================= HEADER ================= */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          Built for Real Teams,
          <br />
          Not Just Demos
        </h2>

        <p className="mt-5 text-white/70 text-lg">
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
            border border-white/10 bg-white/5 backdrop-blur-xl
            hover:bg-white/10 transition shadow-xl"
          >

            {/* hover glow overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
              bg-gradient-to-r from-[#ff4f00]/0 via-[#ff4f00]/10 to-[#ff9d3d]/0" />

            {/* IMAGE WRAPPER (MORE PREMIUM FEEL) */}
            <div className="relative overflow-hidden">

              {/* subtle frame effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent z-10" />

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

              <p className="text-white/60 mt-2 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* subtle bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px]
              bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d] opacity-40" />

          </motion.div>
        ))}

      </div>
    </div>
  );
}