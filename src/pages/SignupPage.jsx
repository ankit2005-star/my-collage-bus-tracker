import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("student"); // Default to student

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "driver" || type === "student") {
      setUserType(type);
    }
  }, [location.search]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [address, setAddress] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [error, setError] = useState("");

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        name,
        email,
        phone,
        userType,
        ...(userType === "student" ? { rollNumber } : {}),
        ...(userType === "driver" ? { address, busNumber } : {}),
      };

      await setDoc(doc(db, "users", user.uid), userData, { merge: true });

      alert("Signup successful! Redirecting...");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-yellow-400">
          Create an Account for {userType === "student" ? "Student" : "Driver"}
        </h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-3">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white" />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white" />

          {userType === "student" ? (
            <input type="text" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white" />
          ) : (
            <>
              <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white" />
              <input type="text" placeholder="Bus Number" value={busNumber} onChange={(e) => setBusNumber(e.target.value)} required className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white" />
            </>
          )}

          <button type="submit" className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

