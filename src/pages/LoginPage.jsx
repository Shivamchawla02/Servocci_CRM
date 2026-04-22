import React from "react";
import MainTagline from "../components/Home/MainTagline";
import StatsCounter from "../components/Home/StatsCounter";
import ProductShowcase from "../components/Home/ProductShowcase";
import FeaturesSection from "../components/Home/FeaturesSection";
import LiveDashboardMock from "../components/Home/LiveDashboardMock";
import HowItWorks from "../components/Home/HowItWorks";
import FAQSection from "../components/Home/FAQSection";
import Navbar from "../components/Home/Navbar";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#070A12] text-white">

      {/* ================= GLOBAL BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#ff4f00]/10 blur-[200px] rounded-full" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[700px] h-[700px] bg-[#ff9d3d]/10 blur-[220px] rounded-full" />
      </div>

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 flex flex-col">

        {/* ================= HERO ================= */}
        <section className="pt-28 pb-20 bg-[#070A12]">
          <div className="max-w-7xl mx-auto px-6">
            <MainTagline />
          </div>
        </section>

        {/* ================= LIVE DASHBOARD ================= */}
        <section className="py-24 bg-[#0B0F1A]">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Real-Time CRM Activity
              </h2>

              <p className="text-white/60 mt-4 text-lg leading-relaxed max-w-xl">
                Watch how Servocci processes leads, updates conversions, and assigns counsellors
                in real time. This is a live simulation of your sales engine in action.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Instant lead assignment to counsellors",
                  "Real-time conversion tracking system",
                  "Automated follow-up workflow engine",
                  "Live performance monitoring dashboard",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-white/70">
                    <span className="text-[#ff9d3d]">●</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 rounded-xl font-semibold
                  bg-[#ff4f00] hover:bg-[#ff9d3d] transition
                  shadow-lg shadow-[#ff4f00]/30"
                >
                  Explore Dashboard
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <LiveDashboardMock />
            </div>

          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <StatsCounter />
          </div>
        </section>

        {/* ================= PRODUCT SHOWCASE ================= */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <ProductShowcase />
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <FeaturesSection />
          </div>
        </section>

        {/* ================= HOW IT WORKS (NEW) ================= */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <HowItWorks />
          </div>
        </section>

        {/* ================= FAQ (NEW) ================= */}
        <section className="py-24 pb-32">
          <div className="max-w-5xl mx-auto px-6">
            <FAQSection />
          </div>
        </section>

      </div>
    </div>
  );
}