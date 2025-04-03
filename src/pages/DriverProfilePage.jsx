import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DriverProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 shadow-md rounded-lg p-6 text-center border border-gray-700">
        <h2 className="text-xl font-semibold">
          {user?.displayName || "Driver"}
        </h2>
        <p className="text-sm text-gray-400">🚍 Role: Driver</p>

        <div className="mt-6 flex flex-col gap-3 w-full">
          <button
            onClick={() => navigate("/driver-dashboard")}
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-all"
          >
            🚍 Go to Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition-all"
          >
            🔴 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverProfilePage;
