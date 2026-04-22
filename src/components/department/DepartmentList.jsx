import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { useDepartmentColumns } from '../../utils/DepartmentHelpers';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const DepartmentList = ({ defaultFilter }) => {
  const location = useLocation();
  const columns = useDepartmentColumns();
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [mbbsDepartments, setMbbsDepartments] = useState([]);
  const [otherDepartments, setOtherDepartments] = useState([]); 
  const [filteredMbbsDepartments, setFilteredMbbsDepartments] = useState([]);
  {/* Combine both MBBS and Other institutions into one list */}
  const allDepartments = [...filteredMbbsDepartments, ...filteredDepartments];
  const [selectedCourseCard, setSelectedCourseCard] = useState(null);
  

    const [filter, setFilter] = useState({
  domestic: false,
  international: false,
  mbbsOnly: false,
  courses: [],
  searchTerm: '',
});


useEffect(() => {
  if (defaultFilter === 'domestic') {
    setFilter((prev) => ({
      ...prev,
      domestic: true,
      international: false,
      mbbsOnly: false,
    }));
  } else if (defaultFilter === 'international') {
    setFilter((prev) => ({
      ...prev,
      international: true,
      domestic: false,
      mbbsOnly: false,
    }));
  } else if (defaultFilter === 'mbbs') {
    setFilter((prev) => ({
      ...prev,
      mbbsOnly: true,
      domestic: false,
      international: false,
    }));
  } else {
    // 🚨 When defaultFilter is undefined → clear all filters
    setFilter({
      domestic: false,
      international: false,
      mbbsOnly: false,
      courses: [],
      searchTerm: '',
    });
  }
}, [defaultFilter]);


  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://servocci-backend-dip7.onrender.com/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

       if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
          id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          state: dep.state,
          place: dep.place,
          course_name: dep.course_name || '',
          logo: dep.logo || '',
          fees: dep.fees || '',
          brochure: dep.brochure || '',
          fee_structure: dep.fee_structure || '', // <--- add this line
        }));


          const uniqueCourses = [
            ...new Set(data.map((d) => d.course_name).filter(Boolean)),
          ];
          const formattedOptions = uniqueCourses.map((course) => ({
            value: course,
            label: course,
          }));

          const mbbsList = data.filter((d) =>
            d.course_name?.toLowerCase() === 'mbbs'
          );
          const otherList = data.filter((d) =>
            d.course_name?.toLowerCase() !== 'mbbs'
          );

          setCourseOptions(formattedOptions);
          setDepartments(data);
          setMbbsDepartments(mbbsList);
          setOtherDepartments(otherList);
        }

      } catch (error) {
        console.error('Failed to fetch departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
  const applyFilters = (list) => {
  return list.filter((dep) => {
    const isDomestic = filter.domestic && dep.state !== 'International';
    const isInternational = filter.international && dep.state === 'International';
    const isMbbs = filter.mbbsOnly && dep.course_name.toLowerCase() === 'mbbs';

    const courseMatch =
      filter.courses.length === 0 ||
      filter.courses.includes(dep.course_name);

    const searchMatch = dep.dep_name
      .toLowerCase()
      .includes(filter.searchTerm.toLowerCase());

    const locationMatch =
      (!filter.domestic && !filter.international) ||
      isDomestic ||
      isInternational;

    const mbbsMatch = !filter.mbbsOnly || isMbbs; // 👈 This line enables conditional MBBS filtering

    return locationMatch && courseMatch && searchMatch && mbbsMatch;
  });
};


  setFilteredDepartments(applyFilters(otherDepartments));
  setFilteredMbbsDepartments(applyFilters(mbbsDepartments)); // new
  localStorage.setItem('departmentFilters', JSON.stringify(filter));
}, [departments, filter, mbbsDepartments, otherDepartments]);


  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilter((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCourseSelect = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setFilter((prev) => ({ ...prev, courses: selectedValues }));
  };

  const handleSearchChange = (e) => {
    setFilter((prev) => ({ ...prev, searchTerm: e.target.value }));
  };

  const clearFilters = () => {
    const defaultFilters = {
      domestic: false,
      international: false,
      courses: [],
      searchTerm: '',
    };
    setFilter(defaultFilters);
    localStorage.setItem('departmentFilters', JSON.stringify(defaultFilters));
  };

  const selectedCourseValues = courseOptions.filter(option =>
    filter.courses.includes(option.value)
  );

  return (
    <div className="p-4 sm:p-6 bg-[#f9f7d9] min-h-screen rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-4xl font-bold text-[#001b48]">Manage Institutions</h3>
      </div>

      <div className="lg:flex lg:flex-wrap lg:justify-between lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:flex-wrap lg:w-full">
          <input
            type="text"
            placeholder="Search by Institute Name"
            className="px-4 py-2 border border-[#2c6975] rounded-md w-full sm:w-64"
            value={filter.searchTerm}
            onChange={handleSearchChange}
          />

          <div className="w-full sm:w-64">
            <Select
              isMulti
              options={courseOptions}
              value={selectedCourseValues}
              onChange={handleCourseSelect}
              classNamePrefix="react-select"
              placeholder="Filter by Courses"
              styles={{
                control: (styles) => ({
                  ...styles,
                  borderColor: '#2c6975',
                  borderRadius: '0.5rem',
                }),
              }}
            />
          </div>

          <div className="block sm:hidden">
            <button
              className="text-sm text-[#001b48] underline font-medium"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {(showMobileFilters || window.innerWidth >= 640) && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto mt-2 sm:mt-0">
              <label className="flex items-center gap-2 text-[#001b48] font-medium">
                <input
                  type="checkbox"
                  name="domestic"
                  checked={filter.domestic}
                  onChange={handleCheckboxChange}
                  className="accent-[#ff4f00]"
                />
                Domestic
              </label>
              <label className="flex items-center gap-2 text-[#001b48] font-medium">
                <input
                  type="checkbox"
                  name="international"
                  checked={filter.international}
                  onChange={handleCheckboxChange}
                  className="accent-[#ff4f00]"
                />
                International
              </label>
              <label className="flex items-center gap-2 text-[#001b48] font-medium">
              <input
                type="checkbox"
                name="mbbsOnly"
                checked={filter.mbbsOnly}
                onChange={handleCheckboxChange}
                className="accent-[#ff4f00]"
              />
              MBBS Course
            </label>

              <button
                onClick={clearFilters}
                className="text-sm text-[#001b48] underline font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

{/* Mobile stacked view grouped by course (<768px) */}
<div className="mt-8 block md:hidden px-4">
  {loading ? (
    <p className="text-center text-gray-600">Loading institutions...</p>
  ) : (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold text-[#001b48] mb-2">Institutions</h3>
      {allDepartments.length > 0 ? (
        Object.entries(
          allDepartments.reduce((acc, dep) => {
            const course = dep.course_name || 'Other';
            if (!acc[course]) acc[course] = [];
            acc[course].push(dep);
            return acc;
          }, {})
        ).map(([courseName, deps]) => (
          <div key={courseName}>
            <h4 className="text-xl font-bold text-[#001b48] mb-3">{courseName}</h4>
            <div className="flex flex-col gap-4">
              {deps.map(dep => (
                <div
                  key={dep.id}
                  className="bg-white shadow-md rounded-xl p-4 flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-3">
                    {dep.logo && (
                      <img
                        src={dep.logo}
                        alt={`${dep.dep_name} logo`}
                        className="w-14 h-14 object-cover rounded-full border border-gray-300 flex-shrink-0"
                      />
                    )}
                    <div>
                      <h4 className="text-lg font-semibold text-[#001b48]">{dep.dep_name}</h4>
                      <p className="text-sm text-gray-700"><strong>State:</strong> {dep.state || 'N/A'}</p>
                      <p className="text-sm text-gray-700"><strong>Place:</strong> {dep.place || 'N/A'}</p>
                      <p className="text-sm text-gray-700"><strong>Fees:</strong> ₹{dep.fees || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {dep.brochure && (
                      <a
                        href={dep.brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white text-sm rounded-md shadow text-center"
                      >
                        Brochure
                      </a>
                    )}
                    <Link
                      to={`/admin-dashboard/departments/department-details/${dep.id}`}
                      className="px-4 py-2 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white text-sm rounded-md shadow text-center"
                    >
                      View
                    </Link>
                    {dep.fee_structure && (
                      <a
                        href={dep.fee_structure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white text-sm rounded-md shadow text-center"
                      >
                        Fee Structure
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No institutions found.</p>
      )}
    </div>
  )}
</div>




{/* Responsive grid for md to lg (768px to <1024px) */}
<div className="mt-8 hidden md:grid lg:hidden px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {loading ? (
    <p className="text-center text-gray-600 col-span-full">Loading institutions...</p>
  ) : (
    allDepartments.length > 0 ? (
      allDepartments.map(dep => (
        <div
          key={dep.id}
          className="bg-white shadow-md rounded-xl p-5 flex flex-col h-full"
        >
          {/* Info Section */}
          <div className="flex items-center gap-4 mb-3">
            {dep.logo && (
              <img
                src={dep.logo}
                alt={`${dep.dep_name} logo`}
                className="w-14 h-14 object-cover rounded-full border border-gray-300 flex-shrink-0"
              />
            )}
            <div className="min-w-0">
              <h4 className="text-lg font-semibold text-[#001b48] truncate">{dep.dep_name}</h4>
              <p className="text-sm text-gray-700 truncate"><strong>State:</strong> {dep.state || 'N/A'}</p>
              <p className="text-sm text-gray-700 truncate"><strong>Place:</strong> {dep.place || 'N/A'}</p>
              <p className="text-sm text-gray-700 truncate"><strong>Course:</strong> {dep.course_name || 'N/A'}</p>
              <p className="text-sm text-gray-700 truncate"><strong>Fees:</strong> ₹{dep.fees || 'N/A'}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {dep.brochure && (
              <a
                href={dep.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[100px] text-center px-4 py-2 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white text-sm rounded-md shadow transition"
              >
                Brochure
              </a>
            )}
            <Link
              to={`/admin-dashboard/departments/department-details/${dep.id}`}
              className="flex-1 min-w-[100px] text-center px-4 py-2 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white text-sm rounded-md shadow transition"
            >
              View
            </Link>
             {dep.fee_structure && (
                <a
                  href={dep.fee_structure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white text-sm rounded-md shadow text-center"
                >
                  Fee Structure
                </a>
              )}
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-600 col-span-full">No institutions found.</p>
    )
  )}
</div>

{/* Desktop grid cards (≥1024px) grouped by course */}
<div className="mt-8 hidden lg:block px-4">
  {loading ? (
    <p className="text-center text-gray-600">Loading institutions...</p>
  ) : (
    <div className="flex flex-col gap-8">
      {allDepartments.length > 0 ? (
        Object.entries(
          allDepartments.reduce((acc, dep) => {
            const course = dep.course_name || 'Other';
            if (!acc[course]) acc[course] = [];
            acc[course].push(dep);
            return acc;
          }, {})
        ).map(([courseName, deps]) => (
          <div key={courseName}>
            <h3 className="text-3xl font-bold text-[#001b48] mb-6">{courseName}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {deps.map(dep => (
                <div
                  key={dep.id}
                  className="bg-[#f9f7d9] rounded-2xl p-6 shadow-lg hover:shadow-2xl flex flex-col items-center text-center text-[#001b48] transition-shadow duration-300"
                >
                  {/* Logo */}
                  {dep.logo ? (
                    <img
                      src={dep.logo}
                      alt={`${dep.dep_name} logo`}
                      className="h-20 md:h-24 object-contain mb-4 rounded-full border-2 border-[#ff4f00]"
                    />
                  ) : (
                    <div className="h-20 md:h-24 w-20 md:w-24 bg-gray-200 mb-4 rounded-full flex items-center justify-center text-gray-400">
                      No Logo
                    </div>
                  )}

                  {/* Department Name */}
                  <h4 className="text-xl md:text-2xl font-semibold">{dep.dep_name}</h4>

                  {/* Location */}
                  <p className="text-md md:text-lg font-bold mt-1">
                    {dep.place || 'N/A'}, {dep.state || 'N/A'}
                  </p>

                  {/* Details */}
                  <div className="mt-3 text-sm md:text-base space-y-1 max-w-[280px]">
                    <p>
                      <strong className="text-[#ff4f00]">Fees:</strong> ₹{dep.fees || 'N/A'}
                    </p>
                    {/* Add other info if needed */}
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-center w-full">
                    {dep.brochure && (
                      <a
                        href={dep.brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white rounded-full shadow-md font-semibold transition w-full sm:w-auto text-center"
                      >
                        Brochure
                      </a>
                    )}
                    <Link
                      to={`/admin-dashboard/departments/department-details/${dep.id}`}
                      className="px-5 py-2 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white rounded-full shadow-md font-semibold transition w-full sm:w-auto text-center"
                    >
                      View
                    </Link>
                    {dep.fee_structure && (
                      <a
                        href={dep.fee_structure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-[#ff4f00] hover:bg-[#ff9d3d] text-white rounded-full shadow-md font-semibold transition w-full sm:w-auto text-center"
                      >
                        Fee Structure
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No institutions found.</p>
      )}
    </div>
  )}
</div>



    </div>
  );
};

export default DepartmentList;
