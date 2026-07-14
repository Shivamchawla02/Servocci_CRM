import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // Scroll detection
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
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-200 py-3 shadow-sm"
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
            <img
              src="/logo.png"
              alt="Servocci Logo"
              className="h-12 w-12"
            />
          </div>

          <h1
            className={`text-lg font-bold tracking-wide transition
              ${scrolled ? "text-gray-900" : "text-gray-800"}
            `}
          >
            Servocci <span className="text-[#ff4f00]">CRM</span>
          </h1>
        </div>

        {/* ================= CENTER MENU ================= */}
        <div
          className={`hidden md:flex items-center gap-8 transition
            ${scrolled ? "text-gray-700" : "text-gray-700"}
          `}
        >
          <button className="hover:text-black transition">
            Docs
          </button>

          <button className="hover:text-black transition">
            Pricing
          </button>

          {/* Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu(true)}
            onMouseLeave={() => setOpenMenu(false)}
          >
            <button className="hover:text-black transition">
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
                  bg-white border border-gray-200 shadow-xl overflow-hidden"
                >
                  <div className="p-2 space-y-1">

                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                      Dashboard Demo
                    </button>

                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                      Counsellor Panel
                    </button>

                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
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
          className="px-6 py-2 rounded-full font-semibold
          bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d]
          text-white shadow-lg hover:shadow-xl transition"
        >
          Login
        </motion.button>

      </div>
    </motion.div>
  );
}