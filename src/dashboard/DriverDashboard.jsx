import { useEffect, useState } from "react";
import { db } from "../services/firebase"; // Firebase config
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const DriverDashboard = ({ driverId }) => {
  const [buses, setBuses] = useState([]);
  const [assignedBus, setAssignedBus] = useState(null);

  useEffect(() => {
    const fetchBuses = async () => {
      const querySnapshot = await getDocs(collection(db, "buses"));
      setBuses(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchBuses();
  }, []);

  const handleBusSelect = async (busId) => {
    // Update bus status in Firestore
    await updateDoc(doc(db, "buses", busId), {
      status: "assigned",
      assignedDriver: driverId,
    });

    // Update driver's assigned bus
    await updateDoc(doc(db, "drivers", driverId), {
      assignedBus: busId,
    });

    setAssignedBus(busId);
  };

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-4">Driver Dashboard</h2>
      <h3>Assigned Bus: {assignedBus || "None"}</h3>

      <h3 className="mt-4">Available Buses:</h3>
      {buses
        .filter((bus) => bus.status === "available")
        .map((bus) => (
          <button
            key={bus.id}
            onClick={() => handleBusSelect(bus.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded m-2"
          >
            {bus.route} ({bus.id})
          </button>
        ))}
    </div>
  );
};

export default DriverDashboard;
