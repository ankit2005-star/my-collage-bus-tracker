import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiUser,
  FiBell,
  FiHelpCircle,
  FiMap,
} from "react-icons/fi"; // Import icons

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      setMenuOpen(false); // Close menu on logout
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className="bg-[#444] text-white p-4 fixed w-full top-0 left-0 z-10 shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bus Tracker</h2>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link
            to="/bus-tracking"
            className="text-white hover:text-gray-300 flex items-center gap-1"
          >
            <FiMap /> Track Bus
          </Link>
          <Link to="/bus-route-details" className="text-white hover:text-gray-300">
            Bus Routes & Schedule
          </Link>
          <Link
            to="/notifications"
            className="text-white hover:text-gray-300 flex items-center gap-1"
          >
            <FiBell /> Notifications
          </Link>
          <Link
            to="/help"
            className="text-white hover:text-gray-300 flex items-center gap-1"
          >
            <FiHelpCircle /> Help & Support
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="text-white hover:text-gray-300 flex items-center gap-1"
              >
                <FiUser /> Profile
              </Link>
              
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-gray-300">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slide In */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-[#444] p-6 transition-transform duration-300 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <FiX className="text-2xl" />
        </button>

        {/* Menu Links */}
        <div className="flex flex-col gap-4 mt-10">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-white text-lg hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            to="/track-bus"
            onClick={() => setMenuOpen(false)}
            className="text-white text-lg hover:text-gray-300 flex items-center gap-1"
          >
            <FiMap /> Track Bus
          </Link>
          <Link
            to="/routes"
            onClick={() => setMenuOpen(false)}
            className="text-white text-lg hover:text-gray-300"
          >
            Bus Routes & Schedule
          </Link>
          <Link
            to="/notifications"
            onClick={() => setMenuOpen(false)}
            className="text-white text-lg hover:text-gray-300 flex items-center gap-1"
          >
            <FiBell /> Notifications
          </Link>
          <Link
            to="/help"
            onClick={() => setMenuOpen(false)}
            className="text-white text-lg hover:text-gray-300 flex items-center gap-1"
          >
            <FiHelpCircle /> Help & Support
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-white text-lg hover:text-gray-300 flex items-center gap-1"
              >
                <FiUser /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-white text-lg hover:text-gray-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-white text-lg hover:text-gray-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
