import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CouncelorSideBar from '../components/dashboard/CouncelorSideBar';
import NavBar from '../components/dashboard/NavBar';
import { useAuth } from '../context/AuthContext';

const EmployeeDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="p-4 text-gray-600">Checking authentication...</div>;
  }

  return (
    <div className="flex">
      <CouncelorSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <NavBar toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
