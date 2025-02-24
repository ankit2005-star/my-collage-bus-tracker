import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

   

   

  return (
    <>
      <Header />
      <div className="flex flex-col w-screen items-center justify-center min-h-screen bg-gray-50">
        {/* Header */}

        

        {/* Main Content */}
        <div className="text-center flex w-full py-8 px-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
          {/* IIIT Bhopal Logo */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQMP45F9ue9118LZo84ecDlBrU7jynMl3lVA&s"
            alt="IIIT Bhopal Logo"
            className=" mx-auto mb-4"
          />

          <h1 className="text-4xl font-semibold text-indigo-600 mb-4">
            Welcome to Bus Tracker 🚍
          </h1>

          <p className="text-gray-600 mb-6">
            Get real-time updates on bus locations and schedules.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate("/bus-tracking")}
              className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Track Bus
            </button>

            <button
              onClick={() => navigate("/bus-route-details")}
              className="w-full py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              View Bus Routes & Schedule
            </button>

            <button
              onClick={() => navigate("/notifications")}
              className="w-full py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Check Notifications
            </button>

            <button
              onClick={() => navigate("/help-support")}
              className="w-full py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Help & Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
