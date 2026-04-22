import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentUploadPublic = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  const CLOUDINARY_UPLOAD_PRESET = "servocci_unsigned";
  const CLOUDINARY_CLOUD_NAME = "dhpm7jmyy";
  const BACKEND_URL = "https://servocci-backend-dip7.onrender.com";

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneMobile: "",
    email: "",
  });

  const [documents, setDocuments] = useState({
    profilePhoto: null,
    aadharCard: null,
    panCard: null,
    tenthMarksheet: null,
    twelfthMarksheet: null,
    competitiveMarksheet: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments({ ...documents, [name]: files[0] });
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      data,
      {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      }
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      toast.error("Invalid counsellor link.");
      return;
    }

    if (!formData.fullName || !formData.phoneMobile || !formData.email) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      // ✅ Duplicate mobile check
      const duplicateCheck = await axios.get(
        `${BACKEND_URL}/api/employee/check-mobile/${formData.phoneMobile}`
      );

      if (duplicateCheck.data.exists) {
        toast.error("This mobile number already exists.");
        setLoading(false);
        return;
      }

      toast.info("Uploading documents...");

      const uploadedUrls = {};

      for (const key in documents) {
        if (!documents[key]) {
          toast.error(`Please upload ${key}`);
          setLoading(false);
          return;
        }

        uploadedUrls[key] = await uploadToCloudinary(documents[key]);
      }

      // ✅ Create new employee entry
      await axios.post(
        `${BACKEND_URL}/api/employee/public-document-upload`,
        {
          ...formData,
          documents: uploadedUrls,
          counsellorCode: code,
          leadStatus: "Application Received",
        }
      );

      toast.success("Documents submitted successfully!");

      // Reset form
      setFormData({
        fullName: "",
        phoneMobile: "",
        email: "",
      });

      setDocuments({
        profilePhoto: null,
        aadharCard: null,
        panCard: null,
        tenthMarksheet: null,
        twelfthMarksheet: null,
        competitiveMarksheet: null,
      });

      setUploadProgress(0);

    } catch (error) {
      console.error(error);
      toast.error("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#001b48] text-center">
          Document Upload Form
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

        <h3 className="font-semibold mt-4">Upload Documents</h3>

        {[
          { label: "Profile Photo", name: "profilePhoto" },
          { label: "Aadhaar Card", name: "aadharCard" },
          { label: "PAN Card", name: "panCard" },
          { label: "10th Marksheet", name: "tenthMarksheet" },
          { label: "12th Marksheet", name: "twelfthMarksheet" },
          { label: "Competitive Marksheet", name: "competitiveMarksheet" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            <input
              type="file"
              name={field.name}
              accept=".jpg,.jpeg,.png,.pdf"
              required
              onChange={handleFileChange}
              className="w-full border rounded p-2"
            />
          </div>
        ))}

        {loading && (
          <div className="w-full bg-gray-200 rounded">
            <div
              className="bg-green-600 text-xs text-white text-center p-1 rounded"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#001b48] hover:bg-[#2c6975]"
          }`}
        >
          {loading ? "Uploading..." : "Submit Documents"}
        </button>
      </form>
    </div>
  );
};

export default DocumentUploadPublic;