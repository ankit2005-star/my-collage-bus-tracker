import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DEFAULT_AVATAR = "https://via.placeholder.com/150";

const DriverProfilePage = () => {
  const { user, userData, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🟢 DriverProfilePage Loaded");
    console.log("👤 User Data in Profile:", userData);

    if (!user) {
      navigate("/login");
    }
  }, [user, userData, navigate]);

  const [photoURL, setPhotoURL] = useState(localStorage.getItem("driverProfileImage") || DEFAULT_AVATAR);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-800 text-white">
      <div className="w-full max-w-md bg-gray-900 shadow-lg rounded-lg p-6 text-center border border-gray-700">
        {/* Profile Image */}
        <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500">
          <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
        </div>

        {/* ✅ Show correct Driver Data */}
        <h2 className="text-xl font-semibold">{userData?.name || "Loading..."}</h2>
        <p className="text-gray-400">Phone: {userData?.phone || "Loading..."}</p>

        <div className="mt-4 flex flex-col gap-3">
          <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverProfilePage;
