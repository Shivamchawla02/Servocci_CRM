import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PreadmissionStudentView = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(
          `https://servocci-backend-dip7.onrender.com/api/preadmissions/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStudent(res.data);
      } catch (error) {
        console.error('Error fetching preadmission student:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading student details...</div>;
  }

  if (!student) {
    return <div className="p-6 text-center text-red-500">Student not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-[#001b48] mb-6">
        👤 Preadmission Student Details
      </h2>

      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-800">

        <Info label="Full Name" value={student.fullName} />
        <Info label="Email" value={student.email} />
        <Info label="Phone" value={student.phone} />
        <Info label="DOB" value={student.dob ? new Date(student.dob).toLocaleDateString() : "N/A"} />
        <Info label="Gender" value={student.gender} />
        <Info label="Father's Name" value={student.fatherName} />
        <Info label="Mother's Name" value={student.motherName} />

        <Info label="Colleges" value={student.colleges?.join(', ') || "N/A"} />
        <Info label="Degree Courses" value={student.courses?.join(', ') || "N/A"} />
        <Info label="Cities" value={student.cities?.join(', ') || "N/A"} />
        <Info label="Training Skill Courses" value={student.skills?.join(', ') || "N/A"} />
        <Info label="Remarks" value={student.remarks || "N/A"} />

      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
    <p className="font-semibold text-[#001b48]">{label}</p>
    <p>{value}</p>
  </div>
);

export default PreadmissionStudentView;