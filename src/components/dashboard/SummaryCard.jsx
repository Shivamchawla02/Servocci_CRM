import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start rounded-2xl shadow-lg bg-white overflow-hidden transition-transform hover:scale-105">
      <div className={`flex items-center justify-center w-full sm:w-20 h-16 sm:h-auto ${color} text-white text-3xl p-4`}>
        {icon}
      </div>
      <div className="p-4 text-center sm:text-left flex-1">
        <p className="text-sm sm:text-base font-semibold text-gray-700">{text}</p>
        <p className="text-xl sm:text-2xl font-bold text-[#001b48]">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
