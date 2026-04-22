import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const CouncellorList = () => {
  const [councellors, setCouncellors] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Phone', selector: row => row.phone },
    { name: 'Email', selector: row => row.email },
    { name: 'Role', selector: row => row.role },
    { name: 'Counsellor Code', selector: row => row.counsellorCode },
    {
      name: 'Action',
      cell: row => (
        <button
          onClick={() => navigate(`/admin-dashboard/councellor/view/${row._id}`)}
          className="bg-[#ff4f00] hover:bg-[#ff9d3d] text-white px-3 py-1 rounded text-sm"
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    const fetchCouncellors = async () => {
      try {
        const res = await axios.get("https://servocci-backend-dip7.onrender.com/api/councellor/list", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          setCouncellors(res.data.data);
          setFilteredData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching counsellors:", err);
      }
    };

    fetchCouncellors();
  }, []);

  useEffect(() => {
    const filtered = councellors.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, councellors]);

  return (
    <div className="p-4 sm:p-6 bg-white shadow rounded-md">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-[#001b48]">Manage Councellors</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by Councellor Name"
          className="px-4 py-2 border border-[#2c6975] rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#ff4f00]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          to="/admin-dashboard/councellor/add"
          className="px-6 py-2 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white font-semibold rounded transition"
        >
          + Add New Councellor
        </Link>
      </div>

      {/* Mobile Cards */}
<div className="grid grid-cols-1 lg:hidden gap-4">
  {filteredData.map((item) => (
    <div key={item._id} className="p-4 border rounded-lg shadow bg-[var(--pale-beige)]">
      <p><strong>Name:</strong> {item.name}</p>
      <p><strong>Phone:</strong> {item.phone}</p>
      <p><strong>Email:</strong> {item.email}</p>
      <p><strong>Role:</strong> {item.role}</p>
      <p><strong>Role:</strong> {item.counsellorCode}</p>
      <button
        onClick={() => navigate(`/admin-dashboard/councellor/view/${item._id}`)}
        className="mt-3 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white px-3 py-1 rounded text-sm"
      >
        View
      </button>
    </div>
  ))}
</div>

{/* Desktop Table */}
<div className="hidden lg:block">
  <DataTable
    columns={columns}
    data={filteredData}
    pagination
    highlightOnHover
    responsive
    customStyles={{
      headCells: {
        style: {
          backgroundColor: '#001b48',
          color: '#ffffff',
          fontWeight: 'bold',
        },
      },
      rows: {
        style: {
          '&:hover': {
            backgroundColor: '#f9f7d9',
          },
        },
      },
    }}
  />
</div>

    </div>
  );
};

export default CouncellorList;
