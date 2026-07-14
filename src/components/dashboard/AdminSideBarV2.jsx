import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
LayoutDashboard,
Users,
GraduationCap,
Building2,
UserCog,
Upload,
FileText,
Bell,
Settings,
ChevronDown,
ChevronRight,
LogOut,
Globe,
UserCircle2,
Briefcase,
ClipboardList,
Menu,
X
} from "lucide-react";

const AdminSidebarV2 = ({ isOpen, toggleSidebar }) => {
const navigate = useNavigate();

const [user, setUser] = useState(null);

const [openMenus, setOpenMenus] = useState({
students: true,
institutions: true,
});

useEffect(() => {
const storedUser =
sessionStorage.getItem("user") ||
localStorage.getItem("user");


if (storedUser) {
  try {
    setUser(JSON.parse(storedUser));
  } catch (err) {
    console.error(err);
  }
}


}, []);

const toggleMenu = (menu) => {
setOpenMenus((prev) => ({
...prev,
[menu]: !prev[menu],
}));
};

const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");


sessionStorage.removeItem("user");
sessionStorage.removeItem("usageLogId");
sessionStorage.removeItem("sessionStart");

navigate("/login");


};

const mainMenu = [
{
label: "Dashboard",
icon: <LayoutDashboard size={17} />,
path: "/admin-dashboard",
},


{
  label: "Assign Leads",
  icon: <ClipboardList size={17} />,
  path: "/admin-dashboard/assign-leads",
},

{
  label: "Applications",
  icon: <FileText size={17} />,
  path: "/admin-dashboard/employees",
},

{
  label: "Bulk Upload",
  icon: <Upload size={17} />,
  path: "/admin-dashboard/bulk-upload",
},

{
  label: "Updates",
  icon: <Bell size={17} />,
  path: "/admin-dashboard/updates",
},


];

const institutionMenu = [
{
label: "All Institutions",
path: "/admin-dashboard/departments",
},


{
  label: "Domestic",
  path: "/admin-dashboard/departments/domestic",
},

{
  label: "International",
  path: "/admin-dashboard/departments/international",
},

{
  label: "Add Institution",
  path: "/admin-dashboard/departments/add",
},


];

const studentMenu = [
{
label: "Applications",
path: "/admin-dashboard/employees",
},


{
  label: "Add Application",
  path: "/admin-dashboard/employee/add-application",
},

{
  label: "Counsellors",
  path: "/admin-dashboard/councellor",
},


];

const linkStyle = ({ isActive }) =>
`
flex
items-center
gap-3
px-4
py-2.5
rounded-xl
transition-all
duration-200x1


  ${
    isActive
      ? "bg-[#1B1610] border border-[#5A4522] text-white shadow-[0_0_0_1px_rgba(212,166,74,0.08)]"
      : "text-gray-400 hover:bg-white/5 hover:text-white"
  }
`;

