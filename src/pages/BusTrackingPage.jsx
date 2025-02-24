import { useState, useEffect } from "react";
import Header from "../components/Header";

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
    <>
      <Header />
      <div className="min-h-screen relative top-20 bg-gray-50">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-4">
            Bus Tracking
          </h2>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <ul>
              {buses.map((bus, index) => (
                <li
                  key={index}
                  className="mb-6 p-4 bg-gray-100 rounded-md shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">
                      {bus.busNumber}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {bus.location}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">ETA: {bus.eta}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusTrackingPage;
