import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [active, setActive] = useState(0);

  const faqs = [
    {
      q: "What is Servocci CRM?",
      a: "Servocci CRM is a specialized platform for edtech teams to manage leads, track counsellor activity, and increase conversions.",
    },
    {
      q: "Is this suitable for small teams?",
      a: "Yes, Servocci scales from small teams to large institutions handling thousands of leads efficiently.",
    },
    {
      q: "Can I track counsellor performance?",
      a: "Absolutely. Monitor calls, conversions, follow-ups, and performance metrics in real-time.",
    },
    {
      q: "Does it support automation?",
      a: "Yes, automate lead assignment, reminders, follow-ups, and workflows seamlessly.",
    },
    {
      q: "Is my data secure?",
      a: "We use secure infrastructure, encrypted storage, and role-based access control for full protection.",
    },
  ];

  return (
    <div className="relative w-full py-28 bg-gradient-to-b from-white via-[#f8fafc] to-[#eef2ff] text-[#0f172a] overflow-hidden">

      {/* SOFT GRID */}
      <div className="absolute inset-0 opacity-[0.04]
        bg-[linear-gradient(to_right,#000000_1px,transparent_1px),
        linear-gradient(to_bottom,#000000_1px,transparent_1px)]
        bg-[size:100px_100px]" />

      {/* LIGHT GLOW */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-200/40 blur-[180px] rounded-full" />
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-gray-600 text-lg">
          Everything you need to know before getting started.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 backdrop-blur-xl
              ${
                active === i
                  ? "bg-orange-50 border-orange-300 shadow-md"
                  : "bg-white/70 border-gray-200 hover:bg-white hover:shadow-sm"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">{faq.q}</p>
                <span className={`text-sm font-medium
                  ${active === i ? "text-[#ff4f00]" : "text-gray-400"}`}>
                  {active === i ? "Open" : "View"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="relative">

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="p-8 rounded-3xl
              bg-white/70 border border-gray-200 backdrop-blur-2xl
              shadow-xl"
            >
              {/* QUESTION */}
              <h3 className="text-2xl font-semibold mb-4">
                {faqs[active].q}
              </h3>

              {/* ANSWER */}
              <p className="text-gray-600 leading-relaxed text-lg">
                {faqs[active].a}
              </p>

              {/* PROGRESS INDICATOR */}
              <div className="flex gap-2 mt-8">
                {faqs.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300
                    ${
                      i === active
                        ? "w-8 bg-gradient-to-r from-[#ff4f00] to-[#ff9d3d]"
                        : "w-3 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}