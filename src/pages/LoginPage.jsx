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
import Footer from "../components/Home/Footer";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-white via-[#f8fafc] to-[#eef2ff] text-[#0f172a]">

  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-300/20 blur-[200px] rounded-full" />
  </div>

  <Navbar />

  <div className="relative z-10 flex flex-col">

    {/* HERO */}
    <section className="pt-20 pb-10">
      <MainTagline />
    </section>

    {/* LIVE DASHBOARD */}
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-4xl font-bold">
            Real-Time CRM Activity
          </h2>

          <p className="text-gray-600 mt-4 text-lg max-w-xl">
            Watch leads flow, conversions update, and teams perform in real-time.
          </p>

          <div className="mt-6 space-y-3 text-gray-600">
            <p>✔ Instant lead assignment</p>
            <p>✔ Live conversion tracking</p>
            <p>✔ Automated follow-ups</p>
            <p>✔ Performance analytics</p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-6 py-3 rounded-xl bg-[#ff4f00] text-white hover:bg-[#ff9d3d]"
          >
            Explore Dashboard
          </button>
        </div>

        <LiveDashboardMock />

      </div>
    </section>

    {/* STATS */}
    <section className="py-20 bg-white">
      <StatsCounter />
    </section>

    {/* PRODUCT */}
    <section className="py-20">
      <ProductShowcase />
    </section>

    {/* FEATURES */}
    <section className="py-20 bg-white">
      <FeaturesSection />
    </section>

    {/* HOW IT WORKS */}
    <section >
      <HowItWorks />
    </section>

    {/* FAQ */}
    <section className="bg-white">
      <FAQSection />
    </section>

  </div>
      <Footer />

</div>
  );
}