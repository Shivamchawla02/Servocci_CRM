// src/utils/DepartmentHelpers.jsx
import { useNavigate } from 'react-router-dom';

export const useDepartmentColumns = () => {
  const navigate = useNavigate();

  return [
    {
      name: 'S No',
      selector: (row) => row.sno,
    },
    {
      name: 'Institution Name',
      selector: (row) => row.dep_name,
    },
    {
      name: 'State',
      selector: (row) => row.state || 'Not Available',
    },
    {
      name: 'Place', // ✅ New column
      selector: (row) => row.place || 'Not Available',
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="px-4 py-1 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white text-sm rounded-md shadow transition"
            onClick={() => navigate(`/admin-dashboard/departments/department-details/${row.id}`)}
          >
            View
          </button>
          
        </div>
      ),
    },
  ];
};
