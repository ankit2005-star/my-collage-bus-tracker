import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // Email & Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-7 md:p-9">
          {/* Image (Hidden on Small Screens) */}
          <div className="hidden md:flex flex-1 justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQMP45F9ue9118LZo84ecDlBrU7jynMl3lVA&s"
              alt="IIIT Bhopal Logo"
              className="w-70 rounded-full"
            />
          </div>

          {/* Login Form */}
          <div className="flex-1 w-full">
            <h1 className="text-2xl font-bold text-center md:text-left mb-4">
              Login to <span className="text-yellow-400">Bus Tracker</span>
            </h1>
            <p className="text-gray-300 text-center md:text-left mb-4">
              Track your college buses in real-time.
            </p>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 bg-gray-700 text-white"
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 bg-gray-700 text-white"
              />
              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
              >
                Login with Email
              </button>
            </form>

            {/* Google Sign-In */}
            <button
              onClick={handleGoogleLogin}
              className="w-full py-2 mt-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
            >
              Sign in with Google
            </button>

            {/* Sign Up Navigation */}
            <p className="text-gray-400 text-sm text-center mt-4">
              New here?{" "}
              <span
                className="text-yellow-400 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;
