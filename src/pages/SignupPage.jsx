import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../services/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), { name, email });

      alert("Signup successful! Redirecting to home...");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "User",
        email: user.email,
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-200">
      

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className=" max-w-4xl bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 md:p-4 ">
          {/* Image (Hidden on Small Screens) */}
          <div className="hidden md:flex flex-1 justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQMP45F9ue9118LZo84ecDlBrU7jynMl3lVA&s"
              alt="Signup Icon"
              className="w-70 rounded-full"
            />
          </div>

          {/* Signup Form */}
          <div className="flex-1 w-full">
            <h1 className="text-2xl font-bold text-center md:text-left mb-3 text-yellow-400">
              Create an Account
            </h1>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <form onSubmit={handleSignup} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#00BFFF] bg-gray-700 text-white text-sm"
              />
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#00BFFF] bg-gray-700 text-white text-sm"
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#00BFFF] bg-gray-700 text-white text-sm"
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#00BFFF] bg-gray-700 text-white text-sm"
              />
              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300 text-sm"
              >
                Sign Up
              </button>
            </form>

            {/* Google Sign-Up */}
            <div className="flex items-center my-3">
              <div className="flex-1 h-px bg-gray-600"></div>
              <p className="px-2 text-gray-400 text-xs">or</p>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>

            <button
              onClick={handleGoogleSignup}
              className="w-full py-2 bg-blue-500 text-gray-100 font-medium rounded-md hover:bg-gray-200 transition duration-300 text-sm"
            >
              Sign up with Google
            </button>

            {/* Login Navigation */}
            <p className="text-gray-400 text-xs text-center mt-3">
              Already have an account?{" "}
              <span
                className="text-yellow-400 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default SignupPage;
