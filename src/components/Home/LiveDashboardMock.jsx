import React, { useEffect, useState } from "react";
import {
  FaUserCheck, FaUserClock, FaPenFancy,
  FaFileAlt, FaFileSignature, FaUserGraduate,
  FaTimesCircle, FaUserSlash, FaPlus, FaList
} from "react-icons/fa";

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

const COLORS = ['#ff9d3d', '#2c6975', '#430000', '#001b48', '#f7d088', '#ff4f00', '#991b1b', '#6b7280'];

export default function LiveDashboardMock() {

  const [stats, setStats] = useState({
    Qualified: 19,
    "Follow-up": 1,
    Initiated: 1,
    Received: 2,
    Documentation: 6,
    Closed: 0,
    Rejected: 7,
    Unqualified: 4,
  });

  // ⚡ SUPER FAST LIVE UPDATE
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const updated = { ...prev };

        Object.keys(updated).forEach(key => {
          const change = Math.floor(Math.random() * 4); // 🔥 bigger jumps
          updated[key] = Math.max(0, prev[key] + change);
        });

        return updated;
      });
    }, 500); // ⚡ faster

    return () => clearInterval(interval);
  }, []);

  const total = Object.values(stats).reduce((a, b) => a + b, 0);
  const leadOrder = Object.keys(stats);

  const gradients = {
    Qualified: "from-[#2c6975] to-[#5aa7b0]",
    "Follow-up": "from-[#ff9d3d] to-[#ffb873]",
    Initiated: "from-[#001b48] to-[#3b82f6]",
    Received: "from-[#f7d088] to-[#f9e7a6]",
    Documentation: "from-[#ff4f00] to-[#ff7b33]",
    Closed: "from-green-500 to-green-700",
    Rejected: "from-[#430000] to-[#991b1b]",
    Unqualified: "from-[#6b7280] to-[#9ca3af]",
  };

  const icons = {
    Qualified: <FaUserCheck />,
    "Follow-up": <FaUserClock />,
    Initiated: <FaPenFancy />,
    Received: <FaFileAlt />,
    Documentation: <FaFileSignature />,
    Closed: <FaUserGraduate />,
    Rejected: <FaTimesCircle />,
    Unqualified: <FaUserSlash />,
  };

  const pieData = leadOrder.map(name => ({
    name,
    value: stats[name],
  }));

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-100 p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#001b48]">
          📊 Application Stats
        </h2>

        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white rounded shadow text-sm">
            My Profile
          </button>
          <button className="px-3 py-1 bg-[#001b48] text-white rounded text-sm">
            Logout
          </button>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4 text-xs">
        <ActionBtn icon={<FaPlus />} text="Add Lead" color="bg-[#001b48]" />
        <ActionBtn icon={<FaList />} text="All Leads" color="bg-[#2c6975]" />
        <ActionBtn icon={<FaUserClock />} text="Follow-ups" color="bg-[#ff9d3d]" />
        <ActionBtn icon={<FaUserGraduate />} text="Closed" color="bg-green-600" />
        <ActionBtn icon={<FaFileAlt />} text="Docs" color="bg-[#ff7b33]" />
        <ActionBtn icon={<FaUserSlash />} text="Unqualified" color="bg-gray-600" />
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs">

        {leadOrder.map(name => {
          const percent = total ? ((stats[name] / total) * 100).toFixed(0) : 0;

          return (
            <div
              key={name}
              className={`p-3 rounded-xl text-white bg-gradient-to-br ${gradients[name]}`}
            >
              <div className="flex items-center gap-2">
                {icons[name]}
                <div>
                  <p>{name}</p>
                  <p className="font-bold">
                    {stats[name]} ({percent}%)
                  </p>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[250px]">

        {/* PIE */}
        <div className="bg-white rounded-xl p-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-white rounded-xl p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2c6975" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

const ActionBtn = ({ icon, text, color }) => (
  <div className={`${color} text-white rounded-lg py-2 flex flex-col items-center justify-center hover:scale-105 transition`}>
    {icon}
    <span>{text}</span>
  </div>
);