import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";


// Telegram Bot Tokens (Stored in Environment Variables)
const botToken1 = import.meta.env.VITE_TELEGRAM_BOT_TOKEN_1;
const botToken2 = import.meta.env.VITE_TELEGRAM_BOT_TOKEN_2;
const userBotToken = import.meta.env.VITE_TELEGRAM_USER_BOT_TOKEN;
const userId = "1354899331"; // Replace with actual user ID

// Bus Configuration
const BUS_BOTS = [
  { token: botToken1, busNumber: "101" },
  { token: botToken2, busNumber: "102" }
];

const MapComponent = () => {
  const [busPositions, setBusPositions] = useState({});
  const [userPosition, setUserPosition] = useState(null);
  const [distanceInfo, setDistanceInfo] = useState({});
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};
useEffect(() => {
  if (mapRef.current) {
    L.control.scale().addTo(mapRef.current);
    console.log("🗺️ Leaflet Map Initialized!");
  }
}, []);

// const routingControls = {}; // Store routes for different buses

// const addRouting = (from, to, busNumber) => {
//   if (!mapRef.current) return;

//   if (!from || !to || !from.lat || !from.lng || !to.lat || !to.lng) {
//     console.log("❌ Missing user or bus location! Cannot calculate route.");
//     return;
//   }

//   // 🛠 Remove previous route for the specific bus (if it exists)
//   if (routingControls[busNumber]) {
//     mapRef.current.removeControl(routingControls[busNumber]);
//   }

  // 🛠 Create new routing control for the bus
  const routingControls = {}; // Store routing controls for each bus

  const addRouting = (from, to, busNumber) => {
    if (!mapRef.current) return;
  
    console.log(`🛣️ Adding Route for Bus ${busNumber}`);
  
    if (!from || !to || !from.lat || !from.lng || !to.lat || !to.lng) {
      console.warn(`⚠️ Missing coordinates for Bus ${busNumber}. Skipping route.`);
      return;
    }
  
    // 🛠 Remove existing route if it exists
    if (routingControls[busNumber]) {
      console.log(`🔄 Removing old route for Bus ${busNumber}`);
      mapRef.current.removeControl(routingControls[busNumber]);
      delete routingControls[busNumber];  // Remove reference
    }
  
    // 🛠 Create new routing control for the bus
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1"
      }),
      routeWhileDragging: true,
      lineOptions: { styles: [{ color: "blue", weight: 5, opacity: 0.7 }] },
      createMarker: (i, waypoint) =>
        L.marker(waypoint.latLng, { draggable: false }).bindPopup(i === 0 ? "Start" : "End"),
    })
      .on("routesfound", (e) => {
        const route = e.routes[0];
        if (route) {
          const distance = (route.summary.totalDistance / 1000).toFixed(2);
          const duration = Math.ceil(route.summary.totalTime / 60);
          console.log(`📏 Distance: ${distance} km, ⏱️ ETA: ${duration} min`);
  
          setDistanceInfo((prev) => ({
            ...prev,
            [busNumber]: { distance, duration },
          }));
        } else {
          console.error("❌ No route found!");
        }
      })
      .addTo(mapRef.current);
  
    // Store routing control
    routingControls[busNumber] = routingControl;
  };
  

  // Fetch Bus Locations from Telegram Bot
  const fetchBusLocations = async () => {
    try {
      let lastUpdateId = 0;  // Keep track of last update
      for (const bot of BUS_BOTS) {
        const response = await fetch(
          `https://api.telegram.org/bot${bot.token}/getUpdates?offset=${lastUpdateId + 1}`
        );
        const data = await response.json();
  
        if (Array.isArray(data.result) && data.result.length > 0) {
          const lastUpdate = data.result[data.result.length - 1];
          lastUpdateId = lastUpdate.update_id;  // Update offset
          
          const location = lastUpdate.message?.location;
          if (location) {
            setBusPositions((prev) => ({
              ...prev,
              [bot.busNumber]: { lat: location.latitude, lng: location.longitude },
            }));
          }
        }
      }
    } catch (error) {
      console.error("Error fetching bus locations:", error);
    }
  };
  

  // Fetch User Location from Telegram Bot
  const fetchUserLocation = async () => {
    try {
      let lastUpdateId = 0;
      const response = await fetch(
        `https://api.telegram.org/bot${userBotToken}/getUpdates?offset=${lastUpdateId + 1}`
      );
      const data = await response.json();
  
      if (Array.isArray(data.result) && data.result.length > 0) {
        const lastUpdate = data.result[data.result.length - 1];
        lastUpdateId = lastUpdate.update_id;
  
        const location = lastUpdate.message?.location;
        if (location) {
          setUserPosition({ lat: location.latitude, lng: location.longitude });
        }
      }
    } catch (error) {
      console.error("Error fetching user location:", error);
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchBusLocations();
      fetchUserLocation();
    }, 10000); 
  
    return () => clearInterval(interval);
  }, []);  // Empty dependency array ensures proper periodic updates
  
