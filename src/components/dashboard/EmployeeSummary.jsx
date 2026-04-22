import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import {
  FaUserCheck, FaUserClock, FaPenFancy,
  FaFileAlt, FaFileSignature, FaUserGraduate,
  FaTimesCircle, FaUserSlash, FaLanguage,
  FaPlus, FaList
} from 'react-icons/fa';

import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const COLORS = ['#ff9d3d', '#2c6975', '#430000', '#001b48', '#f7d088', '#ff4f00', '#991b1b', '#6b7280'];

// ---------------- Summary Card ----------------
const SummaryCard = ({ icon, text, number, gradient, percent }) => (
  <div className={`p-4 rounded-2xl shadow-xl text-white bg-gradient-to-br ${gradient} transition-transform transform hover:scale-105`}>
    <div className='flex items-center gap-4'>
      <div className='text-3xl'>{icon}</div>
      <div>
        <p className='text-sm font-medium'>{text}</p>
        <p className='text-2xl font-bold'>{number} {percent !== undefined && `(${percent}%)`}</p>
      </div>
    </div>
  </div>
);

// ---------------- Action Button ----------------
const ActionButton = ({ icon, text, color, onClick }) => (
  <button onClick={onClick} className={`${color} flex flex-col items-center justify-center gap-1 py-4 rounded-xl text-white font-medium shadow-md hover:scale-105 transition duration-200`}>
    {icon}
    <span className='text-sm sm:text-base'>{text}</span>
  </button>
);

// ---------------- Mini Summary Card ----------------
const MiniCard = ({ title, value, color = "bg-gray-100" }) => (
  <div className={`${color} rounded-xl p-3 font-medium`}>
    {title}<br/>
    <span className="font-bold text-lg">{value}</span>
  </div>
);

const EmployeeSummary = () => {
  const navigate = useNavigate();

  const [leadStats, setLeadStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(localStorage.getItem("adminLang") || "en");

  const translations = {
    en: {
      title: "📊 Application Stats",
      Qualified: "Qualified Leads",
      "Follow-up": "Follow-up Leads",
      Initiated: "Admission Initiated",
      Received: "Application Received",
      Documentation: "Documentation Done",
      Closed: "Admissions Closed",
      Rejected: "Application Rejected",
      Unqualified: "Unqualified Leads",
      total: "Total Leads",
      converted: "Converted",
      rejected: "Rejected",
      progress: "In Progress",
      loading: "Loading dashboard...",
      switch: "हिन्दी",
      addLead: "Add Lead",
      myLeads: "My Leads",
      followUps: "Follow-ups",
      closed: "Closed",
      documentation: "Documentation",
      unqualified: "Unqualified"
    },
    hi: {
      title: "📊 आवेदन आँकड़े",
      Qualified: "योग्य लीड्स",
      "Follow-up": "फॉलो-अप लीड्स",
      Initiated: "प्रवेश शुरू",
      Received: "आवेदन प्राप्त",
      Documentation: "दस्तावेज़ पूरे",
      Closed: "प्रवेश पूरा",
      Rejected: "आवेदन अस्वीकार",
      Unqualified: "अयोग्य लीड्स",
      total: "कुल लीड्स",
      converted: "पूर्ण प्रवेश",
      rejected: "अस्वीकृत",
      progress: "प्रगति में",
      loading: "डैशबोर्ड लोड हो रहा है...",
      switch: "English",
      addLead: "लीड जोड़ें",
      myLeads: "मेरी लीड्स",
      followUps: "फॉलो-अप",
      closed: "पूरा",
      documentation: "दस्तावेज़",
      unqualified: "अयोग्य"
    }
  };

  const leadOrder = ['Qualified', 'Follow-up', 'Initiated', 'Received', 'Documentation', 'Closed', 'Rejected', 'Unqualified'];

  const gradients = {
    Qualified: "from-[#2c6975] to-[#5aa7b0]",
    "Follow-up": "from-[#ff9d3d] to-[#ffb873]",
    Initiated: "from-[#001b48] to-[#3b82f6]",
    Received: "from-[#f7d088] to-[#f9e7a6]",
    Documentation: "from-[#ff4f00] to-[#ff7b33]",
    Closed: "from-[#2c6975] to-[#6fb3b8]",
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

  // Listen for language change event
  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem("adminLang") || "en");
    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);

  // Fetch lead summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://servocci-backend-dip7.onrender.com/api/employee/lead-summary',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLeadStats(res.data);
      } catch (err) {
        console.error("Failed to fetch lead summary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <p className="text-center py-10">{translations[lang].loading}</p>;

  const total = Object.values(leadStats).reduce((a, b) => a + b, 0);
  const inProgress = (leadStats["Follow-up"] || 0) + (leadStats["Initiated"] || 0) + (leadStats["Documentation"] || 0);
  const pieData = leadOrder.map(name => ({ name, value: leadStats[name] || 0 }));

  return (
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className='text-2xl sm:text-3xl font-extrabold text-[#001b48]'>{translations[lang].title}</h3>
        <button
          onClick={() => {
            const newLang = lang === "en" ? "hi" : "en";
            setLang(newLang);
            localStorage.setItem("adminLang", newLang);
            window.dispatchEvent(new Event("languageChange"));
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#001b48] text-white rounded-lg hover:bg-[#2c6975] transition"
        >
          <FaLanguage />
          {translations[lang].switch}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        <ActionButton icon={<FaPlus />} text={translations[lang].addLead} color="bg-[#001b48]" onClick={() => navigate("/pre-admission")} />
        <ActionButton icon={<FaList />} text={translations[lang].myLeads} color="bg-[#2c6975]" onClick={() => navigate("/admin-dashboard/employees")} />
        <ActionButton icon={<FaUserClock />} text={translations[lang].followUps} color="bg-[#ff9d3d]" onClick={() => navigate("/admin-dashboard/employees")} />
        <ActionButton icon={<FaUserGraduate />} text={translations[lang].closed} color="bg-green-600" onClick={() => navigate("/admin-dashboard/employees")} />
        <ActionButton icon={<FaFileAlt />} text={translations[lang].documentation} color="bg-[#ff7b33]" onClick={() => navigate("/admin-dashboard/employees")} />
        <ActionButton icon={<FaUserSlash />} text={translations[lang].unqualified} color="bg-gray-600" onClick={() => navigate("/admin-dashboard/employees")} />
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6'>
        {leadOrder.map(name => {
          const percent = total ? ((leadStats[name] || 0) / total * 100).toFixed(0) : 0;
          return <SummaryCard key={name} icon={icons[name]} text={translations[lang][name]} number={leadStats[name] || 0} gradient={gradients[name]} percent={percent} />;
        })}
      </div>

      {/* Pie Chart */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-4 w-full h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              dataKey="value"
              label={({ name, percent }) => `${translations[lang][name]} (${(percent*100).toFixed(0)}%)`}
              isAnimationActive={true}
            >
              {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" layout="horizontal" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Mini Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-center text-sm sm:text-base">
        <MiniCard title={translations[lang].total} value={total} />
        <MiniCard title={translations[lang].converted} value={leadStats.Closed || 0} color="bg-green-100" />
        <MiniCard title={translations[lang].rejected} value={leadStats.Rejected || 0} color="bg-red-100" />
        <MiniCard title={translations[lang].progress} value={inProgress} color="bg-yellow-100" />
      </div>

      {/* Bar Chart */}
      <div className="hidden md:block w-full h-[300px] sm:h-[400px] mt-10 bg-white rounded-xl shadow-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pieData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickFormatter={(value) => translations[lang][value]} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2c6975" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default EmployeeSummary;