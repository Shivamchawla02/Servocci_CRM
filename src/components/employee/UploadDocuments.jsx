import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadDocuments = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false); // ← new loading state
  const [documents, setDocuments] = useState({
    profilePhoto: null,
    aadharCard: null,
    panCard: null,
    tenthMarksheet: null,
    twelfthMarksheet: null,
    competitiveMarksheet: null,
  });

  const CLOUDINARY_UPLOAD_PRESET = 'servocci_unsigned';
  const CLOUDINARY_CLOUD_NAME = 'dhpm7jmyy';

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`https://servocci-backend-dip7.onrender.com/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEmployee(res.data.employee);
      } catch (error) {
        console.error("Error fetching employee:", error);
        toast.error("Failed to fetch employee details.");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, files } = e.target;
    setDocuments((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleUpload = async () => {
    for (const key in documents) {
      if (!documents[key]) {
        toast.warn(`Please upload ${key.replace(/([A-Z])/g, ' $1')}`);
        return;
      }
    }

    setLoading(true);
    toast.info("Uploading documents... Please wait.");

    const uploadedUrls = {};

    for (const key in documents) {
      const formData = new FormData();
      formData.append("file", documents[key]);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
          formData
        );
        uploadedUrls[key] = response.data.secure_url;
      } catch (error) {
        console.error(`Upload failed for ${key}:`, error);
        toast.error(`Failed to upload ${key}`);
        setLoading(false);
        return;
      }
    }

    try {
      await axios.post(
        `https://servocci-backend-dip7.onrender.com/api/employee/${id}/upload-documents`,
        { documents: uploadedUrls },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Documents uploaded and saved!");
      setTimeout(() => navigate('/admin-dashboard/employees'), 2000);
    } catch (error) {
      console.error("Backend update failed:", error);
      toast.error("Failed to save document URLs to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <button
        onClick={() => navigate('/admin-dashboard/employees')}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded mb-4 flex items-center space-x-2 text-sm sm:text-base"
      >
        <span>&larr;</span>
        <span>Back to Application List</span>
      </button>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Upload Documents for <span className="text-green-700">{employee.fullName}</span>
        </h2>

        <div className="space-y-6">
          {[
            { label: 'Profile Photo', name: 'profilePhoto' },
            { label: 'Aadhaar Card', name: 'aadharCard' },
            { label: 'PAN Card', name: 'panCard' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">{field.label}</label>
              <input
                type="file"
                name={field.name}
                accept=".jpg,.jpeg,.png,.pdf"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
                onChange={handleChange}
              />
              {documents[field.name] && (
                <p className="text-sm text-gray-600 mt-1">{documents[field.name].name}</p>
              )}
            </div>
          ))}

          <h3 className="text-lg font-semibold text-gray-800 mt-6">Educational Certificates</h3>

          {[
            { label: '10th Marksheet', name: 'tenthMarksheet' },
            { label: '12th Marksheet', name: 'twelfthMarksheet' },
            { label: 'Competitive Marksheet (NEET/JEE/CUET/IPU-CET/BITSAT ETC)', name: 'competitiveMarksheet' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">{field.label}</label>
              <input
                type="file"
                name={field.name}
                accept=".jpg,.jpeg,.png,.pdf"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
                onChange={handleChange}
              />
              {documents[field.name] && (
                <p className="text-sm text-gray-600 mt-1">{documents[field.name].name}</p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`mt-8 w-full sm:w-auto text-white font-semibold py-2 px-6 rounded text-sm sm:text-base ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Uploading...' : 'Upload Documents'}
        </button>
      </div>
    </div>
  );
};

export default UploadDocuments;
