import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DepartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`https://servocci-backend-dip7.onrender.com/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        console.error('Error fetching department:', error);
      }
    };

    fetchDepartment();
  }, [id]);

  if (!department)
    return (
      <div className="text-center p-6 text-[#001b48] font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto bg-white rounded-3xl shadow-lg space-y-8">
      {/* Logo */}
      <div className="flex justify-center">
        {department.logo ? (
          <img
            src={department.logo}
            alt={`${department.dep_name} logo`}
            className="w-28 h-28 object-contain rounded-full border-4 border-[#ff4f00] shadow-md"
          />
        ) : (
          <div className="w-28 h-28 flex items-center justify-center bg-gray-200 rounded-full text-gray-400 font-semibold text-lg">
            No Logo
          </div>
        )}
      </div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-[#001b48] text-center">
        Institution Details
      </h2>

      {/* Info Section */}
      <div className="space-y-4 text-gray-800 text-base sm:text-lg">
        <p>
          <strong className="text-[#ff4f00]">Institution Name:</strong>{' '}
          {department.dep_name}
        </p>
        <p>
          <strong className="text-[#ff4f00]">State:</strong>{' '}
          {department.state || 'Not Available'}
        </p>
        <p>
          <strong className="text-[#ff4f00]">Place:</strong>{' '}
          {department.place || 'Not Available'}
        </p>
        <p>
          <strong className="text-[#ff4f00]">Course Name:</strong>{' '}
          {department.course_name}
        </p>
        <p>
          <strong className="text-[#ff4f00]">Specialization:</strong>{' '}
          {department.specialization || 'Not Available'}
        </p>
        <p>
          <strong className="text-[#ff4f00]">Duration:</strong>{' '}
          {department.duration || 'Not Available'}
        </p>
        <p>
          <strong className="text-[#ff4f00]">Eligibility:</strong>{' '}
          {department.eligibility || 'Not Available'}
        </p>
        <p>
          <strong className="text-[#ff4f00]">Full Tenure Fees: </strong> ₹
          {department.fees || 'Not Available'}
        </p>

        <div>
          <strong className="text-[#ff4f00]">Description:</strong>
          <p
            className="mt-1 max-h-48 overflow-y-auto whitespace-pre-line text-gray-700"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {department.description || 'No description available.'}
          </p>
        </div>
      </div>

      {/* Go Back Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white font-semibold rounded-full transition-shadow shadow-md"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default DepartmentDetails;
