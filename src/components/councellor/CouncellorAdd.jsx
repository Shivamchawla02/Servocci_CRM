import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CouncellorAdd = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadhaar: '',
    pan: '',
    username: '',
    gst: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'councelor',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
      } else {
        setErrors((prev) => ({ ...prev, image: "Only image files are allowed." }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    try {
      const response = await axios.post(
        "https://servocci-backend-dip7.onrender.com/api/councellor/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        const code = response.data.counsellor?.counsellorCode || 'N/A';
        toast.success(`Counsellor added! 4-digit code: ${code}`);
        navigate("/admin-dashboard/councellor");

        setFormData({
          name: '', phone: '', aadhaar: '', pan: '', username: '',
          gst: '', email: '', password: '', confirmPassword: '', role: 'councelor', image: null
        });
        setImagePreview(null);
        setErrors({});
      }
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-md space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#001b48]">Add Councellor</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {[
            { label: 'Name', name: 'name', placeholder: 'Enter full name' },
            { label: 'Phone Number', name: 'phone', placeholder: '10-digit phone number' },
            { label: 'Aadhaar Card Number', name: 'aadhaar', placeholder: '12-digit Aadhaar number' },
            { label: 'PAN Card Number', name: 'pan', placeholder: 'ABCDE1234F', className: 'uppercase' },
            { label: 'Username / Phone as ID', name: 'username', placeholder: 'Username or phone as ID' },
            { label: 'GST Number (Optional)', name: 'gst', placeholder: 'Enter GST number', className: 'uppercase' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email address' },
            { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter password' },
            { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: 'Re-enter password' },
          ].map(({ label, name, placeholder, type = 'text', className = '' }) => (
            <div key={name}>
              <label className="block text-[color:#001b48] font-medium text-sm sm:text-base">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full mt-1 p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base ${className}`}
              />
            </div>
          ))}

          <div>
            <label className="block text-[color:#001b48] font-medium text-sm sm:text-base">Upload Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full mt-1 p-2 sm:p-3 border border-gray-300 rounded-md"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="mt-2 w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-full border"
              />
            )}
          </div>

          <div>
            <label className="block text-[color:#001b48] font-medium text-sm sm:text-base">Role</label>
            <select
  name="role"
  value={formData.role}
  onChange={handleChange}
  className="w-full mt-1 p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base"
>
  <option value="councelor">Counsellor</option>
  <option value="manager">Manager</option>   {/* ✅ NEW */}
  <option value="admin">Admin</option>
</select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#001b48] hover:bg-[#ff4f00] text-white font-bold py-2 sm:py-3 px-4 rounded-md transition duration-300 text-sm sm:text-base"
        >
          Submit
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default CouncellorAdd;
