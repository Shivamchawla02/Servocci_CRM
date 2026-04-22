import React, { useEffect, useState } from "react";
import axios from "axios";
import Servocci from "../assets/Servocci.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(() => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
});

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "https://servocci-backend-dip7.onrender.com/api/auth/login",
      { email: email.toLowerCase(), password }
    );

    if (response.data.success) {
      const user = response.data.user;

      login(user);
      setLoggedInUser(user);
      localStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(user));

      // Call /start API to create usage log session start
      if (user.role === "councelor") {
        const startResponse = await axios.post(
          "https://servocci-backend-dip7.onrender.com/api/usage-log/start",
          { counselorId: user._id }
        );
        const usageLogId = startResponse.data.usageLogId;
        sessionStorage.setItem("usageLogId", usageLogId); // store for logout
      }

      // Navigate based on role
if (user.role === "admin" || user.role === "manager") {
  navigate("/admin-dashboard");
} else {
  navigate("/employee-dashboard");
}
    }
  } catch (error) {
    setError(error.response?.data?.error || "Server Error");
  }
};


  // ✅ Log session duration on tab close or refresh
  useEffect(() => {
  if (!loggedInUser || loggedInUser.role !== "councelor") return;

  const handleBeforeUnload = (event) => {
    const usageLogId = sessionStorage.getItem("usageLogId");
    if (!usageLogId) return;

    // Use navigator.sendBeacon or fallback to fetch (sendBeacon recommended for unload)
    const payload = JSON.stringify({ usageLogId });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "https://servocci-backend-dip7.onrender.com/api/usage-log/end",
        new Blob([payload], { type: "application/json" })
      );
    } else {
      // fallback (not guaranteed to complete on unload)
      fetch("https://servocci-backend-dip7.onrender.com/api/usage-log/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      });
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);
  return () => window.removeEventListener("beforeunload", handleBeforeUnload);
}, [loggedInUser]);


  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 bg-gradient-to-r from-[#001b48] to-[#ff4f00]">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8 bg-white rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-300">
        <div className="flex justify-center mb-6">
          <img src={Servocci} alt="Organization Logo" className="h-20 w-40 object-contain" />
        </div>

        <div className="flex justify-center mb-4">
  <button
    onClick={() => navigate("/")}
    className="px-4 py-2 text-sm font-semibold rounded-full
    border border-[#ff4f00] text-[#ff4f00]
    hover:bg-[#ff4f00] hover:text-white
    transition duration-300"
  >
    ← Back to Home
  </button>
</div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#001b48]">
          Counsellors Login
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block mb-2 font-medium text-[#430000]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#2c6975] shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block mb-2 font-medium text-[#430000]">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#2c6975] shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#ff4f00] text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition duration-300"
          >
            Login
          </button>

          <p className="text-center mt-4 text-[#001b48]">
            Forgot your password?{" "}
            <a href="/forgot-password" className="text-[#ff4f00] hover:underline">
              Reset it
            </a>
          </p>
        </form>

       <a
        href="https://servocci.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="mt-6 mx-auto max-w-4xl bg-[#f9f7d9] border border-[#ff9d3d] text-[#001b48] rounded-lg px-4 py-3 text-sm sm:text-base font-medium shadow flex items-center justify-center gap-3 hover:bg-[#fff3c1] transition-colors duration-200">
          <span className="text-xl">🌐</span>
          <span>
            This portal is for <strong className="text-[#ff4f00]">Servocci Counsellors</strong> only.{" "}
            <span className="underline text-[#2c6975] hover:text-[#001b48]">
              Visit our Main website
            </span>
          </span>
        </div>
      </a>

      </div>
    </div>
  );
}
