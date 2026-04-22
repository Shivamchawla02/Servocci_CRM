import { useNavigate } from 'react-router-dom';

export const useCouncellorColumns = () => {
  const navigate = useNavigate();

  return [
    {
      name: 'S No',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Email',
      selector: (row) => row.userId?.email || 'N/A',
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
    },
    {
      name: 'Username',
      selector: (row) => row.username,
    },
    {
      name: 'Aadhaar',
      selector: (row) => row.aadhaar,
    },
    {
      name: 'PAN',
      selector: (row) => row.pan,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
    },
    
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => navigate(`/admin-dashboard/councellor/${row._id}`)}
          >
            View
          </button>
        </div>
      ),
    },
  ];
};