// new update likra hu yaad se 
useEffect(() => {
  if (!userPosition || Object.keys(busPositions).length === 0) return;

  const updatedDistances = {};
  Object.entries(busPositions).forEach(([busId, position]) => {
    const distance = calculateDistance(
      userPosition.lat, userPosition.lng, 
      position.lat, position.lng
    );
    updatedDistances[busId] = { distance: distance.toFixed(2) }; // Fix structure
  });

  console.log("📏 Updated Distance Info (Before SetState):", updatedDistances);
 // setDistanceInfo(updatedDistances);//ye mara hai update niche 
 setDistanceInfo(updatedDistances);


}, [busPositions, userPosition]); 
// Runs when user or bus position updates
console.log("👤 User Position:", userPosition);
console.log("🚌 Bus Positions:", busPositions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🚀 Fetching Bus Locations...");
        await fetchBusLocations();
        console.log("✅ Bus Locations Updated Successfully!");
        
        // Log the latest bus positions
        setTimeout(() => {
          console.log("🚌 Current Bus Positions State:", busPositions);
        }, 900000);
        
      } catch (error) {
        console.error("🚨 Error in useEffect:", error);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [busPositions]);  // Ensure it re-runs when bus positions change
 
  useEffect(() => {
    if (!mapRef.current || !busPositions) return;
  
    // Remove previous markers (if necessary)
    if (routingControlRef.current) {
      mapRef.current.removeLayer(routingControlRef.current);
    }
  
    // Add new markers
    Object.entries(busPositions).forEach(([busId, position]) => {
      L.marker([position.lat, position.lng])
        .addTo(mapRef.current)
        .bindPopup(`Bus ID: ${busId}`);
    });
  
  }, [busPositions]); // Runs when bus positions change
  
  // ye naya change hai line ko add krne ka
  ///useEffect(() => {
  //  if (userPosition && Object.keys(busPositions).length > 0) {
   //   for (const busNumber in busPositions) {
    //    addRouting(userPosition, busPositions[busNumber], busNumber);
    ///  }
   // }
 // }, [busPositions, userPosition]);//
 useEffect(() => {
  if (userPosition && Object.keys(busPositions).length > 0) {
    Object.entries(busPositions).forEach(([busNumber, position]) => {
      addRouting(userPosition, position, busNumber);
    });
  }
}, [busPositions, userPosition]);

  return (
    <div className="relative w-full h-screen">
      <h1 className="text-2xl font-bold text-yellow-400 my-4 text-center">
        🚍 Real-Time Bus & User Tracking with Telegram Bots
      </h1>

      <MapContainer
        center={[23.2599, 77.4126]}
        zoom={14}
        style={{ height: "85vh", width: "100%" }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
          L.control.scale().addTo(mapInstance);
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {Object.entries(busPositions).map(([busNumber, pos], index) => (
          <Marker key={`${busNumber}-${pos.lat}-${pos.lng}`} position={[pos.lat, pos.lng]}>

    <Popup>
      <b>🚌 Bus {busNumber}</b><br />
      {distanceInfo[busNumber] && distanceInfo[busNumber].distance ? (
        <>
          <p>📏 Distance from You: <b>{distanceInfo[busNumber].distance} km</b></p>
          <p>⏱️ Estimated Time: <b>{distanceInfo[busNumber].duration || "Calculating..."} min</b></p>
        </>
      ) : (
        <p>📍 Distance Data Not Available</p>
      )}
    </Popup>
  </Marker>
))}



        {userPosition && (
          <Marker position={[userPosition.lat, userPosition.lng]}>
            <Popup>
              <b>📍 Your Location</b>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
