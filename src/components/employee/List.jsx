import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [phoneSearch, setPhoneSearch] = useState('');
  const [selectedCouncelorId, setSelectedCouncelorId] = useState('all');
  const [councelors, setCouncelors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userRole, setUserRole] = useState('');
  const [typeFilter, setTypeFilter] = useState('regular'); // Default filter to regular students
  const [leadFilter, setLeadFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default 10
  const [editingRemarkId, setEditingRemarkId] = useState(null);
  const [updatedRemark, setUpdatedRemark] = useState('');
  const [isSortedAZ, setIsSortedAZ] = useState(false);
  const [loadingAssignId, setLoadingAssignId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
        setUserRole(user?.role?.toLowerCase() || '');
        } catch (err) {
          console.error("Failed to parse user from sessionStorage:", err);
          setUserRole('');
        }


      try {
        const token = localStorage.getItem('token');

        // Fetch regular students
        const empRes = await axios.get('https://servocci-backend-dip7.onrender.com/api/employee/all', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const regularStudents = empRes.data.employees.map(emp => ({
          ...emp,
          type: 'regular'
        }));

        const councelorMap = new Map();

        empRes.data.employees.forEach(emp => {
          const creator = emp.createdBy;
          if (creator?._id && creator?.name) {
            councelorMap.set(creator._id, creator.name);
          }
        });

        const councelorList = Array.from(councelorMap, ([id, name]) => ({ id, name })).sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCouncelors(councelorList);


        const combined = [...regularStudents];
        setEmployees(combined);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const handleReassign = async (employeeId, counsellorId) => {
  try {
    setLoadingAssignId(employeeId);

    const token = localStorage.getItem("token");

    await axios.post(
      "https://servocci-backend-dip7.onrender.com/api/employee/assign-leads",
      {
        studentIds: [employeeId],
        counsellorId: counsellorId || null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Reassigned successfully");

    setEmployees((prev) =>
      prev.map((emp) =>
        emp._id === employeeId
          ? {
              ...emp,
              createdBy: counsellorId
                ? {
                    _id: counsellorId,
                    name: councelors.find((c) => c.id === counsellorId)?.name
                  }
                : null,
            }
          : emp
      )
    );

  } catch (error) {
    console.error("Reassign error:", error);
    toast.error("Failed to reassign");
  } finally {
    setLoadingAssignId(null);
  }
};

  const handleLeadStatusChange = async (emp, status) => {
    const token = localStorage.getItem('token');
    try {
      const url = emp.type === 'preadmission'
        ? `https://pre-addmission-backend-178o.onrender.com/api/preadmissions/${emp._id}/lead-status`
        : `https://servocci-backend-dip7.onrender.com/api/employee/${emp._id}/lead-status`;

      await axios.put(url, { leadStatus: status }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEmployees(prev =>
        prev.map(e =>
          e._id === emp._id ? { ...e, leadStatus: status } : e
        )
      );

      toast.success("Lead status updated");
    } catch (err) {
      console.error("Error updating lead status:", err);
      toast.error("Failed to update lead status");
    }
  };

  const startEditingRemark = (emp) => {
  setEditingRemarkId(emp._id);
  setUpdatedRemark(emp.remarks || '');
};


const saveRemark = async (id) => {
  try {
   await axios.put(
  `https://servocci-backend-dip7.onrender.com/api/employee/${id}/remarks`,
  { remarks: updatedRemark },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
);

    setEditingRemarkId(null);
    setUpdatedRemark('');
    toast.success('Remark updated successfully');
    setEmployees(prev =>
  prev.map(emp =>
    emp._id === id ? { ...emp, remarks: updatedRemark } : emp
  )
);
  } catch (error) {
    console.error('Error updating remark:', error);
    toast.error('Failed to update remark');
  }
};


  const areDocumentsSubmitted = (docs) =>
    docs?.profilePhoto && docs?.aadharCard && docs?.panCard &&
    docs?.tenthMarksheet && docs?.twelfthMarksheet && docs?.competitiveMarksheet;

  // Filtering logic based on filter state
 const filteredEmployees = employees.filter((emp) => {
  const isSubmitted = areDocumentsSubmitted(emp.documents);

  const matchesFilter =
    filter === 'all' ||
    (filter === 'submitted' && isSubmitted) ||
    (filter === 'pending' && !isSubmitted);

  const matchesCouncelor =
    selectedCouncelorId === 'all' || emp.createdBy?._id === selectedCouncelorId;

  const matchesSearch = emp.fullName?.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesPhone = emp.phoneMobile?.toString().includes(phoneSearch);  // ✅ <-- added this line

  const matchesType =
    typeFilter === 'all' || emp.type === typeFilter;

  const matchesLead = !leadFilter || emp.leadStatus === leadFilter;

  return matchesFilter && matchesCouncelor && matchesSearch && matchesPhone && matchesType && matchesLead;
});

  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  let sortedEmployees = [...filteredEmployees];

  if (isSortedAZ) {
    sortedEmployees.sort((a, b) => (a.fullName || '').localeCompare(b.fullName || ''));
  }

  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className='p-6'>
  <h3 className='text-3xl font-bold text-center text-[#001b48] mb-6'>🎓 Manage Students</h3>

  <div className='flex flex-wrap justify-between items-center mb-4 gap-4'>
    {/* Search Input */}
    <input
      type="text"
      placeholder='Search by Student Name'
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      }}
      className='px-4 py-2 border rounded-lg shadow-sm w-60 focus:outline-none focus:ring-2 focus:ring-[#2c6975]'
    />
    <input
      type="text"
      placeholder='Search by Phone Number'
      value={phoneSearch}
      onChange={(e) => {
        setPhoneSearch(e.target.value);
        setCurrentPage(1);
      }}
      className='px-4 py-2 border rounded-lg shadow-sm w-60 focus:outline-none focus:ring-2 focus:ring-[#2c6975]'
    />

    <button
  onClick={() => setIsSortedAZ(prev => !prev)}
  className={`px-4 py-2 rounded-lg shadow transition ${
    isSortedAZ ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
    } text-white`}
  >
    {isSortedAZ ? '🔁 Reset Sort' : '🔤 Sort A-Z'}
  </button>


    {/* Submission Status Filter */}
    <div className="flex gap-2 items-center">
      <label htmlFor="filter" className="text-sm font-medium text-[#001b48]">Filter:</label>
      <select
        id="filter"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setCurrentPage(1);
        }}
        className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2c6975]"
      >
        <option value="all">All</option>
        <option value="submitted">Submitted</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    {/* Counselor Filter */}
    <div className="flex gap-2 items-center">
      <label htmlFor="councelorSelect" className="text-sm font-medium text-[#001b48]">Counselor:</label>
      <select
        id="councelorSelect"
        value={selectedCouncelorId}
        onChange={(e) => {
          setSelectedCouncelorId(e.target.value);
          setCurrentPage(1);
        }}
        className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2c6975]"
      >
        <option value="all">All</option>
        {councelors.map((councelor) => (
          <option key={councelor.id} value={councelor.id}>{councelor.name}</option>
        ))}
      </select>
    </div>

    {/* Lead Status Filter */}
    <div className="flex gap-2 items-center">
      <label htmlFor="leadFilter" className="text-sm font-medium text-[#001b48]">Lead Status:</label>
      <select
        id="leadFilter"
        value={leadFilter}
        onChange={(e) => {
          setLeadFilter(e.target.value);
          setCurrentPage(1);
        }}
        className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2c6975]"
      >
        <option value="">All</option>
        <option value="Pre Admission">Pre Admission</option>
        <option value="Lead Open">Lead Open</option>
        <option value="Call Not Picked">Call Not Picked</option>
        <option value="Call Back">Call Back</option>
        <option value="Switch Off / Wrong No.">Switch Off / Wrong No.</option>
        <option value="Admission Already Taken">Admission Already Taken</option>
        <option value="Follow Up">Follow Up</option>
        <option value="Admission Initiated">Admission Initiated</option>
        <option value="Application Received">Application Received</option>
        <option value="Documentation Done">Documentation Done</option>
        <option value="Admission Closed">Admission Closed</option>
        <option value="Application Rejected">Application Rejected</option>
      </select>
    </div>

    {/* Add New Student Button */}
    <Link
      to="/admin-dashboard/employee/add-application"
      className='px-4 py-2 bg-[#ff9d3d] rounded-lg text-white font-medium shadow hover:bg-[#ff7700] transition'
    >
      ➕ Add New Student
    </Link>
  </div>


 {/* Table view for md and up */}
