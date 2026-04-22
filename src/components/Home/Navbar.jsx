import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? "bg-black/50 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">

        {/* ================= LOGO ================= */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">

            {/* glow */}
            <div className="absolute inset-0 bg-[#ff4f00]/40 blur-xl opacity-0 group-hover:opacity-100 transition" />

            <img
                src="/logoblack.png"
                alt="Servocci Logo"
                className="h-12 w-12 relative z-10"
                />
          </div>

          <h1 className="text-lg font-bold tracking-wide text-white">
            Servocci <span className="text-[#ff4f00]">CRM</span>
          </h1>
        </div>

        {/* ================= CENTER MENU ================= */}
        <div className="hidden md:flex items-center gap-8 text-white/70">

          {/* Docs */}
          <button className="hover:text-white transition">
            Docs
          </button>

          {/* Pricing */}
          <button className="hover:text-white transition">
            Pricing
          </button>

          {/* Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu(true)}
            onMouseLeave={() => setOpenMenu(false)}
          >
            <button className="hover:text-white transition">
              Demo ▾
            </button>

            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-10 left-0 w-48 rounded-xl
                  bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden"
                >
                  <div className="p-2 space-y-1">

                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                      Dashboard Demo
                    </button>

                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                      Counsellor Panel
                    </button>

                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                      Admin Analytics
                    </button>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* ================= RIGHT CTA ================= */}
        <motion.button
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-2 rounded-full font-semibold
          bg-[#ff4f00] text-white shadow-lg shadow-[#ff4f00]/30 overflow-hidden"
        >
          Login

          {/* hover glow */}
          <span className="absolute inset-0 bg-gradient-to-r
            from-[#ff4f00] to-[#ff9d3d]
            opacity-0 hover:opacity-100 transition" />
        </motion.button>

      </div>
    </motion.div>
  );
}