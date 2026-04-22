import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function formatDuration(seconds) {
  if (!seconds || seconds < 1) return "0s";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

const CouncellorView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [councellor, setCouncellor] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [dailyUsage, setDailyUsage] = useState([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      setLoading(true);

      // 1️⃣ Get Councellor Details
      const res = await axios.get(
        `https://servocci-backend-dip7.onrender.com/api/councellor/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.data.success) {
        setCouncellor(null);
        return;
      }

      const counsellorData = res.data.data;
      setCouncellor(counsellorData);

      const userId = counsellorData.userId?._id;

      if (!userId) {
        console.error("UserId not found inside councellor");
        return;
      }

      // 2️⃣ Get Sessions (Newest First from Backend)
      const sessionRes = await axios.get(
        `https://servocci-backend-dip7.onrender.com/api/usage-log/sessions/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSessions(sessionRes.data || []);

      // 3️⃣ Get Total Time
      const totalRes = await axios.get(
        `https://servocci-backend-dip7.onrender.com/api/usage-log/total-time/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTotalSeconds(totalRes.data?.totalSeconds || 0);

      // 4️⃣ Get Daily Usage for Chart
      const dailyRes = await axios.get(
        `https://servocci-backend-dip7.onrender.com/api/usage-log/daily-usage/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const formattedChart = (dailyRes.data || []).map((item) => ({
        date: item._id,
        hours: Number((item.totalDuration / 3600).toFixed(2)),
      }));

      setDailyUsage(formattedChart);

    } catch (err) {
      console.error("Error loading Councellor View:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-500">Loading...</p>;

  if (!councellor)
    return <p className="text-center text-red-500">Councellor not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded shadow space-y-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-[#001b48] text-white rounded hover:bg-[#2c6975] transition"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-[#001b48]">
          Councellor Details
        </h2>

        <div className="bg-[#001b48] text-white px-4 py-2 rounded-lg shadow">
          Total Active Time: {formatDuration(totalSeconds)}
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
        <Info label="Name" value={councellor.name} />
        <Info label="Code" value={councellor.counsellorCode} />
        <Info label="Phone" value={councellor.phone} />
        <Info label="Aadhaar" value={councellor.aadhaar} />
        <Info label="PAN" value={councellor.pan} />
        <Info label="Username" value={councellor.username} />
        <Info label="Email" value={councellor.email} />
        <Info label="GST" value={councellor.gst} />
        <Info label="Role" value={councellor.role} />
      </div>

      {/* Chart Section */}
      <div className="bg-gray-50 p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-[#001b48] mb-4">
          Last 7 Days Usage (Hours)
        </h3>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyUsage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#001b48"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {dailyUsage.length === 0 && (
          <p className="text-sm text-gray-500 mt-3">
            No usage data available for last 7 days.
          </p>
        )}
      </div>

      {/* Session History */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-[#001b48] mb-4">
          Session History
        </h3>

        {sessions.length === 0 && (
          <p className="text-gray-500">No sessions found.</p>
        )}

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {sessions.map((session, index) => {
            const isActive = !session.endTime;

            const runningDuration = isActive
              ? Math.floor((new Date() - new Date(session.startTime)) / 1000)
              : session.sessionDuration || 0;

            return (
              <div
                key={session._id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm border"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">
                    Session {sessions.length - index}
                  </p>

                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {isActive ? "Active" : "Closed"}
                  </span>
                </div>

                <p>
                  <strong>Login:</strong>{" "}
                  {new Date(session.startTime).toLocaleString()}
                </p>

                <p>
                  <strong>Logout:</strong>{" "}
                  {session.endTime
                    ? new Date(session.endTime).toLocaleString()
                    : "Still Active"}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {formatDuration(runningDuration)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded-md shadow-sm">
    <strong>{label}:</strong>
    <p>{value || "—"}</p>
  </div>
);

export default CouncellorView;