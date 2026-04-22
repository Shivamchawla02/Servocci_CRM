import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("https://servocci-backend-dip7.onrender.com/api/auth/forgot-password", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-r from-[#ff9d3d] to-[#ff4f00]">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-[#001b48] mb-4 sm:mb-6">Forgot Password</h2>

        {message && <p className="text-green-600 text-center text-sm sm:text-base mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center text-sm sm:text-base mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-[#f7d088] rounded-lg focus:ring-2 focus:ring-[#2c6975] text-sm sm:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#ff4f00] text-white py-3 rounded-lg hover:bg-[#e64500] transition text-sm sm:text-base"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
