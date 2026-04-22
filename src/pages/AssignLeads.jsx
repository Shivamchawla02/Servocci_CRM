import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignLeads = () => {
  const [leads, setLeads] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [counsellors, setCounsellors] = useState([]);
  const [selectedCounsellor, setSelectedCounsellor] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // 🔥 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // 🔹 Fetch unassigned leads
  const fetchLeads = async () => {
    try {
      setFetching(true);

      const res = await axios.get(
        "https://servocci-backend-dip7.onrender.com/api/employee/unassigned",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLeads(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch leads");
    } finally {
      setFetching(false);
    }
  };

  // 🔹 Fetch counsellors
  const fetchCounsellors = async () => {
    try {
      const res = await axios.get(
        "https://servocci-backend-dip7.onrender.com/api/councellor/list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCounsellors(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch counsellors");
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchCounsellors();
  }, []);

  // 🔥 PAGINATION LOGIC
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentLeads = leads.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(leads.length / rowsPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const prevPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  // 🔹 Handle single select
  const handleSelect = (id) => {
    let updated;

    if (selected.includes(id)) {
      updated = selected.filter((i) => i !== id);
    } else {
      updated = [...selected, id];
    }

    setSelected(updated);
    setSelectAll(updated.length === leads.length);
  };

  // 🔹 Select all (ONLY CURRENT PAGE)
  const handleSelectAll = () => {
    const currentIds = currentLeads.map((l) => l._id);

    if (selectAll) {
      setSelected((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      setSelected((prev) => [...new Set([...prev, ...currentIds])]);
    }

    setSelectAll(!selectAll);
  };

  // 🔹 Select first N
  const handleSelectLimit = (limit) => {
    const limited = leads.slice(0, limit).map((l) => l._id);
    setSelected(limited);
    setSelectAll(false);
  };

  // 🔹 Assign leads
  const handleAssign = async () => {
    if (selected.length === 0) {
      toast.error("Select at least one lead");
      return;
    }

    if (!selectedCounsellor) {
      toast.error("Select a counsellor");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://servocci-backend-dip7.onrender.com/api/employee/assign-leads",
        {
          studentIds: selected,
          counsellorId: selectedCounsellor,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message || "Assigned successfully");

      setSelected([]);
      setSelectAll(false);
      setSelectedCounsellor("");
      setCurrentPage(1);

      fetchLeads();
    } catch (err) {
      toast.error(err.response?.data?.error || "Assignment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />

      <h2 className="text-3xl font-bold text-[#001b48] mb-6">
        🎯 Assign Leads
      </h2>

      {/* ACTION BAR */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">

        <select
          value={selectedCounsellor}
          onChange={(e) => setSelectedCounsellor(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Select Counsellor</option>
          {counsellors.map((c) => (
            <option key={c._id} value={c.userId?._id}>
              {c.name} ({c.counsellorCode})
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          disabled={loading}
          className="bg-[#ff9d3d] text-white px-6 py-2 rounded hover:bg-[#ff7700] disabled:opacity-50"
        >
          {loading ? "Assigning..." : `Assign (${selected.length})`}
        </button>

        <button
          onClick={() => handleSelectLimit(50)}
          className="bg-gray-200 px-3 py-2 rounded text-sm"
        >
          Select 50
        </button>

        <button
          onClick={() => handleSelectLimit(100)}
          className="bg-gray-200 px-3 py-2 rounded text-sm"
        >
          Select 100
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">

        {fetching ? (
          <div className="p-6 text-center">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No unassigned leads 🎉
          </div>
        ) : (
          <>
            <table className="min-w-full border text-sm">
              <thead className="bg-[#001b48] text-white">
                <tr>
                  <th className="px-4 py-2 border">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Address</th>
                  <th className="px-4 py-2 border">12th School</th>
                  <th className="px-4 py-2 border">Subjects</th>
                </tr>
              </thead>

              <tbody>
                {currentLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(lead._id)}
                        onChange={() => handleSelect(lead._id)}
                      />
                    </td>
                    <td className="px-4 py-2 border">{lead.fullName}</td>
                    <td className="px-4 py-2 border">{lead.phoneMobile}</td>
                    <td className="px-4 py-2 border">{lead.email}</td>
                    <td className="px-4 py-2 border">{lead.permanentAddress}</td>
                    <td className="px-4 py-2 border">{lead.twelfthSchool}</td>
                    <td className="px-4 py-2 border">{lead.subjectsTaken}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-between items-center p-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}

        <div className="p-3 text-right text-sm text-gray-500">
          Total Leads: {leads.length}
        </div>
      </div>
    </div>
  );
};

export default AssignLeads;