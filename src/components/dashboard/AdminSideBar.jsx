import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'react-qr-code';

import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaUserTie,
  FaFileAlt,
  FaList,
  FaPlusCircle,
  FaTimes,
  FaHome,
  FaPlane,
  FaUserMd,
  FaChevronDown,
  FaChevronUp,
  FaWpforms,
  FaGlobe
} from "react-icons/fa";

const AdminSideBar = ({ isOpen, toggleSidebar }) => {
  

  const [showStudentSubMenu, setShowStudentSubMenu] = useState(false);
  const [showInstitutionSubMenu, setShowInstitutionSubMenu] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [showQRDoc, setShowQRDoc] = useState(false);
  const [openPre, setOpenPre] = useState(false);
  const [openDoc, setOpenDoc] = useState(false);

  const [counsellorCode, setCounsellorCode] = useState('');
  const [loadingCode, setLoadingCode] = useState(false);
  const [error, setError] = useState(null);

  const [lang, setLang] = useState(localStorage.getItem("adminLang") || "en");

useEffect(() => {
  const handleLangChange = () => {
    setLang(localStorage.getItem("adminLang") || "en");
  };

  window.addEventListener("languageChange", handleLangChange);

  return () => {
    window.removeEventListener("languageChange", handleLangChange);
  };
}, []);

  const t = {
    en: {
      dashboard: "Dashboard",
      students: "Students",
      apply: "Apply",
      applicationList: "Application List",
      institutions: "Institutions",
      allInstitutions: "All Institutions",
      domestic: "Domestic Institutions",
      international: "International Institutions",
      addInstitution: "Add New Institution",
      mbbs: "MBBS Institutions",
      consultants: "Consultants",
      preAdmission: "Pre-Admission Form",
      documentUpload: "Document Upload",
      copyLink: "Copy Link",
      showQR: "Show QR",
      hideQR: "Hide QR",
      latestUpdates: "Latest Updates",
      mainWebsite: "Main Website"
    },

    hi: {
      dashboard: "डैशबोर्ड",
      students: "छात्र",
      apply: "आवेदन करें",
      applicationList: "आवेदन सूची",
      institutions: "संस्थान",
      allInstitutions: "सभी संस्थान",
      domestic: "घरेलू संस्थान",
      international: "अंतरराष्ट्रीय संस्थान",
      addInstitution: "नया संस्थान जोड़ें",
      mbbs: "एमबीबीएस संस्थान",
      consultants: "सलाहकार",
      preAdmission: "प्री-एडमिशन फॉर्म",
      documentUpload: "दस्तावेज़ अपलोड",
      copyLink: "लिंक कॉपी करें",
      showQR: "QR दिखाएँ",
      hideQR: "QR छुपाएँ",
      latestUpdates: "नवीनतम अपडेट",
      mainWebsite: "मुख्य वेबसाइट"
    }
  };

  useEffect(() => {
    const updateLang = () => {
      setLang(localStorage.getItem("cmsLang") || "en");
    };

    window.addEventListener("storage", updateLang);
    updateLang();

    return () => window.removeEventListener("storage", updateLang);
  }, []);

  useEffect(() => {

    const storedUser =
      sessionStorage.getItem('user') || localStorage.getItem('user');

    if (storedUser) {
      try {

        const parsedUser = JSON.parse(storedUser);
        setUserRole(parsedUser.role);

        const role = parsedUser.role?.toLowerCase() || '';

        if (role === 'admin') {

          setCounsellorCode('Admin');
          setLoadingCode(false);
          setError(null);

        } else if ((role === 'councelor' || role === 'counselor') && parsedUser._id) {

          const fetchCounsellorCode = async () => {

            setLoadingCode(true);
            setError(null);

            try {

              const res = await axios.get(
                `https://servocci-backend-dip7.onrender.com/api/councellor/byUserId/${parsedUser._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                }
              );

              if (res.data.success && res.data.data) {
                setCounsellorCode(res.data.data.counsellorCode);
              } else {
                setError('Counsellor code not found.');
                setCounsellorCode('');
              }

            } catch (err) {

              setError('Failed to fetch counsellor code.');
              setCounsellorCode('');
              console.error(err);

            } finally {
              setLoadingCode(false);
            }

          };

          fetchCounsellorCode();
        }

      } catch (err) {
        console.error('Error parsing user:', err);
      }
    }

  }, []);

  const baseURL = "https://servocci.in";

const preAdmissionURL = counsellorCode
  ? `${baseURL}/pre-admission?code=${counsellorCode}`
  : "";

const documentUploadURL = counsellorCode
  ? `${baseURL}/document-upload?code=${counsellorCode}`
  : "";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`z-50 w-64 bg-[var(--primary-dark)] text-white overflow-y-auto
        fixed top-0 left-0 bottom-0 transform transition-transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:block`}
      >

        <div className="h-12 flex items-center justify-center bg-[var(--cool-teal)] relative">
          <h3 className="text-2xl font-serif text-center">CMS</h3>

          <button
            onClick={toggleSidebar}
            className="absolute right-3 top-3 md:hidden text-white"
          >
            <FaTimes />
          </button>
        </div>

        <div className="px-4 py-2 space-y-2">

          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `${isActive ? "bg-[var(--accent-light-orange)] text-black" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
            }
            end
            onClick={toggleSidebar}
          >
            <FaTachometerAlt />
            <span>{t[lang].dashboard}</span>
          </NavLink>

          {/* Students */}
          <div>

            <button
              onClick={() => setShowStudentSubMenu(!showStudentSubMenu)}
              className="flex items-center justify-between w-full py-2.5 px-4 rounded hover:bg-[var(--accent-light-orange)]"
            >
              <div className="flex items-center space-x-4">
                <FaUsers />
                <span>{t[lang].students}</span>
              </div>

              {showStudentSubMenu ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {showStudentSubMenu && (

              <div className="ml-8 mt-1 space-y-1 text-sm">

                <NavLink
                  to="/admin-dashboard/employee/add-application"
                  className="flex items-center space-x-2 py-1"
                  onClick={toggleSidebar}
                >
                  <FaFileAlt />
                  <span>{t[lang].apply}</span>
                </NavLink>

                <NavLink
                  to="/admin-dashboard/employees"
                  className="flex items-center space-x-2 py-1"
                  onClick={toggleSidebar}
                >
                  <FaList />
                  <span>{t[lang].applicationList}</span>
                </NavLink>

              </div>

            )}

          </div>

          {/* Institutions */}

          <div>

            <button
              onClick={() => setShowInstitutionSubMenu(!showInstitutionSubMenu)}
              className="flex items-center justify-between w-full py-2.5 px-4 rounded hover:bg-[var(--accent-light-orange)]"
            >
              <div className="flex items-center space-x-4">
                <FaBuilding />
                <span>{t[lang].institutions}</span>
              </div>

              {showInstitutionSubMenu ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {showInstitutionSubMenu && (

              <div className="ml-8 mt-1 space-y-1 text-sm">

                <NavLink to="/admin-dashboard/departments" className="flex items-center space-x-2 py-1">
                  <FaList />
                  <span>{t[lang].allInstitutions}</span>
                </NavLink>

                <NavLink to="/admin-dashboard/departments/domestic" className="flex items-center space-x-2 py-1">
                  <FaHome />
                  <span>{t[lang].domestic}</span>
                </NavLink>

                <NavLink to="/admin-dashboard/departments/international" className="flex items-center space-x-2 py-1">
                  <FaPlane />
                  <span>{t[lang].international}</span>
                </NavLink>

                {userRole === "admin" && (
                  <NavLink to="/admin-dashboard/departments/add" className="flex items-center space-x-2 py-1">
                    <FaPlusCircle />
                    <span>{t[lang].addInstitution}</span>
                  </NavLink>
                )}

              </div>

            )}

          </div>


          {(userRole === 'admin' || userRole === 'manager') && (
  <>
    {/* Consultants → ONLY ADMIN */}
{userRole === "admin" && (
  <NavLink
    to="/admin-dashboard/councellor"
    className="flex items-center space-x-4 py-2.5 px-4 rounded"
  >
    <FaUserTie />
    <span>{t[lang].consultants}</span>
  </NavLink>
)}

    {/* 🔥 Assign Leads */}
    <NavLink
      to="/admin-dashboard/assign-leads"
      className="flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[var(--accent-light-orange)]"
    >
      <FaUsers />
      <span>Assign Leads</span>
    </NavLink>

    {/* 🔥 Bulk Upload */}
    <NavLink
      to="/admin-dashboard/bulk-upload"
      className="flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[var(--accent-light-orange)]"
    >
      <FaPlusCircle />
      <span>Add Bulk Students</span>
    </NavLink>
  </>
)}

          {/* ================= PRE ADMISSION ================= */}

<div>
  <div
    onClick={() => setOpenPre(!openPre)}
    className="flex items-center justify-between cursor-pointer py-2.5 px-4 rounded hover:bg-[var(--accent-light-orange)]"
  >
    <div className="flex items-center space-x-4">
      <FaWpforms />
      <span>{t[lang].preAdmission}</span>
    </div>

    <span>{openPre ? "▲" : "▼"}</span>
  </div>

  {openPre && (
    <div className="px-6 space-y-2 mt-2">

      {/* Go to Page */}
      <NavLink
        to={counsellorCode ? preAdmissionURL : "#"}
        onClick={toggleSidebar}
        className="block text-sm text-blue-600 hover:underline"
      >
        Open Form
      </NavLink>

      {/* Copy Link */}
      <button
        disabled={!counsellorCode}
        onClick={() => {
          navigator.clipboard.writeText(preAdmissionURL);
          alert("Link copied successfully!");
        }}
        className={`px-3 py-1 rounded w-full text-sm ${
          counsellorCode
            ? "bg-blue-600 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        {t[lang].copyLink}
      </button>

      {/* QR Toggle */}
      <button
        disabled={!counsellorCode}
        onClick={() => setShowQR(!showQR)}
        className={`px-3 py-1 rounded text-sm w-full ${
          counsellorCode
            ? "bg-green-600 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        {showQR ? t[lang].hideQR : t[lang].showQR}
      </button>

      {/* QR */}
      {showQR && counsellorCode && (
        <div className="flex justify-center bg-white p-2 rounded">
          <QRCode value={preAdmissionURL} size={120} />
        </div>
      )}

    </div>
  )}
</div>

          {/* ================= DOCUMENT UPLOAD ================= */}

<div>
  <div
    onClick={() => setOpenDoc(!openDoc)}
    className="flex items-center justify-between cursor-pointer py-2.5 px-4 rounded hover:bg-[var(--accent-light-orange)]"
  >
    <div className="flex items-center space-x-4">
      <FaWpforms />
      <span>{t[lang].documentUpload}</span>
    </div>

    <span>{openDoc ? "▲" : "▼"}</span>
  </div>

  {openDoc && (
    <div className="px-6 space-y-2 mt-2">

      {/* Go to Page */}
      <NavLink
        to={counsellorCode ? documentUploadURL : "#"}
        onClick={toggleSidebar}
        className="block text-sm text-blue-600 hover:underline"
      >
        Open Form
      </NavLink>

      {/* Copy Link */}
      <button
        disabled={!counsellorCode}
        onClick={() => {
          navigator.clipboard.writeText(documentUploadURL);
          alert("Document upload link copied!");
        }}
        className={`px-3 py-1 rounded w-full text-sm ${
          counsellorCode
            ? "bg-blue-600 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        {t[lang].copyLink}
      </button>

      {/* QR Toggle */}
      <button
        disabled={!counsellorCode}
        onClick={() => setShowQRDoc(!showQRDoc)}
        className={`px-3 py-1 rounded text-sm w-full ${
          counsellorCode
            ? "bg-green-600 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        {showQRDoc ? t[lang].hideQR : t[lang].showQR}
      </button>

      {/* QR */}
      {showQRDoc && counsellorCode && (
        <div className="flex justify-center bg-white p-2 rounded">
          <QRCode value={documentUploadURL} size={120} />
        </div>
      )}

    </div>
  )}
</div>

          {/* Updates */}

          <NavLink
            to="/admin-dashboard/updates"
            className="flex items-center justify-between py-2.5 px-4 rounded mt-4"
          >
            <div className="flex items-center space-x-4">
              <FaFileAlt />
              <span>{t[lang].latestUpdates}</span>
            </div>

            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
              NEW
            </span>

          </NavLink>

          {/* Main Website */}

          <a
            href="https://www.servocci.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 py-2.5 px-4 rounded mt-4"
          >
            <FaGlobe />
            <span>{t[lang].mainWebsite}</span>
          </a>

        </div>
      </div>
    </>
  );
};

export default AdminSideBar;