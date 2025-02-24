import { useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login/Register
  const [error, setError] = useState("");

  // Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      navigate("/"); // Redirect to home page
    } catch (error) {
      setError(error.message);
    }
  };

  // Email & Password Login/Signup
  const handleAuth = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors
    try {
      if (isSignUp) {
        // Create Account
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/"); // Redirect after success
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
        {/* College Logo */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQMP45F9ue9118LZo84ecDlBrU7jynMl3lVA&s"
          alt="IIIT Bhopal Logo"
          className="w-32 mx-auto mb-4"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {isSignUp ? "Create an Account" : "Login to"}{" "}
          <span className="text-blue-600">Bus Tracker</span>
        </h1>
        <p className="text-gray-600 mb-4">
          Track your college buses in real-time.
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Email & Password Authentication Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
          >
            {isSignUp ? "Create Account" : "Login with Email"}
          </button>
        </form>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 mt-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>

        {/* Toggle between Login & Register */}
        <p className="text-gray-600 text-sm mt-4">
          {isSignUp ? "Already have an account?" : "New here?"}{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Create an account"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
