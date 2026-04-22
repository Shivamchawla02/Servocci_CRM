import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSideBar from '../components/dashboard/AdminSideBar';
import NavBar from '../components/dashboard/NavBar';

const AdminDashboard = () => {
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
      <AdminSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <NavBar toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
