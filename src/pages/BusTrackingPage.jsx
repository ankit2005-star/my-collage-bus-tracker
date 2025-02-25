import { useState, useEffect } from "react";
import { Search, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BusTrackingPage = () => {
  const [buses, setBuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [notRunning, setNotRunning] = useState(false);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const busData = [
      { busNumber: "101", location: "Near Main Gate", eta: "10 min", lat: 23.2500, lng: 77.4100 },
      { busNumber: "102", location: "Near Library", eta: "15 min", lat: 23.2700, lng: 77.4200 },
    ];
    setBuses(busData);
    setFilteredBuses(busData);
  }, []);

  const handleSearch = () => {
    setSearched(true);
    const results = buses.filter(
      (bus) =>
        bus.busNumber.includes(searchQuery) ||
        bus.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBuses(results);
    setNotRunning(searchQuery !== "" && results.length === 0);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value === "") {
      setFilteredBuses(buses);
      setNotRunning(false);
      setSearched(false);
    }
  };

  const handleBusClick = (bus) => {
    navigate("/map", { state: { bus } }); // Navigate to MapComponent with bus details
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mt-6">🚍 Bus Tracking</h2>
      
      <div className="flex justify-center items-center mt-4">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Enter destination or bus number..."
            className="w-full p-2 pl-10 rounded-lg border border-yellow-400 bg-gray-800 text-white text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Search className="absolute left-3 top-2.5 text-yellow-400 cursor-pointer" size={20} onClick={handleSearch} />
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl bg-gray-800 border border-yellow-400 shadow-lg rounded-lg p-6">
          {notRunning && searched && (
            <p className="text-center text-red-400 font-bold">🚫 This bus is not running now</p>
          )}
          <ul>
            {filteredBuses.map((bus, index) => (
              <li
                key={index}
                className="p-4 border-b border-gray-600 bg-gray-700 rounded-lg shadow-md flex justify-between items-center cursor-pointer"
                onClick={() => handleBusClick(bus)}
              >
                <div>
                  <strong className="text-yellow-300 text-lg">Bus {bus.busNumber}</strong>
                  <p className="text-white">📍 {bus.location}</p>
                  <p className="text-green-400">⏳ ETA: {bus.eta}</p>
                </div>
                <ChevronRight className="text-yellow-400" size={24} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusTrackingPage;
