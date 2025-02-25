import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HelpSupportPage from "./pages/HelpSuppportPage.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import BusTrackingPage from "./pages/BusTrackingPage.jsx";
import BusRouteDetails from "./pages/BusRouteDetailsPage.jsx";
import MapComponent from "./components/MapComponent.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/help-support" element={<HelpSupportPage />} />
          <Route path="/bus-route-details" element={<BusRouteDetails />} />
          <Route path="/bus-tracking" element={<BusTrackingPage />} />
          <Route path="/map" element={<MapComponent />} /> {/* Added this route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
