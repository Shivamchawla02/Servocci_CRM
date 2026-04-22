import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaUsers, FaBuilding, FaFileAlt,
  FaList, FaChevronDown, FaChevronUp, FaTimes,
  FaWpforms,
  FaUserMd,
  FaPlane,
  FaHome
} from "react-icons/fa";
import QRCode from 'react-qr-code';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const CouncelorSideBar = ({ isOpen, toggleSidebar }) => {

  const { user: authUser } = useAuth();

  const [user, setUser] = useState(authUser || null);

  const [showStudentSubMenu, setShowStudentSubMenu] = useState(false);
  const [showInstitutionSubMenu, setShowInstitutionSubMenu] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showQRDoc, setShowQRDoc] = useState(false);
  const [counsellorCode, setCounsellorCode] = useState('');
  const [loadingCode, setLoadingCode] = useState(false);
  const [error, setError] = useState(null);
  const [showPreAdmissionMenu, setShowPreAdmissionMenu] = useState(false);
  const [showDocumentMenu, setShowDocumentMenu] = useState(false);

  const [lang, setLang] = useState(localStorage.getItem("adminLang") || "en");

  const translations = {
    en: {
      dashboard: "Dashboard",
      students: "Students",
      apply: "Apply",
      applicationList: "Application List",
      institutions: "Institutions",
      allInstitutions: "All Institutions",
      domestic: "Domestic Institutions",
      international: "International Institutions",
      mbbs: "MBBS Institutions",
      preAdmission: "Pre-Admission Form",
      documentUpload: "Document Upload",
      copyLink: "Copy Link",
      showQR: "Show QR",
      hideQR: "Hide QR",
      updates: "Latest Updates",
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
      mbbs: "एमबीबीएस संस्थान",
      preAdmission: "प्री-एडमिशन फॉर्म",
      documentUpload: "दस्तावेज़ अपलोड",
      copyLink: "लिंक कॉपी करें",
      showQR: "QR दिखाएँ",
      hideQR: "QR छिपाएँ",
      updates: "नवीनतम अपडेट",
      mainWebsite: "मुख्य वेबसाइट"
    }
  };

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem("adminLang") || "en");
    };

    window.addEventListener("languageChange", handleLangChange);

    return () => {
      window.removeEventListener("languageChange", handleLangChange);
    };
  }, []);

  useEffect(() => {
    if (!authUser) {
      try {
        const storedUser = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);
      } catch (err) {
        console.warn('Failed to parse user from storage:', err);
      }
    } else {
      setUser(authUser);
    }
  }, [authUser]);

  useEffect(() => {
    const role = user?.role?.toLowerCase() || '';
    if ((role === "councelor" || role === "counselor") && user._id) {

      const fetchCounsellorCode = async () => {
        setLoadingCode(true);
        setError(null);

        try {

          const res = await axios.get(
            `https://servocci-backend-dip7.onrender.com/api/councellor/byUserId/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (res.data.success && res.data.data) {
            setCounsellorCode(res.data.data.counsellorCode);
          } else {
            setError('Counsellor code not found.');
          }

        } catch (err) {
          setError('Failed to fetch counsellor code.');
          console.error(err);
        } finally {
          setLoadingCode(false);
        }
      };

      fetchCounsellorCode();

    } else {
      setCounsellorCode('');
    }
  }, [user]);

  const baseURL = "https://servocci.in";

const preAdmissionURL = counsellorCode
  ? `${baseURL}/pre-admission?code=${counsellorCode}`
  : "";

const documentUploadURL = counsellorCode
  ? `${baseURL}/document-upload?code=${counsellorCode}`
  : "";

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className={`z-50 w-64 bg-[var(--primary-dark)] text-white overflow-y-auto
        fixed top-0 left-0 bottom-0 transform transition-transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:block`}>

        <div className="h-12 flex items-center justify-center bg-[var(--cool-teal)] relative">
          <h3 className="text-2xl text-center font-serif">CMS</h3>

          <button
            onClick={toggleSidebar}
            className="absolute right-3 top-3 md:hidden text-white"
          >
            <FaTimes />
          </button>
        </div>

        <div className="px-4 py-2 space-y-2">

          {/* Dashboard */}
          <NavLink
            to="/employee-dashboard"
            className={({ isActive }) =>
              `${isActive ? "bg-[var(--accent-light-orange)] text-black" : ""}
               flex items-center space-x-4 py-2.5 px-4 rounded`
            }
            end
            onClick={toggleSidebar}
          >
            <FaTachometerAlt />
            <span>{translations[lang].dashboard}</span>
          </NavLink>

          {/* Students */}
          <div>

            <button
              onClick={() => setShowStudentSubMenu(!showStudentSubMenu)}
              className="flex items-center justify-between w-full py-2.5 px-4 rounded hover:bg-[var(--accent-light-orange)]"
            >
              <div className="flex items-center space-x-4">
                <FaUsers />
                <span>{translations[lang].students}</span>
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
                  <span>{translations[lang].apply}</span>
                </NavLink>

                <NavLink
                  to="/admin-dashboard/employees"
                  className="flex items-center space-x-2 py-1"
                  onClick={toggleSidebar}
                >
                  <FaList />
                  <span>{translations[lang].applicationList}</span>
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
                <span>{translations[lang].institutions}</span>
              </div>

              {showInstitutionSubMenu ? <FaChevronUp /> : <FaChevronDown />}

            </button>

            {showInstitutionSubMenu && (
              <div className="ml-8 mt-1 space-y-1 text-sm">

                <NavLink to="/admin-dashboard/departments" className="flex items-center space-x-2 py-1">
                  <FaList />
                  <span>{translations[lang].allInstitutions}</span>
                </NavLink>

                <NavLink to="/admin-dashboard/departments/domestic" className="flex items-center space-x-2 py-1">
                  <FaHome />
                  <span>{translations[lang].domestic}</span>
                </NavLink>

                <NavLink to="/admin-dashboard/departments/international" className="flex items-center space-x-2 py-1">
                  <FaPlane />
                  <span>{translations[lang].international}</span>
                </NavLink>

                <NavLink to="/admin-dashboard/departments/mbbs" className="flex items-center space-x-2 py-1">
                  <FaUserMd />
                  <span>{translations[lang].mbbs}</span>
                </NavLink>

              </div>
            )}
          </div>

          {/* 🔥 PRE ADMISSION DROPDOWN */}
<div>

  <button
    onClick={() => setShowPreAdmissionMenu(!showPreAdmissionMenu)}
    className="flex items-center justify-between w-full py-2.5 px-4 rounded hover:bg-[var(--accent-light-orange)]"
  >
    <div className="flex items-center space-x-4">
      <FaWpforms />
      <span>{translations[lang].preAdmission}</span>
    </div>

    {showPreAdmissionMenu ? <FaChevronUp /> : <FaChevronDown />}
  </button>

  {showPreAdmissionMenu && (
    <div className="ml-8 mt-2 space-y-2">

      {/* Open Form */}
      <a
        href={preAdmissionURL}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-sm text-blue-300 hover:underline"
      >
        Open Form
      </a>

      {/* Copy Link */}
      <button
        disabled={!counsellorCode}
        onClick={() => {
          navigator.clipboard.writeText(preAdmissionURL);
          toast.success("Link copied!");
        }}
        className={`px-3 py-1 rounded w-full text-sm ${
          counsellorCode
            ? "bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {translations[lang].copyLink}
      </button>

      {/* Show QR */}
      <button
        disabled={!counsellorCode}
        onClick={() => setShowQR(!showQR)}
        className={`px-3 py-1 rounded w-full text-sm ${
          counsellorCode
            ? "bg-green-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {showQR
          ? translations[lang].hideQR
          : translations[lang].showQR}
      </button>

      {/* QR */}
      {showQR && counsellorCode && (
        <div className="flex justify-center mt-2 bg-white p-2 rounded">
          <QRCode value={preAdmissionURL} size={120} />
        </div>
      )}

    </div>
  )}

</div>

        {/* 🔥 DOCUMENT UPLOAD DROPDOWN */}
<div>

  <button
    onClick={() => setShowDocumentMenu(!showDocumentMenu)}
    className="flex items-center justify-between w-full py-2.5 px-4 rounded hover:bg-[var(--accent-light-orange)]"
  >
    <div className="flex items-center space-x-4">
      <FaWpforms />
      <span>{translations[lang].documentUpload}</span>
    </div>

    {showDocumentMenu ? <FaChevronUp /> : <FaChevronDown />}
  </button>

  {showDocumentMenu && (
    <div className="ml-8 mt-2 space-y-2">

      {/* Open Form */}
      <a
        href={documentUploadURL}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-sm text-blue-300 hover:underline"
      >
        Open Upload Page
      </a>

      {/* Copy Link */}
      <button
        disabled={!counsellorCode}
        onClick={() => {
          navigator.clipboard.writeText(documentUploadURL);
          toast.success("Link copied!");
        }}
        className={`px-3 py-1 rounded w-full text-sm ${
          counsellorCode
            ? "bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {translations[lang].copyLink}
      </button>

      {/* Show QR */}
      <button
        disabled={!counsellorCode}
        onClick={() => setShowQRDoc(!showQRDoc)}
        className={`px-3 py-1 rounded w-full text-sm ${
          counsellorCode
            ? "bg-green-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {showQRDoc
          ? translations[lang].hideQR
          : translations[lang].showQR}
      </button>

      {/* QR */}
      {showQRDoc && counsellorCode && (
        <div className="flex justify-center mt-2 bg-white p-2 rounded">
          <QRCode value={documentUploadURL} size={120} />
        </div>
      )}

    </div>
  )}

</div>

          {/* Updates */}

          <NavLink
            to="/admin-dashboard/updates"
            className="flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[var(--accent-light-orange)]"
          >
            <FaFileAlt />
            <span>{translations[lang].updates}</span>
          </NavLink>

          {/* Main Website */}

          <a
            href="https://www.servocci.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[var(--accent-light-orange)]"
          >
            <FaHome />
            <span>{translations[lang].mainWebsite}</span>
          </a>

        </div>
      </div>
    </>
  );
};

export default CouncelorSideBar;