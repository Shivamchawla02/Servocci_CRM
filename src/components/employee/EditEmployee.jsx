import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    nationality: '',
    phoneMobile: '',
    phoneHome: '',
    parentMobile: '',
    email: '',
    permanentAddress: '',
    aadhaarNumber: '',
    regNumber: '',
    fatherName: '',
    tenthSchool: '',
    tenthBoard: '',
    tenthYear: '',
    tenthPercentage: '',
    twelfthSchool: '',
    twelfthBoard: '',
    twelfthYear: '',
    twelfthPercentage: '',
    subjectsTaken: '',
    department: '',
    intendedMajor: '',
    minor: '',
    scholarship: false,
    preferredTerm: '',
    emergencyContactName: '',
    emergencyPhone: '',
    emergencyEmail: '',
    communicationConsent: false,
    remarks: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://servocci-backend-dip7.onrender.com/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFormData(res.data.employee);
      } catch (err) {
        toast.error('Failed to load employee');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://servocci-backend-dip7.onrender.com/api/employee/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('✅ Profile updated successfully!');
      setTimeout(() => navigate(`/admin-dashboard/employee/${id}/view`), 1000);
    } catch (err) {
      toast.error('❌ Update failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 bg-[var(--light-white)] shadow-lg rounded-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center mb-10 text-[var(--primary-dark)]">Edit Student Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[var(--primary-dark)]">

        {/* Section: Personal Info */}
        <h3 className="col-span-full text-xl font-bold text-[var(--accent-orange)]">Personal Information</h3>
        {[
          { name: 'fullName', placeholder: 'Full Name' },
          { name: 'dob', type: 'date' },
          {
            name: 'gender',
            type: 'select',
            options: ['Male', 'Female']
          },
          { name: 'nationality', placeholder: 'Nationality' },
          { name: 'phoneMobile', placeholder: 'Mobile Phone' },
          { name: 'phoneHome', placeholder: 'Home Phone' },
          { name: 'parentMobile', placeholder: 'Parent Mobile' },
          { name: 'email', placeholder: 'Email' },
          { name: 'aadhaarNumber', placeholder: 'Aadhaar Number' },
          { name: 'regNumber', placeholder: 'Registration Number' },
          { name: 'fatherName', placeholder: "Father's Name" }
        ].map((field, index) => (
          <div key={index} className="col-span-full sm:col-span-1">
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
              >
                <option value="">Select Gender</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                placeholder={field.placeholder}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
              />
            )}
          </div>
        ))}

        <div className="col-span-full">
          <textarea
            name="permanentAddress"
            value={formData.permanentAddress}
            placeholder="Permanent Address"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
          />
        </div>

        {/* Section: Academic History */}
        <h3 className="col-span-full text-xl font-bold text-[var(--accent-orange)]">Academic History</h3>
        {[
          'tenthSchool', 'tenthBoard', 'tenthYear', 'tenthPercentage',
          'twelfthSchool', 'twelfthBoard', 'twelfthYear', 'twelfthPercentage',
          'subjectsTaken'
        ].map((name, i) => (
          <div key={i} className="col-span-full sm:col-span-1">
            <input
              type="text"
              name={name}
              value={formData[name] || ''}
              placeholder={name.replace(/([A-Z])/g, ' $1')}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
            />
          </div>
        ))}

        {/* Section: Course/Department */}
        <h3 className="col-span-full text-xl font-bold text-[var(--accent-orange)]">Institution & Course Info</h3>
        {['department', 'intendedMajor', 'minor'].map((field, i) => (
          <div key={i} className="col-span-full sm:col-span-1">
            <input
              type="text"
              name={field}
              value={formData[field] || ''}
              placeholder={field.replace(/([A-Z])/g, ' $1')}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
            />
          </div>
        ))}

        {/* Section: Emergency Contact */}
        <h3 className="col-span-full text-xl font-bold text-[var(--accent-orange)]">Emergency Contact</h3>
        {['emergencyContactName', 'emergencyPhone', 'emergencyEmail'].map((field, i) => (
          <div key={i} className="col-span-full sm:col-span-1">
            <input
              type="text"
              name={field}
              value={formData[field] || ''}
              placeholder={field.replace(/([A-Z])/g, ' $1')}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
            />
          </div>
        ))}

        {/* Consent Checkboxes */}
        <div className="col-span-full flex flex-col gap-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="scholarship"
              checked={formData.scholarship || false}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="ml-2">Scholarship Applied</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="communicationConsent"
              checked={formData.communicationConsent || false}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="ml-2">Consent for Communication</span>
          </label>
        </div>

        {/* Remarks */}
        <div className="col-span-full">
          <textarea
            name="remarks"
            value={formData.remarks || ''}
            placeholder="Remarks"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
          />
        </div>

        {/* Submit */}
        <div className="col-span-full">
          <button
            type="submit"
            className="w-full bg-[var(--primary-dark)] text-white p-3 rounded-lg hover:bg-[var(--accent-orange)] transition"
          >
            💾 Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
