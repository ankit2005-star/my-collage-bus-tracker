import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header.jsx"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
 import ProfilePage from "./pages/ProfilePage";
 import BusTrackingPage from './pages/BusTrackingPage.jsx'
 import BusRouteDetails from "./pages/BusRouteDetailsPage.jsx"

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/bus-route-details" element={<BusRouteDetails />} />
          <Route path="/bus-tracking" element={<BusTrackingPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
