import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
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
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://servocci-backend-dip7.onrender.com/api/employee/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        toast.success("Student added successfully!");
        setFormData({
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
        });

        setTimeout(() => {
          navigate("/admin-dashboard/employees");
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.data && !error.response.data.success) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred while adding the student.");
        console.error(error);
      }
    }
  };

  const placeholders = {
    tenthSchool: "10th School Name",
    tenthBoard: "10th Board",
    tenthYear: "10th Passing Year",
    tenthPercentage: "10th Percentage",
    twelfthSchool: "12th School Name",
    twelfthBoard: "12th Board",
    twelfthYear: "12th Passing Year",
    twelfthPercentage: "12th Percentage",
    subjectsTaken: "Subjects Taken (12th)"
  };

  const coursePlaceholders = {
    intendedMajor: "Course Name",
    minor: "Specialization (if any)"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 bg-[var(--light-white)] shadow-lg rounded-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center mb-10 text-[var(--primary-dark)]">Student Admission Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[var(--primary-dark)]">

        <h3 className="col-span-full text-xl font-bold text-[var(--accent-orange)]">Personal Information</h3>

        {[
          { name: 'fullName', placeholder: 'Full Name', type: 'text', required: true },
          { name: 'dob', type: 'date' },
          {
            name: 'gender',
            type: 'select',
            options: ['', 'Male', 'Female']
          },
          { name: 'nationality', placeholder: 'Nationality', type: 'text' },
          { name: 'phoneMobile', placeholder: 'Mobile Phone', type: 'tel', required: true },
          { name: 'phoneHome', placeholder: 'Home Phone', type: 'tel' },
          { name: 'parentMobile', placeholder: 'Parent Mobile', type: 'tel' },
          { name: 'email', placeholder: 'Email', type: 'email' },
          { name: 'aadhaarNumber', placeholder: 'Aadhaar Number', type: 'text' },
          { name: 'regNumber', placeholder: 'Registration Number', type: 'text' },
          { name: 'fatherName', placeholder: "Father's Name", type: 'text' }
        ].map((field, index) => (
          <div key={index} className="col-span-full sm:col-span-1">
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
              >
                <option value="">Select Gender</option>
                {field.options.slice(1).map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                placeholder={field.placeholder}
                maxLength={field.name === 'aadhaarNumber' ? 12 : undefined}
                onChange={handleChange}
                required={field.required || false}
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
              value={formData[name]}
              placeholder={placeholders[name]}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
            />
          </div>
        ))}

        <h3 className="col-span-full text-xl font-bold text-[var(--accent-orange)]">Institution Selection</h3>
        <div className="col-span-full sm:col-span-2">
          <input
            type="text"
            name="department"
            value={formData.department}
            placeholder="Institution Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
          />
        </div>

        <h3 className="col-span-full text-xl font-bold text-[var(--accent-orange)]">Course Applied For</h3>
        {['intendedMajor', 'minor'].map((field, i) => (
          <div key={i} className="col-span-full sm:col-span-1">
            <input
              type="text"
              name={field}
              value={formData[field]}
              placeholder={coursePlaceholders[field]}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
            />
          </div>
        ))}

        <h3 className="col-span-full text-xl font-bold text-[var(--accent-orange)]">Emergency / Parent / Guardian</h3>
        <div className="col-span-full sm:col-span-1">
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            placeholder="Emergency Contact Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
          />
        </div>
        <div className="col-span-full sm:col-span-1">
          <input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            placeholder="Emergency Phone no."
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-[var(--pale-beige)]"
          />
        </div>

        <h3 className="col-span-full text-xl font-bold text-[var(--accent-orange)]">Declaration & Consent</h3>
        <div className="col-span-full">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="communicationConsent"
              checked={formData.communicationConsent}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span>I consent to receive updates and communication</span>
          </label>
        </div>

        <div className="col-span-full">
          <button
            type="submit"
            className="w-full bg-[var(--primary-dark)] text-white p-3 rounded-lg hover:bg-[var(--accent-orange)] transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