<div className="overflow-x-auto hidden md:block">
  <table className="min-w-full text-sm border-collapse rounded-lg overflow-hidden shadow">
    <thead className="bg-[#2c6975] text-white text-left">
      <tr>
        <th className="p-3">#</th>
        <th className="p-3">Full Name</th>
        <th className="p-3">Father's Name</th>
       <th className="p-3">
  {userRole === "admin" ? "Assigned To" : "Parent Mobile"}
</th>
        <th className="p-3">Phone</th>
        <th className="p-3">Status</th>
        <th className="p-3">Actions</th>
        <th className="p-3">Remarks</th>
      </tr>
    </thead>

    <tbody className="bg-white">
      {currentEmployees.map((emp, index) => {
        const isSubmitted = areDocumentsSubmitted(emp.documents);

        return (
          <tr key={emp._id} className="border-b hover:bg-[#f9f9f9]">
            <td className="p-3">{indexOfFirstEmployee + index + 1}</td>
            <td className="p-3 font-medium text-[#001b48]">{emp.fullName}</td>
            <td className="p-3">{emp.fatherName || '—'}</td>
            <td className="p-3">
  {userRole === "admin" ? (
    <select
      value={emp.createdBy?._id || ""}
      onChange={(e) => handleReassign(emp._id, e.target.value)}
      className={`px-2 py-1 border rounded text-sm ${
  emp.createdBy ? "bg-green-50" : "bg-red-50"
}`}
    >
      <option value="">Unassigned</option>

      {councelors.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  ) : (
    emp.parentMobile || "—"
  )}
</td>
            <td className="p-3">
              {emp.type === 'regular' ? emp.phoneMobile : emp.phone || 'N/A'}
            </td>

            <td className="p-3 font-semibold whitespace-nowrap">
              {isSubmitted ? (
                <span className="text-green-600">✅ Submitted</span>
              ) : (
                <span className="text-red-500">❌ Pending</span>
              )}
            </td>

            <td className="p-3">
              <div className="flex gap-2 flex-wrap items-center">

                <Link
                  to={
                    emp.type === 'preadmission'
                      ? `/admin-dashboard/preadmission/${emp._id}/view`
                      : `/admin-dashboard/employee/${emp._id}/view`
                  }
                  className="px-3 py-1 rounded bg-[#ff4f00] text-white hover:bg-[#ff9d3d] transition"
                >
                  View
                </Link>

                {emp.type === 'preadmission' || isSubmitted ? (
                  <button
                    disabled
                    className="px-3 py-1 bg-gray-300 text-white rounded cursor-not-allowed"
                  >
                    Upload Docs
                  </button>
                ) : (
                  <Link
                    to={`/admin-dashboard/employee/${emp._id}/upload-documents`}
                    onClick={() =>
                      sessionStorage.setItem('uploadAccessEmpId', emp._id)
                    }
                    className="px-3 py-1 bg-[#2c6975] text-white rounded hover:bg-[#001b48] transition"
                  >
                    Upload Docs
                  </Link>
                )}

                <div className="relative">
                  <select
                    value={emp.leadStatus || ''}
                    onChange={(e) => handleLeadStatusChange(emp, e.target.value)}
                    className={`w-full px-3 py-2 rounded text-white border-none cursor-pointer appearance-none transition
                      ${
                        emp.leadStatus === 'Pre Admission'
                          ? 'bg-orange-600 hover:bg-orange-700'
                          : emp.leadStatus === 'Lead Open'
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : emp.leadStatus === 'Call Not Picked'
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                          : emp.leadStatus === 'Call Back'
                          ? 'bg-green-600 hover:bg-green-700'
                          : emp.leadStatus === 'Switch Off / Wrong No.'
                          ? 'bg-red-600 hover:bg-red-700'
                          : emp.leadStatus === 'Follow Up'
                          ? 'bg-indigo-600 hover:bg-indigo-700'
                          : emp.leadStatus === 'Admission Initiated'
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : emp.leadStatus === 'Application Received'
                          ? 'bg-pink-600 hover:bg-pink-700'
                          : emp.leadStatus === 'Documentation Done'
                          ? 'bg-teal-600 hover:bg-teal-700'
                          : emp.leadStatus === 'Admission Closed'
                          ? 'bg-gray-700 hover:bg-gray-800'
                          : emp.leadStatus === 'Application Rejected'
                          ? 'bg-red-500 hover:bg-red-600'
                          : emp.leadStatus === 'Admission Already Taken'
                          ? 'bg-lime-600 hover:bg-lime-700'
                          : 'bg-gray-500 hover:bg-gray-600'
                      }
                    `}
                  >
                    <option value="" disabled className="text-black bg-white">
                      Select Lead Status
                    </option>

                    <option value="Pre Admission">Pre Admission</option>
                    <option value="Lead Open">Lead Open</option>
                    <option value="Call Not Picked">Call Not Picked</option>
                    <option value="Call Back">Call Back</option>
                    <option value="Switch Off / Wrong No.">Switch Off / Wrong No.</option>
                    <option value="Admission Already Taken">Admission Already Taken</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Admission Initiated">Admission Initiated</option>
                    <option value="Application Received">Application Received</option>
                    <option value="Documentation Done">Documentation Done</option>
                    <option value="Admission Closed">Admission Closed</option>
                    <option value="Application Rejected">Application Rejected</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

              </div>
            </td>

            <td className="p-3 align-top">
              {editingRemarkId === emp._id ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={updatedRemark}
                    onChange={(e) => setUpdatedRemark(e.target.value)}
                    rows={3}
                    className="border px-2 py-1 rounded w-full resize-y"
                    placeholder="Enter remarks..."
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => saveRemark(emp._id)}
                      className="text-green-600 font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingRemarkId(null)}
                      className="text-red-500 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start gap-2">
                  <span className="whitespace-pre-wrap">{emp.remarks || '—'}</span>
                  <button
                    onClick={() => {
                      setEditingRemarkId(emp._id);
                      setUpdatedRemark(emp.remarks || '');
                    }}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                </div>
              )}
            </td>
          </tr>
        );
      })}

      {filteredEmployees.length === 0 && (
        <tr>
          <td colSpan="9" className="text-center p-4 text-gray-500">
            No matching students found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>



{/* Card view for mobile screens */}
<div className="md:hidden space-y-4">
  {currentEmployees.map((emp) => {
    const isSubmitted = areDocumentsSubmitted(emp.documents);
    return (
      <div key={emp._id} className="bg-white rounded-lg shadow p-4 border relative">
        <div className="mb-2">
          <p className="text-xs text-gray-500 font-semibold">Reg. No.: {emp.regNumber || '—'}</p>
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-[#001b48]">{emp.fullName}</h4>
            <span className={`text-sm font-semibold ${isSubmitted ? 'text-green-600' : 'text-red-500'}`}>
              {isSubmitted ? '✅ Submitted' : '❌ Pending'}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Father's Name:</strong> {emp.fatherName || '—'}</p>
          <p><strong>Parent Mobile:</strong> {emp.parentMobile || '—'}</p>
          <p><strong>Phone:</strong> {emp.type === 'regular' ? emp.phoneMobile : emp.phone || 'N/A'}</p>
          {userRole === "admin" ? (
  <div>
    <p className="text-sm font-semibold text-gray-600 mb-1">Assigned To:</p>

    <select
      value={emp.createdBy?._id || ""}
      onChange={(e) => handleReassign(emp._id, e.target.value)}
      className={`w-full px-2 py-2 rounded border text-sm ${
        emp.createdBy ? "bg-green-50" : "bg-red-50"
      }`}
    >
      <option value="">Unassigned</option>

      {councelors.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  </div>
) : (
  <p><strong>Parent Mobile:</strong> {emp.parentMobile || '—'}</p>
)}
        </div>

        <div className="flex gap-2 mt-4 relative flex-wrap">
          <Link
            to={
              emp.type === 'preadmission'
                ? `/admin-dashboard/preadmission/${emp._id}/view`
                : `/admin-dashboard/employee/${emp._id}/view`
            }
            className="px-3 py-1 rounded bg-[#ff4f00] text-white hover:bg-[#ff9d3d] transition"
          >
            View
          </Link>

          {emp.type === 'preadmission' || isSubmitted ? (
            <button
              disabled
              className="flex-1 px-3 py-2 bg-gray-300 text-white rounded cursor-not-allowed"
            >
              Upload Docs
            </button>
          ) : (
            <Link
              to={`/admin-dashboard/employee/${emp._id}/upload-documents`}
              onClick={() => sessionStorage.setItem('uploadAccessEmpId', emp._id)}
              className="flex-1 text-center px-3 py-2 bg-[#2c6975] text-white rounded hover:bg-[#001b48] transition"
            >
              Upload Docs
            </Link>
          )}

          <select
            value={emp.leadStatus || ''}
            onChange={(e) => handleLeadStatusChange(emp, e.target.value)}
            className={`w-full mt-2 px-3 py-2 rounded text-white border-none cursor-pointer appearance-none transition
              ${
                emp.leadStatus === 'Lead Open'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : emp.leadStatus === 'Call Not Picked'
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                  : emp.leadStatus === 'Call Back'
                  ? 'bg-green-600 hover:bg-green-700'
                  : emp.leadStatus === 'Switch Off / Wrong No.'
                  ? 'bg-red-600 hover:bg-red-700'
                  : emp.leadStatus === 'Follow Up'
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : emp.leadStatus === 'Admission Initiated'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : emp.leadStatus === 'Application Received'
                  ? 'bg-pink-600 hover:bg-pink-700'
                  : emp.leadStatus === 'Documentation Done'
                  ? 'bg-teal-600 hover:bg-teal-700'
                  : emp.leadStatus === 'Admission Closed'
                  ? 'bg-gray-700 hover:bg-gray-800'
                  : emp.leadStatus === 'Application Rejected'
                  ? 'bg-red-500 hover:bg-red-600'
                  : emp.leadStatus === 'Admission Already Taken'
                  ? 'bg-lime-600 hover:bg-lime-700'
                  : 'bg-gray-500 hover:bg-gray-600'
              }
            `}
          >
            <option value="" disabled className="text-black bg-white">Select Lead Status</option>
            <option value="Lead Open">Lead Open</option>
            <option value="Call Not Picked">Call Not Picked</option>
            <option value="Call Back">Call Back</option>
            <option value="Switch Off / Wrong No.">Switch Off / Wrong No.</option>
            <option value="Admission Already Taken">Admission Already Taken</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Admission Initiated">Admission Initiated</option>
            <option value="Application Received">Application Received</option>
            <option value="Documentation Done">Documentation Done</option>
            <option value="Admission Closed">Admission Closed</option>
            <option value="Application Rejected">Application Rejected</option>
          </select>
        </div>

        {/* Remarks Section */}
        <div className="mt-4">
          {editingRemarkId === emp._id ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={updatedRemark}
                onChange={(e) => setUpdatedRemark(e.target.value)}
                rows={3}
                className="border px-2 py-1 rounded w-full resize-y"
                placeholder="Enter remarks..."
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => saveRemark(emp._id)}
                  className="text-green-600 font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingRemarkId(null)}
                  className="text-red-500 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="whitespace-pre-wrap text-sm text-gray-700">
                {emp.remarks || 'No remarks yet.'}
              </p>
              <button
                onClick={() => {
                  setEditingRemarkId(emp._id);
                  setUpdatedRemark(emp.remarks || '');
                }}
                className="text-blue-600 hover:underline text-sm ml-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  })}
  {filteredEmployees.length === 0 && (
    <div className="text-center text-gray-500 py-4">
      No matching students found.
    </div>
  )}
</div>





      {/* Pagination */}
<div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
  <div className="flex items-center gap-2">
    <label htmlFor="rowsPerPage" className="text-sm text-[#001b48] font-medium">
      Rows per page:
    </label>
    <select
      id="rowsPerPage"
      value={rowsPerPage}
      onChange={(e) => setRowsPerPage(Number(e.target.value))}
      className="px-2 py-1 border rounded-md text-sm"
    >
      {[5, 10, 15, 20, 25, 50].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div>

  <div className="flex justify-between items-center gap-4">
    <button
      onClick={prevPage}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
    >
      ⬅️ Previous
    </button>
    <span className="text-[#001b48] font-medium text-sm">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={nextPage}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
    >
      Next ➡️
    </button>
  </div>
</div>

    </div>
  );
};

export default List; 