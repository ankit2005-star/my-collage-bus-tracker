import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, provider } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState(localStorage.getItem("userType") || null);

  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    }
  }, [userType]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user.uid);

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data:", userData);

        if (userData.userType === "driver") {
          navigate("/driver-profile");
        } else {
          navigate("/student-dashboard");
        }
      } else {
        setError("User data not found! Please contact support.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Invalid email or password!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In successful:", result.user);
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In error:", error.message);
      setError("Google Sign-In failed!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white items-center justify-center px-4">
      {userType === null ? (
        <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-yellow-400 mb-4">Login As</h1>
          <button className="w-full py-2 bg-blue-600 text-white rounded-md mb-3 hover:bg-blue-700" onClick={() => setUserType("student")}>
            Student
          </button>
          <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={() => setUserType("driver")}>
            Driver
          </button>
        </div>
      ) : (
        <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-yellow-400 mb-4">
            {userType === "driver" ? "Driver Login" : "Student Login"}
          </h1>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 bg-gray-700 border rounded-md text-white" />
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 bg-gray-700 border rounded-md text-white" />
            <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Login
            </button>
          </form>

          <button onClick={handleGoogleLogin} className="w-full py-2 mt-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Sign in with Google
          </button>

          <p className="text-gray-400 text-sm text-center mt-4">
            New User?{" "}
            <span className="text-yellow-400 font-semibold cursor-pointer hover:underline" onClick={() => navigate(`/signup?type=${userType}`)}>
              Sign Up as {userType === "driver" ? "Driver" : "Student"}
            </span>
          </p>

          <p className="text-gray-400 text-xs text-center mt-2 cursor-pointer hover:underline" onClick={() => {
            setUserType(null);
            localStorage.removeItem("userType");
          }}>
            Back to Selection
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
