import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSideBar from '../components/dashboard/AdminSideBar';
import AdminSidebarV2 from '../components/dashboard/AdminSideBarV2';

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
  <div className="flex min-h-screen bg-[#F6F7FB]">

    <AdminSidebarV2
      isOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
    />

    <main className="flex-1 flex flex-col overflow-hidden">

      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

    </main>

  </div>
);
};

export default AdminDashboard;
