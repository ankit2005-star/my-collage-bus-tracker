import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BusTrackingPage = () => {
  const [buses, setBuses] = useState([]);

  // Mock bus data (Replace with API calls later)
  useEffect(() => {
    setBuses([
      { busNumber: "101", location: "Near Main Gate", eta: "10 min" },
      { busNumber: "102", location: "Near Library", eta: "15 min" },
    ]);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-900 text-white">
      

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-16">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          🚍 Bus Tracking
        </h2>

        <div className="w-full max-w-2xl bg-gray-800 border border-yellow-400 shadow-lg rounded-lg p-6">
          <ul>
            {buses.map((bus, index) => (
              <li
                key={index}
                className="mb-6 p-4 bg-gray-700 border-l-4 border-yellow-400 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-yellow-400">
                    Bus {bus.busNumber}
                  </span>
                  <span className="text-gray-300 text-sm">{bus.location}</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">ETA: {bus.eta}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      
    </div>
  );
};

export default BusTrackingPage;
