import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    course_name: '',
    dep_name: '',
    specialization: '',
    duration: '',
    eligibility: '',
    fees: '',
    description: '',
    state: '',
    place: '',
  });

  const [logoFile, setLogoFile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let finalLogoUrl = '';
      if (logoFile) {
        finalLogoUrl = await uploadToCloudinary(logoFile); // Upload the logo to Cloudinary
      }
  
      const payload = {
        ...department,
        logo: finalLogoUrl, // Add the logo URL to the department data
      };
  
      const response = await axios.post(
        'https://servocci-backend-dip7.onrender.com/api/department/add',
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
  
      if (response.data.success) {
        toast.success('Institution added successfully!');
        // Reset form fields
        setDepartment({
          course_name: '',
          dep_name: '',
          specialization: '',
          duration: '',
          eligibility: '',
          fees: '',
          description: '',
          state: '',
          place: '',
        });
        setLogoFile(null); // Clear logo state
        setTimeout(() => navigate('/admin-dashboard/departments'), 2000);
      }
    } catch (error) {
      if (error.response && error.response.data && !error.response.data.success) {
        toast.error(error.response.data.error);
      } else {
        toast.error('An error occurred while adding the institution.');
        console.error(error);
      }
    }
  };
  

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'department_logos'); // replace with your Cloudinary preset
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dhpm7jmyy/image/upload`, // replace with your Cloudinary cloud name
      formData
    );
    return res.data.secure_url;
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-[#f9f7d9] p-10 rounded-xl shadow-md border border-[#ff9d3d]">
      <h2 className="text-3xl font-bold mb-8 text-[#001b48] text-center">
        Add New Institution
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium text-[#001b48]">
              Course Name
            </label>
            <select
              name="course_name"
              value={department.course_name}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-[#2c6975] rounded-md bg-white"
            >
              <option value='' disabled>Select Course</option>
                            <option value='B.Tech'>B.Tech</option>
                            <option value='MBA'>MBA</option>
                            <option value='MCA'>MCA</option>
                            <option value='BBA'>BBA</option>
                            <option value='B.Sc'>B.Sc</option>
                            <option value='M.Tech'>M.Tech</option>
                            <option value='PhD'>PhD</option>
                            <option value='B.Com'>B.Com</option>
                            <option value='M.Com'>M.Com</option>
                            <option value='MBBS'>MBBS</option>
                            <option value='BDS'>BDS</option>
                            <option value='B.Pharm'>B.Pharm</option>
                            <option value='M.Pharm'>M.Pharm</option>
                            <option value='BCA'>BCA</option>
                            <option value='BA-LLB'>BA-LLB</option>
                            <option value='B.COM-LLB'>B.COM-LLB</option>
                            <option value='M.Sc'>M.Sc</option>
                            <option value='B.Arch'>B.Arch</option>
                            <option value='LLB'>LLB</option>
                            <option value='LLM'>LLM</option>
                            <option value='B.Ed'>B.Ed</option>
                            <option value='M.Ed'>M.Ed</option>
                            <option value='BPT'>BPT</option>
                            <option value='MPT'>MPT</option>
                            <option value='BHMS'>BHMS</option>
                            <option value='BAMS'>BAMS</option>
                            <option value='D.Pharm'>D.Pharm</option>
                            <option value='BHM'>BHM</option>
                            <option value='B.Des'>B.Des</option>
                            <option value='M.Des'>M.Des</option>
                            <option value='BFA'>BFA</option>
                            <option value='MFA'>MFA</option>
                            <option value='B.El.Ed'>B.El.Ed</option>
                            <option value='B.Lib.I.Sc'>B.Lib.I.Sc</option>
                            <option value='M.Lib.I.Sc'>M.Lib.I.Sc</option>
                            <option value='BAMS'>BAMS</option>
                            <option value='BPT'>BPT</option>
                            <option value='MPT'>MPT</option>
                            <option value='M.S. Engineering'>M.S. Engineering</option>
                        </select>
          </div>

          {/* Institution Name */}
          <div>
            <label className="block text-sm font-medium text-[#001b48]">
              Institution Name
            </label>
            <input
              type="text"
              name="dep_name"
              value={department.dep_name}
              onChange={handleChange}
              required
              placeholder="Enter Institute Name"
              className="mt-1 w-full p-2 border border-[#2c6975] rounded-md"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium text-[#001b48]">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={department.specialization}
              onChange={handleChange}
              placeholder="Enter Specialization"
              className="mt-1 w-full p-2 border border-[#2c6975] rounded-md"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-[#001b48]">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={department.duration}
              onChange={handleChange}
              placeholder="Enter Duration (e.g., 4 years)"
              className="mt-1 w-full p-2 border border-[#2c6975] rounded-md"
            />
          </div>

          {/* Eligibility */}
          <div>
            <label className="block text-sm font-medium text-[#001b48]">
              Eligibility
            </label>
            <input
              type="text"
              name="eligibility"
              value={department.eligibility}
              onChange={handleChange}
              placeholder="Enter Eligibility Criteria"
              className="mt-1 w-full p-2 border border-[#2c6975] rounded-md"
            />
          </div>

          {/* Fees */}
          <div>
            <label className="block text-sm font-medium text-[#001b48]">
              Fees Per Year
            </label>
            <input
              type="number"
              name="fees"
              value={department.fees}
              onChange={handleChange}
              placeholder="Enter Fees"
              className="mt-1 w-full p-2 border border-[#2c6975] rounded-md"
            />
          </div>

          {/* Place */}
          <div>
            <label className="block text-sm font-medium text-[#001b48]">
              Place
            </label>
            <input
              type="text"
              name="place"
              value={department.place}
              onChange={handleChange}
              placeholder="Enter Place"
              required
              className="mt-1 w-full p-2 border border-[#2c6975] rounded-md"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-[#001b48]">
              State
            </label>
            <select
              name="state"
              value={department.state}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-[#2c6975] rounded-md bg-white"
            >
              <option value="" disabled>Select State</option>
              <option value='International'>International</option>
              <option value='Andhra Pradesh'>Andhra Pradesh</option>
              <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
              <option value='Assam'>Assam</option>
              <option value='Bihar'>Bihar</option>
              <option value='Chhattisgarh'>Chhattisgarh</option>
              <option value='Delhi'>Delhi</option>
              <option value='Goa'>Goa</option>
              <option value='Gujarat'>Gujarat</option>
              <option value='Haryana'>Haryana</option>
              <option value='Himachal Pradesh'>Himachal Pradesh</option>
              <option value='Jharkhand'>Jharkhand</option>
              <option value='Karnataka'>Karnataka</option>
              <option value='Kerala'>Kerala</option>
              <option value='Madhya Pradesh'>Madhya Pradesh</option>
              <option value='Maharashtra'>Maharashtra</option>
              <option value='Manipur'>Manipur</option>
              <option value='Meghalaya'>Meghalaya</option>
              <option value='Mizoram'>Mizoram</option>
              <option value='Nagaland'>Nagaland</option>
              <option value='Odisha'>Odisha</option>
              <option value='Punjab'>Punjab</option>
              <option value='Rajasthan'>Rajasthan</option>
              <option value='Sikkim'>Sikkim</option>
              <option value='Tamil Nadu'>Tamil Nadu</option>
              <option value='Telangana'>Telangana</option>
              <option value='Tripura'>Tripura</option>
              <option value='Uttar Pradesh'>Uttar Pradesh</option>
              <option value='Uttarakhand'>Uttarakhand</option>
              <option value='West Bengal'>West Bengal</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#001b48]">
            Description
          </label>
          <textarea
            name="description"
            value={department.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter a brief description"
            className="mt-1 w-full p-2 border border-[#2c6975] rounded-md"
          ></textarea>
        </div>

       {/* Logo Upload */}
       <div>
          <label className="block text-sm font-medium text-[#001b48]">
            Upload Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files[0])}
            className="mt-1 w-full p-2 border border-[#2c6975] rounded-md bg-white"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#ff4f00] hover:bg-[#ff9d3d] text-white font-bold py-3 px-6 rounded-md transition-all duration-300"
        >
          Add Institution
        </button>
      </form>

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddDepartment;
