import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';

const BACKEND_URL = "https://servocci-backend-dip7.onrender.com";

const NavBar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [counsellorCode, setCounsellorCode] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // ================= FETCH COUNSELLOR CODE =================
  useEffect(() => {
    if (user?.role === "councelor" && user._id) {
      const fetchCounsellor = async () => {
        try {
          const res = await axios.get(
            `${BACKEND_URL}/api/councellor/byUserId/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );

          if (res.data.success && res.data.data) {
            setCounsellorCode(res.data.data.counsellorCode);
          }
        } catch (err) {
          console.error("Failed to fetch counsellorCode:", err);
        }
      };

      fetchCounsellor();
    }
  }, [user]);

  // ================= START SESSION =================
  useEffect(() => {
    if (!user || user.role !== "councelor") return;

    const startSession = async () => {
      try {
        const res = await axios.post(
          `${BACKEND_URL}/api/usage-log/start`,
          { counselorId: user._id }
        );

        sessionStorage.setItem("usageLogId", res.data.usageLogId);

        // Store session start for UI timer only
        sessionStorage.setItem("sessionStart", Date.now().toString());

      } catch (err) {
        console.error("Failed to start session:", err);
      }
    };

    if (!sessionStorage.getItem("usageLogId")) {
      startSession();
    }

  }, [user]);

  // ================= TIMER DISPLAY =================
  useEffect(() => {
    if (user?.role !== "councelor") return;

    let sessionStart = parseInt(sessionStorage.getItem("sessionStart"));

    if (!sessionStart) {
      sessionStart = Date.now();
      sessionStorage.setItem("sessionStart", sessionStart.toString());
    }

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - sessionStart);
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  // ================= END SESSION ON TAB CLOSE =================
  useEffect(() => {
    if (!user || user.role !== "councelor") return;

    const handleBeforeUnload = () => {
      const usageLogId = sessionStorage.getItem("usageLogId");
      if (!usageLogId) return;

      const payload = JSON.stringify({ usageLogId });

      navigator.sendBeacon(
        `${BACKEND_URL}/api/usage-log/end`,
        new Blob([payload], { type: "application/json" })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);

  }, [user]);

  // ================= LOGOUT FUNCTION =================
  const handleLogout = async () => {
    try {
      const usageLogId = sessionStorage.getItem("usageLogId");

      if (usageLogId) {
        await axios.post(
          `${BACKEND_URL}/api/usage-log/end`,
          { usageLogId }
        );
      }
    } catch (err) {
      console.error("Failed to end session:", err);
    }

    sessionStorage.removeItem("usageLogId");
    sessionStorage.removeItem("sessionStart");
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  // ================= FORMAT TIME =================
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const profileLink =
    user?.role === "councelor"
      ? "/employee-dashboard/user-profile"
      : "/admin-dashboard/my-profile";

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-2 w-full sticky top-0 z-30 shadow-sm"
        style={{ backgroundColor: "var(--cool-teal)", color: "white" }}
      >
        <div className="md:hidden">
          <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
            <FaBars size={20} />
          </button>
        </div>

        <p className="hidden md:block text-sm sm:text-base">
          Welcome, {user?.name} {counsellorCode ? `(${counsellorCode})` : ''}
          {user?.role === "councelor" && (
            <span className="ml-2 text-xs text-white font-mono">
              ⏱ {formatTime(elapsedTime)}
            </span>
          )}
        </p>

        <div className="flex gap-3 items-center flex-wrap justify-end w-full sm:w-auto">
          <Link
            to={profileLink}
            className="px-3 py-1 rounded font-medium text-sm"
            style={{
              backgroundColor: "var(--light-white)",
              color: "var(--cool-teal)",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--light-yellow)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--light-white)")
            }
          >
            My Profile
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-1 rounded font-medium text-sm"
            style={{
              backgroundColor: "var(--primary-dark)",
              color: "white",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--accent-orange)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--primary-dark)")
            }
          >
            Logout
          </button>
        </div>
      </div>

      {user?.name && (
        <div className="md:hidden bg-teal-100 text-teal-800 text-sm py-2 px-4 w-full shadow-sm flex justify-between">
          <span>
            Hi, {user.name} {counsellorCode ? `(${counsellorCode})` : ''}
          </span>
          {user?.role === "councelor" && (
            <span className="font-mono text-xs">
              ⏱ {formatTime(elapsedTime)}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default NavBar;