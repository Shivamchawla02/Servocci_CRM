import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import RoleBaseRoutes from "./utils/RoleBaseRoutes.jsx";

import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import DepartmentList from "./components/department/DepartmentList.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import DepartmentDetails from "./components/department/DepartmentDetails.jsx";
import List from "./components/employee/List.jsx";
import Add from "./components/employee/Add.jsx";
import CouncellorList from "./components/councellor/CouncellorList.jsx";
import CouncellorAdd from "./components/councellor/CouncellorAdd.jsx";
import UploadDocuments from "./components/employee/UploadDocuments.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import View from "./components/employee/View.jsx";
import EmployeeSummary from "./components/dashboard/EmployeeSummary.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import CouncellorView from "./components/councellor/CouncellorView.jsx";
import PreadmissionStudentView from "./components/employee/PreadmissionStudentView.jsx";
import Updates from "./pages/Updates.jsx";
import EditEmployee from "./components/employee/EditEmployee.jsx";
import PreAdmission from "./pages/PreAdmission.jsx";
import DocumentUploadPublic from "./pages/DocumentUploadPublic.jsx";
import BulkUpload from "./pages/BulkUpload.jsx";
import AssignLeads from "./pages/AssignLeads.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const userRole = user?.role || null;

  const [sessionStart] = useState(() => {
    const saved = sessionStorage.getItem("sessionStart");
    if (saved) {
      return parseInt(saved);
    } else {
      const now = Date.now();
      sessionStorage.setItem("sessionStart", now.toString());
      return now;
    }
  });

  // Track counsellor session time
  useEffect(() => {
    if (userRole !== "councelor") return;

    const interval = setInterval(() => {
      const start = parseInt(sessionStorage.getItem("sessionStart"));
      if (start) {
        const elapsed = Date.now() - start;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userRole]);

  // End session on unload
  useEffect(() => {
    if (user?.role !== "councelor") return;

    const handleUnload = () => {
      const usageLogId = sessionStorage.getItem("usageLogId");
      if (!usageLogId) return;

      const payload = JSON.stringify({ usageLogId });
      navigator.sendBeacon(
        "https://servocci-backend-dip7.onrender.com/api/usage-log/end",
        new Blob([payload], { type: "application/json" })
      );

      sessionStorage.removeItem("usageLogId");
      sessionStorage.removeItem("sessionStart");
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>

        {/* Root Redirect */}
        {/* <Route
          path="/"
          element={
            <Navigate
              to={
                userRole === "admin"
                  ? "/admin-dashboard"
                  : userRole === "councelor"
                  ? "/employee-dashboard"
                  : "/login"
              }
            />
          }
        /> */}

        <Route path="/" element={<LoginPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ✅ Public Pre Admission Form */}
        <Route path="/pre-admission" element={<PreAdmission />} />

        <Route path="/document-upload" element={<DocumentUploadPublic />} />

        {/* ✅ Protected Preadmission Student View */}
        <Route
          path="/preadmissions/:id"
          element={
            <PrivateRoutes>
              <PreadmissionStudentView />
            </PrivateRoutes>
          }
        />

        {/* ================= EMPLOYEE DASHBOARD ================= */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["councelor"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<EmployeeSummary />} />
          <Route path="user-profile" element={<UserProfilePage />} />
        </Route>

        {/* ================= ADMIN DASHBOARD ================= */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />

          <Route path="departments" element={<DepartmentList />} />
          <Route path="departments/domestic" element={<DepartmentList defaultFilter="domestic" />} />
          <Route path="departments/international" element={<DepartmentList defaultFilter="international" />} />
          <Route path="departments/mbbs" element={<DepartmentList defaultFilter="mbbs" />} />
          <Route path="departments/add" element={<AddDepartment />} />
          <Route path="departments/department-details/:id" element={<DepartmentDetails />} />

          <Route path="employees" element={<List />} />
          <Route path="employee/add-application" element={<Add />} />
          <Route path="employee/:id/upload-documents" element={<UploadDocuments />} />
          <Route path="employee/:id/view" element={<View />} />
          <Route path="employee/:id/edit" element={<EditEmployee />} />

          <Route path="preadmission/:id/view" element={<PreadmissionStudentView />} />

          <Route path="councellor" element={<CouncellorList />} />
          <Route path="councellor/add" element={<CouncellorAdd />} />
          <Route path="councellor/view/:id" element={<CouncellorView />} />

           <Route path="bulk-upload" element={<BulkUpload />} />
           <Route path="assign-leads" element={<AssignLeads />} />

          <Route path="my-profile" element={<ProfilePage />} />
          <Route path="updates" element={<Updates />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;