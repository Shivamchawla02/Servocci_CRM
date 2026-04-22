import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://servocci-backend-dip7.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <p className="text-base sm:text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 py-6 bg-[#f9f7d9] rounded-2xl shadow-lg border border-[#f7d088]">
      <button
        onClick={() => navigate('/admin-dashboard')}
        className="mb-4 px-4 py-2 bg-[#ff4f00] text-white rounded hover:bg-[#ff9d3d] transition text-sm sm:text-base"
      >
        ← Back to Dashboard
      </button>

      <div className="flex flex-col items-center">
        {profile.profileImage && (
          <div className="flex justify-center mb-4">
            <img
              src={
                profile.profileImage.startsWith("http")
                  ? profile.profileImage
                  : `https://servocci-backend-dip7.onrender.com/uploads/${profile.profileImage}`
              }
              alt="Profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#2c6975]"
            />
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl font-semibold text-[#001b48] mb-6">
          My Profile
        </h1>

        <div className="space-y-3 text-[#430000] text-sm sm:text-lg w-full">
          <div>
            <span className="font-medium text-[#001b48]">Name:</span> {profile.name}
          </div>
          <div>
            <span className="font-medium text-[#001b48]">Email:</span> {profile.email}
          </div>
          <div>
            <span className="font-medium text-[#001b48]">Role:</span> {profile.role}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