return (
<>
{/* Mobile Overlay */}
{isOpen && ( <div
       className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
       onClick={toggleSidebar}
     />
)}

  {/* Sidebar */}
  <aside
    className={`
    fixed lg:sticky
    top-0 left-0
    z-50
    h-[100dvh]
    w-[240px]

    bg-[#050505]
    border-r
    border-white/10

    flex
    flex-col

    transform
    transition-transform
    duration-300

    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
  >
    {/* Logo */}
    <div className="h-[78px] border-b border-white/10 flex items-center justify-between px-5">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-white">
          Serv<span className="text-[#D4A64A]">occi</span>
        </h1>

        <p className="text-[12px] text-gray-500 mt-1">
          CRM Platform
        </p>
      </div>

      <button
        onClick={toggleSidebar}
        className="lg:hidden text-white"
      >
        <X size={22} />
      </button>
    </div>

    {/* Scroll Area */}
    <div className="flex-1 overflow-y-auto px-3 py-4">

      {/* MAIN SECTION */}
      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-widest text-gray-500 px-4 mb-2">
          Overview
        </p>

        <div className="space-y-2">
          {mainMenu.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/admin-dashboard"}
              className={linkStyle}
              onClick={toggleSidebar}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* STUDENTS */}
      <div className="mb-6">

        <button
          onClick={() => toggleMenu("students")}
          className="
            w-full
            flex
            items-center
            justify-between
            px-4
            py-2.5
            rounded-xl
            text-gray-300
            hover:bg-white/5
          "
        >
          <div className="flex items-center gap-3">
            <Users size={17} />
            <span>Students</span>
          </div>

          {openMenus.students ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>

        {openMenus.students && (
          <div className="ml-10 mt-2 space-y-2">

            {studentMenu.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `
                  block
                  px-3
                  py-2
                  rounded-lg
                  text-xs

                  ${
                    isActive
                      ? "bg-[#D4A64A]/15 text-[#D4A64A]"
                      : "text-gray-400 hover:text-white"
                  }
                `
                }
              >
                {item.label}
              </NavLink>
            ))}

          </div>
        )}
      </div>

      {/* INSTITUTIONS */}
      <div className="mb-6">

        <button
          onClick={() => toggleMenu("institutions")}
          className="
            w-full
            flex
            items-center
            justify-between
            px-4
            py-2.5
            rounded-xl
            text-gray-300
            hover:bg-white/5
          "
        >
          <div className="flex items-center gap-3">
            <Building2 size={17} />
            <span>Institutions</span>
          </div>

          {openMenus.institutions ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>

        {openMenus.institutions && (
          <div className="ml-10 mt-2 space-y-2">

            {institutionMenu.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `
                  block
                  px-3
                  py-2
                  rounded-lg
                  text-xs

                  ${
                    isActive
                      ? "bg-[#D4A64A]/15 text-[#D4A64A]"
                      : "text-gray-400 hover:text-white"
                  }
                `
                }
              >
                {item.label}
              </NavLink>
            ))}

          </div>
        )}
      </div>

      {/* MANAGEMENT */}
      <div>

        <p className="text-[11px] uppercase tracking-widest text-gray-500 px-4 mb-2">
          Management
        </p>

        <div className="space-y-2">

          <NavLink
            to="/admin-dashboard/councellor"
            className={linkStyle}
          >
            <UserCog size={17} />
            <span>Counsellors</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/my-profile"
            className={linkStyle}
          >
            <UserCircle2 size={17} />
            <span>My Profile</span>
          </NavLink>

          <a
            href="https://servocci.in"
            target="_blank"
            rel="noreferrer"
            className="
            flex
            items-center
            gap-3
            px-4
            py-2.5
            rounded-xl
            text-gray-400
            hover:bg-white/5
            hover:text-white
          "
          >
            <Globe size={17} />
            <span>Main Website</span>
          </a>

        </div>
      </div>

    </div>

    {/* Bottom User Card */}
<div className="border-t border-white/10 p-3">

  <div className="bg-[#121212] border border-white/10 rounded-2xl px-3 py-3">

    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A64A] to-[#B8860B] flex items-center justify-center text-black font-bold text-sm">
        {user?.name?.charAt(0)?.toUpperCase() || "A"}
      </div>

      <div className="flex-1 min-w-0">

        <h3 className="text-white text-sm font-semibold truncate">
          {user?.name || "Administrator"}
        </h3>

        <p className="text-[11px] text-gray-500 truncate">
          {user?.role === "admin"
            ? "Super Admin"
            : user?.role || "Administrator"}
        </p>

      </div>

      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />

    </div>

    <button
      onClick={handleLogout}
      className="
        mt-3
        w-full
        flex
        items-center
        justify-center
        gap-2
        py-2
        rounded-xl
        bg-[#D4A64A]
        hover:bg-[#C5962F]
        text-black
        text-sm
        font-semibold
        transition-all
      "
    >
      <LogOut size={16} />
      Logout
    </button>

  </div>

  <div className="mt-2 text-center">

    <p className="text-[10px] text-gray-600">
      Servocci CRM
    </p>

  </div>

</div>

  </aside>

</>

);
};

export default AdminSidebarV2;
