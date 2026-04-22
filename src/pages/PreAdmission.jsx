import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PreAdmission = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phoneMobile: "",
    email: "",
    fatherName: "",
    intendedMajor: "",
    department: "",
    communicationConsent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      toast.error("Invalid counsellor link.");
      return;
    }

    try {
      await axios.post(
        "https://servocci-backend-dip7.onrender.com/api/employee/pre-admission",
        {
          ...formData,
          counsellorCode: code,
          leadStatus: "Pre Admission",
        }
      );

      toast.success("Pre Admission submitted successfully!");

      setFormData({
        fullName: "",
        dob: "",
        gender: "",
        phoneMobile: "",
        email: "",
        fatherName: "",
        intendedMajor: "",
        department: "",
        communicationConsent: false,
      });

    } catch (error) {
      toast.error("Submission failed.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#001b48] text-center">
          Pre Admission Form
        </h2>

        <input
          name="fullName"
          placeholder="Full Name"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          name="phoneMobile"
          placeholder="Mobile Number"
          required
          value={formData.phoneMobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="fatherName"
          placeholder="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="department"
          placeholder="Preferred Institution"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="intendedMajor"
          placeholder="Course Applying For"
          value={formData.intendedMajor}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="communicationConsent"
            checked={formData.communicationConsent}
            onChange={handleChange}
          />
          <span>I consent to communication</span>
        </label>

        <button
          type="submit"
          className="w-full bg-[#001b48] text-white py-2 rounded-lg hover:bg-[#2c6975] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PreAdmission;